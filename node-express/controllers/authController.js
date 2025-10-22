// controllers/authController.js
const User = require('../models/User');

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // validation errors
  if (err.message && err.message.toLowerCase().includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
    console.log('validation error');
  }

  return errors;
};

const signup_get = (req, res) => {
  res.render('signup', { title: 'Sign up' });
};

const login_get = (req, res) => {
  res.render('login', { title: 'Login' });
};

const signup_post = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    return res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    return res.status(400).json({ errors });
  }
};

const login_post = (req, res) => {
  res.send('user login');
};

module.exports = { signup_get, login_get, signup_post, login_post };
