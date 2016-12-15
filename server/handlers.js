'use strict';

var axios = require('axios');
var request_yelp = require('./request_yelp.js');
var userModel = require('./userModel');

function get_persons(bar_id) {
  return userModel.find({'bars': bar_id}).count().exec();
}

module.exports = {
  yelp: function(req, res) {
    var param = {location: req.params.location}
    request_yelp(param, function(err, response, body) {
      console.log(JSON.parse(body));
      var bars = JSON.parse(body).businesses.map(function(bar) {
        return {id: bar.id,
          name: bar.name,
          img: bar.image_url,
          location: bar.location.display_address.toString(),
          text: bar.snippet_text,
          phone: bar.display_phone,
          persons: 0}
      });
      axios.all(bars.map(function(bar) {
        return get_persons(bar.id);
      }))
      .then(function(data){
        for (var i=0; i<bars.length; i++) {
          bars[i].persons = data[i];
        }
        res.json(bars);
      })
      .catch(function(err) {
        console.log("Error in handlers.yelp: ", err);
      })
    })
  },

  user: function(req, res) {
    var bars = req.isAuthenticated() ? req.user.bars : [];
    var loc = req.params.location ? req.params.location : "";
    res.json({
      'user_authenticated': req.isAuthenticated(),
      'last_location': loc,
      'user_bars': bars
    });
  },

  user_bars_add: function(req, res) {
    userModel.findOneAndUpdate({'profile.id': req.user.profile.id},
      {$push: {'bars': req.params.bar}})
      .exec(function(err, result) {
        if (err) console.log(err);
        else {
          result.save(function(err) {
            if (err) console.log(err);
            else {
              res.json({success: "added " + req.params.bar + " to user_bars"});
            }
          })
        }
      })

  },

  user_bars_delete: function(req, res) {
    userModel.findOne({'profile.id': req.user.profile.id})
      .exec(function(err, result) {
        if (err) console.log(err);
        else {
          var bars_filtered = result.bars.filter(function(bar) {
            return bar !== req.params.bar;
          })
          result.bars = bars_filtered;
          result.save(function(err) {
            if (err) console.log(err);
            else {
              res.json({success: "deleted " + req.params.bar + " from user_bars"});
            }
          })
        }
      })
  }

}
