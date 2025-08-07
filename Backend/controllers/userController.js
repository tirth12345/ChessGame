const userService = require('../services/userService');

exports.registerUser = async (req, res, next) => {
  try {
    const user = await userService.register(req.body);
    res.status(201).json({ user, message: 'Registration successful' });
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const tokens = await userService.login(req.body.email, req.body.password);
    res.json(tokens);
  } catch (err) {
    next(err);
  }
};

exports.getUserProfile = async (req, res, next) => {
  try {
    const userProfile = await userService.getProfile(req.user.id);
    res.json(userProfile);
  } catch (err) {
    next(err);
  }
};
