var express = require('express');
var path = require('path');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
var routes = require('./server/routes.js');

var app = express();

mongoose.connect(process.env.Mongo_URI, function(err) {
  if (err) { console.log(err); }
  else { console.log('Connected to MongoDB'); }
});


// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'server')));

app.use(session({
    secret: 'secretnightlife',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
require('./server/passpStrategies')();
app.use(passport.session());

app.use(function(req, res, next) {
  // console.log('isAuthenticated: ', req.isAuthenticated());
  // console.log('session: ', req.session);
  // console.log('user: ', req.user);
  next();
})

routes(app);

var PORT = process.env.PORT || 8080
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
