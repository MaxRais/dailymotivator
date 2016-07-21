var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cookieParser());
app.use(passport.session());
app.use(session({ 
	secret: process.env.SESSION_SECRET,
	resave: true,
    saveUninitialized: true
}));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

var dm = require('./app.js');
dm(app);

app.listen(3000);
