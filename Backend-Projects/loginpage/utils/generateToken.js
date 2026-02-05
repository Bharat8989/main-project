const jwt = require('jsonwebtoken');

exports.generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'default_secret', {
        expiresIn: '7d',
    });
};

// controllers/authControllers.js
const User = require('../models/user-model');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/generateToken');

exports.registerUser = async (req, res) => {
    try {
        const { email, password, fullname } = req.body;

        if (!email || !password || !fullname) {
            return res.render('index', { error: 'All fields are required.' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('index', { error: 'Account already exists. Please login.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email,
            password: hashedPassword,
            fullname,
        });

        const token = generateToken(newUser._id);
        res.cookie('token', token, { httpOnly: true, secure: false });

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.render('index', { error: 'Server error' });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.render('index', { error: 'Email and password are required.' });
        }

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.render('index', { error: 'Invalid credentials.' });
        }

        const token = generateToken(user._id);
        res.cookie('token', token, { httpOnly: true, secure: false });

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.render('index', { error: 'Server error' });
    }
};
