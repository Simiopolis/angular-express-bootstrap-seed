
/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api');

var app = module.exports = express();

var passport = require('passport')
var TwitterStrategy = require('passport-twitter').Strategy;
passport.serializeUser(function(user, done) {
      done(null, user);
});

passport.deserializeUser(function(obj, done) {
      done(null, obj);
});


passport.use(new TwitterStrategy({
    },
    function(token, tokenSecret, profile, done) {
        return done(null, profile);
    }
));

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'secret' }));
  app.use(express.static(__dirname + '/public'));
  app.use(passport.initialize());
  app.use(passport.session());
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
app.get('/account', ensureAuthenticated, routes.account);
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// Twitter authentication

app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { successRedirect: '/',
                                       failureRedirect: '/login' }));
app.get('/auth/twitter',passport.authenticate('twitter'));

// JSON API

app.get('/api/name', api.name);
app.get('/api/tsearch/:term', api.tsearch);


// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server

//app.listen(3000, function(){
//  console.log("Server started");
//});

//Ensures tht the user is authenticated
function ensureAuthenticated(req, res, next) {
      if (req.isAuthenticated()) { return next(); }
        res.redirect('/')
}

module.exports = app;
