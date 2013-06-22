
/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api');

var app = module.exports = express();

var util = require('util');
var OAuth = require('oauth');

/** HTTP REUESTS!
var request = require('request');
request('http://www.google.com', function (error, response, body) {
      if (!error && response.statusCode == 200) {
              console.log(body) // Print the google web page.
                }
})
*/

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/partial/:name', routes.partial);

// JSON API

app.get('/api/name', api.name);
app.get('/api/tsearch/:term', api.tsearch);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server

app.listen(3000, function(){
  console.log("Server started");
});
