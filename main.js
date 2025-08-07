const express = require('express');
const app = express();
const app = require('./app');
const mongoose = require('mongoose');


app.use(express.json());

// Your existing MongoDB connection code here...

// Mount auth routes
const authRoutes = require('../routes/auth');
app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
