const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/auth');
const gameRoutes = require('./routes/gameRoutes');

const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());

// Example: auth, user, and game API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);

// Error handler (last)
app.use(errorHandler);

module.exports = app;
