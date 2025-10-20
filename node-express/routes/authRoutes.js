// routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

router.get('/signup', (req, res) => res.render('signup'));

router.post('/signup', async (req, res) => {
  try {
    console.log('[SIGNUP body]', req.body);   // <— you should see this
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Save to Mongo (works once MONGO_URI is correct & IP allowed)
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'Email already registered' });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ email, passwordHash });

    return res.status(201).json({ id: user._id.toString(), email: user.email });
  } catch (err) {
    console.error('Signup error:', err.message);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
