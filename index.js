const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection failed:', err));

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const swipeRoutes = require('./routes/swipes');
app.use('/api/swipes', swipeRoutes);

// Basic Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Anna University Tutoring App API');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
