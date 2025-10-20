// app.js
const path = require('path');
const express = require('express');

const authRoutes = require('./routes/authRoutes');

const app = express();

// static assets
app.use(express.static(path.join(__dirname, 'public')));

// views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// form parsing
app.use(express.urlencoded({ extended: false }));

// base pages
app.get('/', (req, res) => res.render('home'));
app.get('/madlibs', (req, res) => res.render('madlibs'));

// auth pages
app.use(authRoutes);

// health/diag routes (no EJS involved)
app.get('/__ping', (req, res) => res.send('ok ' + new Date().toISOString()));
app.get('/__diag', (req, res) => res.type('text').send('express alive'));

module.exports = app;
