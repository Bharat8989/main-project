const express = require('express');
const { registerUser, loginUser } = require('../controllers/authControllers');
// const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

// Home/Login Page
router.get('/', (req, res) => {
    res.render('index', { error: '' });
});

// Secure About Route
router.get('/about',  (req, res) => {
    res.render('about', { user: req.user });
});

// Logout Route
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

// Authentication Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
