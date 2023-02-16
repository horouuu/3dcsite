// libraries
const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const bcrypt = require('bcrypt');
const parser = require('body-parser')

// functions
const initPassport = require('./passport.js');

// express
const app = express();
app.use(express.static(path.join(__dirname, '..', 'views')));
app.use(parser.urlencoded({ 
    extended: true
}))
app.use(flash())
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(express.urlencoded({
    extended: false
}))

app.use(passport.initialize())
app.use(passport.session())
initPassport(passport);

app.set('views', path.join(__dirname, '..', 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view-engine', 'html');

app.get('/', (req, res) => {
    res.render('index.html')
})

app.get('/showcase', (req, res) => {
    res.render('showcase.html')
})

app.get('/login', (req, res) => { 
    res.render('login.html');
})

app.post('/login', passport.authenticate('local', { 
        successRedirect: '/',
        failureRedirect: '/login'
    }
));

app.listen(3000)
console.log('Website running on port: 3000.')