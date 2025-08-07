const redisClient = require("../config/redisClient");

const REFRESH_TOKEN_PREFIX = "refresh_token:";

/**
 * Save refresh token in Redis with an expiry
 * @param {string} userId - User ID to associate the token with
 * @param {string} token - Refresh token string
 * @param {number} expiresIn - Expiry in seconds
 */
async function saveRefreshToken(userId, token, expiresIn) {
  const key = REFRESH_TOKEN_PREFIX + token;
  // Save token with userId as value and set expiry
  await redisClient.set(key, userId, { EX: expiresIn });
}

/**
 * Verify refresh token exists and get userId
 * @param {string} token - Refresh token
 * @returns {string|null} userId or null if not found
 */
async function verifyRefreshToken(token) {
  const key = REFRESH_TOKEN_PREFIX + token;
  const userId = await redisClient.get(key);
  return userId;
}

/**
 * Invalidate refresh token in Redis (e.g., on logout)
 * @param {string} token - Refresh token to delete
 */
async function invalidateRefreshToken(token) {
  const key = REFRESH_TOKEN_PREFIX + token;
  await redisClient.del(key);
}

module.exports = {
  saveRefreshToken,
  verifyRefreshToken,
  invalidateRefreshToken,
};
