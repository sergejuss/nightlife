'use strict';

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var User = new Schema({
    profile: {
      id: String,
      displayName: String,
    	username: String
    },
    bars: [String],
    location: String
});

module.exports = mongoose.model('User', User);
