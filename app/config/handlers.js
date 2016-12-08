'use strict';

var request_yelp = require('./request_yelp.js');

module.exports = {
  yelp: function(req, res) {
    var param = {location: req.params.location}
    request_yelp(param, function(err, response, body) {
      res.json(body);
    })
  }
}
