// app.js
const path = require('path');
const express = require('express');
const app = express();

// static + views (EJS)
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// TEMP: guaranteed root route (plain text). Uncomment EJS when ready.
// app.get('/', (req, res) => res.render('home'));
app.get('/', (req, res) => res.send('It works on / (3001)'));
app.get('/madlibs', (req, res) => res.render('madlibs'));

module.exports = app;
