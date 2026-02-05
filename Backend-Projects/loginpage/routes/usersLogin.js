const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authControllers');

// Default route for testing
router.get('/', (req, res) => {
    res.send('🗝️ Welcome to the Authentication ');
});

// Registration route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Error handling middleware (optional but useful)
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = router;
