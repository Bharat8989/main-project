const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* ================= TEST ================= */
router.get('/test', (req, res) => {
  res.send('User route is working');
});

/* ================= REGISTER ================= */
router.get('/register', (req, res) => {
  res.render('register');
});

router.post(
  '/register',
  body('email').trim().isEmail(),
  body('password').trim().isLength({ min: 8 }),
  body('username').trim().isLength({ min: 3 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Invalid input data',
        });
      }

      const { email, username, password } = req.body;

      // 🔐 Check existing user
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(409).json({
          message: 'Email already registered',
        });
      }

      // 🔐 Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await userModel.create({
        email,
        username,
        password: hashedPassword,
      });

      return res.status(201).json({
        message: 'Registration successful',
        user: newUser,
      });

    } catch (error) {
      return res.status(500).json({
        message: 'Server error',
        error: error.message,
      });
    }
  }
);

/* ================= LOGIN ================= */
router.get('/login', (req, res) => {
  res.render('login');
});

router.post(
  '/login',
  body('username').trim().isLength({ min: 3 }),
  body('password').trim().isLength({ min: 8 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Invalid input data',
        });
      }

      const { username, password } = req.body;

      const user = await userModel.findOne({ username });
      if (!user) {
        return res.status(400).json({
          message: 'Invalid username or password',
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          message: 'Invalid username or password',
        });
      }

      // 🔑 Create JWT token
      const token = jwt.sign(
        {
          userId: user._id,
          username: user.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      return res.status(200).json({
        message: 'Login successful',
        token,
      });

    } catch (error) {
      return res.status(500).json({
        message: 'Server error',
        error: error.message,
      });
    }
  }
);

module.exports = router;
