const User = require('../models/user-model');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken');

// Register User
exports.registerUser = async (req, res) => {
    try {
        const { email, password, fullname } = req.body;

        if (!email || !password || !fullname) {
            return res.status(400).render('index', { error: 'All fields are required.' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).render('index', { error: 'You already have an account. Please login.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email,
            password: hashedPassword,
            fullname,
        });

        const token = generateToken(newUser._id);
        res.cookie('token', token, { httpOnly: true, secure: false }); // Use secure: true in production

        res.redirect('/about'); // Redirect after successful registration
    } catch (err) {
        console.error(err);
        res.status(500).render('index', { error: 'Server error. Please try again.' });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).render('index', { error: 'Email and password are required.' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).render('index', { error: 'Invalid credentials.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).render('index', { error: 'Invalid credentials.' });
        } 

        const token = generateToken(user._id);
        res.cookie('token', token, { httpOnly: true, secure: false }); // Use secure: true in production

        res.redirect('/about'); // Redirect to /about page after successful login
    } catch (error) {
        console.error(error);
        res.status(500).render('index', { error: 'Server error. Please try again.' });
    }
};
