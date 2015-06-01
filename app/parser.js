var scraperjs = require('scraperjs');
var express = require('express');
var app     = express();


var args = process.argv.slice(2),
    filter = args[0];


var scrap = function(req, res) {
  scraperjs.StaticScraper.create('https://news.ycombinator.com/item?id=9471311')
      .scrape(function($) {
          return $("tr .athing table").map(function() {
              var isNotCommentOfComment = ($(".ind img", this).attr("width") == 0),
                  filter = req.params['content'],
                  shouldFilter = (filter && ($(this).text().indexOf(req.params['content']) !== -1))
                                || !filter;
              if (isNotCommentOfComment && shouldFilter) {
                return $(this).text().replace(/\s +/g, ' ');
              }
          }).get();
      }, function(news) {
          res.send(news);
      });
};

app.get("/filter/:content", function(req, res) {
  scrap(req, res);
});

app.get("/", function(req, res) {
  scrap(req, res);
});

app.listen(3000);
