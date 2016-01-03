'use strict';

var SearchHandler = require(process.cwd() + '/app/searchController.js');

module.exports = function (app, db) {
   var searchHandler = new SearchHandler(db);

   app.route('/')
      .get(function (req, res) {
         res.sendFile(process.cwd() + '/public/index.html');
      });

  app.route('/api/recentsearches')
    .get(searchHandler.getSearches);

  app.route('/api/imagesearch/:query(*)')
    .get(searchHandler.addSearch);



};
