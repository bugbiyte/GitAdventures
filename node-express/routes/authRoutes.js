// routes/authRoutes.js
const express = require('express');
const router = express.Router();

// GET /signup — render page
router.get('/signup', (req, res) => {
  res.render('signup', { error: null, form: {} });
});

// POST /signup — (placeholder) re-render page with echo
router.post('/signup', (req, res) => {
  const { email } = req.body || {};
  res.render('signup', { error: null, form: { email } });
});

// GET /login — render page
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// POST /login — (placeholder)
router.post('/login', (req, res) => {
  res.render('login', { error: null });
});

module.exports = router;
