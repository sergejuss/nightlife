'use strict';

var path = require('path');
var handlers = require('./handlers.js');
var passport = require('passport');

module.exports = function(app) {

  function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()) return next();
    else res.redirect('/')
  }

  app.route('/')
    .get(function(req, res) {
      res.sendFile(path.join(__dirname, '../public', 'index.html'))
    })

  app.route('/api/:location')
    .get(handlers.yelp)

  app.route('/user/')
    .get(handlers.user)

  app.route('/user/:location')
    .get(handlers.user)

  app.route('/user_bars/add/:bar')
    .get(isLoggedIn, handlers.user_bars_add)

  app.route('/user_bars/delete/:bar')
    .get(isLoggedIn, handlers.user_bars_delete)

  app.route('/auth/twitter')
    .get(passport.authenticate('twitter'));

  app.route('/auth/twitter/callback')
    .get(passport.authenticate('twitter',
      { successRedirect: '/', failureRedirect: '/' }));

  app.route('/logout')
    .get(isLoggedIn, function(req, res) {
      req.logout();
      res.redirect('/');
    })

  app.route('*')
    .get(function(req, res) {
      res.sendFile(path.join(__dirname, '../public', 'index.html'))
    })
}
