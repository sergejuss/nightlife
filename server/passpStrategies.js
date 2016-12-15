'use strict';

var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var userModel = require('./userModel');

module.exports = function() {

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    userModel.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use(new TwitterStrategy({
    consumerKey: process.env.tw_key,
    consumerSecret: process.env.tw_sec,
    callbackURL: "http://localhost:8080/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    process.nextTick(function() {
      userModel.findOne({'profile.id': profile.id}, function(err, user) {
        if (err) { return done(err); }
        if (user) { return done(null, user); }
        else {
          var newUser = new userModel();
          newUser.profile.id = profile.id;
          newUser.profile.displayName = profile.displayName;
          newUser.profile.username = profile.username;
          newUser.save(function(err) {
            if (err) {
              console.log(err);
              return done(null, newUser);
            }
          })
        }
      })            
    })
  }
  ));
};
