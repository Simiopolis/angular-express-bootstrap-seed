
/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api');

var app = module.exports = express();

var twitterAuth = require('twitter-oauth')({
    consumerKey: "ENTER CONSUMER KEY HERE", /* per appication - create a comsumer key here: https://dev.twitter.com/apps */
    domain: 'YOUR DOMAIN HERE',
    consumerSecret: "ENTER CONSUMER SECRET FROM TWITTER HERE", /* create a comsumer key here: https://dev.twitter.com/apps */
    loginCallback: "http://yourdomain.com/twitter/sessions/callback",  /* internal */
    completeCallback:  "http://yourdomain.com/search/beagles"  /* When oauth has finished - where should we take the user too */
});

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
app.get('/twitter/sessions/connect', twitterAuth.oauthConnect);
app.get('/twitter/sessions/callback', twitterAuth.oauthCallback);
app.get('/twitter/sessions/logout', twitterAuth.logout);

// JSON API

app.get('/api/name', api.name);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server

app.listen(3000, function(){
  console.log("Server started");
});
