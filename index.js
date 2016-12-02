var express = require('express');
var app = express();
var requireLogin = require('./require_login');

var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_SERVER || "mongodb://localhost/instapage");

var bodyParser = require('body-parser');
app.use(bodyParser.json());

// initialize passport
var passport = require('passport');
var User = require('./api/users/model');
passport.use(User.createStrategy());

//creating secret
var session = require('express-session');
app.use(session({ secret: 'That Part', resave: false, saveUninitialized: true }));
//must be afer app.use(session. also order below is very important.
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// route for logins
app.post('/api/login', passport.authenticate('local'), function(req, res) {
	res.send(req.user);
});

//sign up endpoint
app.post('/api/signup', function(req, res, next) {
  var user = new User();
  user.email = req.body.email;
  user.name = req.body.name;
  User.register(user, req.body.password, (err) => {
    if (err) { next(err); }
    req.login(user, function(err) {
      if (err) { next(err); }
      res.send(user);
    })
  })
});

app.get('/api/me', function(req, res) {
	res.send(req.user);
});

// Serve bundle.js
app.use(webpackMiddleware(webpack(require('./webpack.config.js'))));

// Serve your API assets here. You'll need to include the post route file.
app.use(express.static('public'));

// Serve your static assets here. You'll need to use express.static middleware.
app.use('/api/pages', require('./api/pages'));
require('./api/users/model');

// If none of the above matches, serve public/index.html.
app.get('*', (req, res) => res.sendFile(__dirname + '/public/index.html'))

app.listen(process.env.PORT || 8080);
