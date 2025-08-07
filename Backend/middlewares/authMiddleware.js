const jwt = require('jsonwebtoken');

// Middleware to authenticate access token
function authenticateToken(req, res, next) {
  // Get the token from the Authorization header (format: "Bearer TOKEN")
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  // Verify token using your JWT secret
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Attach user info from token to request object for downstream handlers
    req.user = user;
    next(); // Proceed to protected route
  });
}

module.exports = authenticateToken;
