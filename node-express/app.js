// app.js
const path = require('path');
const express = require('express');
const app = express();

// static + views (EJS)
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/smoothies', (req, res) => res.render('smoothies'));

// parse form bodies (needed for /login /signup POSTs later)
app.use(express.urlencoded({ extended: false }));

// ✅ Home page now renders EJS
app.get('/', (req, res) => res.render('home'));

// ✅ mount auth routes (/signup, /login)
const authRoutes = require('./routes/authRoutes');
app.use(authRoutes);

module.exports = app;
