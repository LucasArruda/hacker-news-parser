var scraperjs = require('scraperjs');
var express = require('express');
var app = express();


var args = process.argv.slice(2),
    filter = args[0];


var scrap = function(req, res) {
  scraperjs.StaticScraper.create('https://news.ycombinator.com/item?id=9471311')
      .scrape(function($) {
          return $("tr .athing table").map(function() {
              var text = $(this).text(),
                  isNotCommentOfComment = ($(".ind img", this).attr("width") == 0),
                  filter = decodeURI(req.params['content']).toLowerCase(),
                  shouldFilter = (filter && (text.toLowerCase().indexOf(filter) !== -1))
                      || (filter == 'undefined');

              if (isNotCommentOfComment && shouldFilter) {
                return text.replace(/  +/g, ' ');
              }
          }).get();
      }, function(news) {
          res.send("<pre>"+news.join("").replace(/\n\s+/g, '\n')+"</pre>");
      });
};

app.get("/filter/:content", function(req, res) {
  scrap(req, res);
});

app.get("/", function(req, res) {
  scrap(req, res);
});

app.listen(3000);
