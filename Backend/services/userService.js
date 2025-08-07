const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async ({ email, username, password }) => {
  // Check for existing user
  const existing = await User.findOne({ email });
  if (existing) throw { status: 400, message: 'User exists' };

  // Hash password and save
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ email, username, password: hashed });
  await user.save();
  return { id: user._id, email: user.email, username: user.username };
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw { status: 401, message: 'Invalid credentials' };
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw { status: 401, message: 'Invalid credentials' };

  // Tokens (adjust according to your .env)
  const accessToken = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: user._id, email }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
  
  // Save refreshToken to Redis (via refreshTokenService.js; implement as needed)
  // await refreshTokenService.save(user._id, refreshToken);

  return { accessToken, refreshToken };
};

exports.getProfile = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) throw { status: 404, message: 'User not found' };
  return user;
};
