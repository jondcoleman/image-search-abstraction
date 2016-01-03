'use strict';

function searchHandler(db) {
  var searches = db.collection('searches');
  var request = require('request');

  this.getSearches = function(req, res) {
    searches.find().sort({_id: -1}).limit(10).toArray(function(err, docs){
      if (err) {
        console.log(err);
      }
      res.json(docs);
    })
  };

  this.addSearch = function(req, res) {
    var searchUrl = "https://api.imgur.com/3/gallery/search/time";
    if (req.query.offset){
      searchUrl += "/" + req.query.offset;
    }
    searchUrl += "?q_all=" + req.params.query;
    console.log(searchUrl);
    var requestOptions = {
      url: searchUrl,
      headers: {
        'Authorization': "Client-Id 0c00d9b275bfd72"
      }
    }

    request(requestOptions, function(error, response, body){
      if (error) {console.log(error)}
      else {
        //console.log(response);
        //console.log(body);
        res.json(JSON.parse(body).data);
      }
    })

    searches.insert({query: req.params.query, time: Date.now()}, function(err, result) {
      if (err) {throw err};
      return;
    });
  };

}

module.exports = searchHandler;
