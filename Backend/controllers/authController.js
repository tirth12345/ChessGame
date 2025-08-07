const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  saveRefreshToken,
  verifyRefreshToken,
  invalidateRefreshToken,
} = require("../services/refreshTokenService");

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const REFRESH_TOKEN_EXPIRES_IN = 7 * 24 * 60 * 60; // 7 days in seconds
const ACCESS_TOKEN_EXPIRES_IN = "15m";

// Login handler example
async function login(req, res) {
  const { password } = req.body;

  // ...validate and find user

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return res.status(401).json({ error: "Invalid credentials" });

  const accessToken = jwt.sign({ userId: user._id }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
  const refreshToken = jwt.sign({ userId: user._id }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });

  // Save refresh token in Redis with expiry in seconds
  await saveRefreshToken(user._id.toString(), refreshToken, REFRESH_TOKEN_EXPIRES_IN);

  res.json({ accessToken, refreshToken });
}

// Refresh token handler example
async function refreshTokenHandler(req, res) {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ error: "Missing refresh token" });

  // Verify token validity and existence in Redis
  try {
    const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

    const userIdFromRedis = await verifyRefreshToken(refreshToken);
    if (!userIdFromRedis || userIdFromRedis !== payload.userId) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign({ userId: payload.userId }, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("Error verifying refresh token:", err);
    res.status(403).json({ error: "Invalid refresh token" });
  }
}

// Logout handler example
async function logout(req, res) {
  const { refreshToken } = req.body;
  if (refreshToken) {
    await invalidateRefreshToken(refreshToken);
  }
  res.json({ message: "Logged out successfully" });
}

module.exports = {
  login,
  refreshTokenHandler,
  logout,
};
