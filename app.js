
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

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var tfdb = require('./routes/mongo');
var User = tfdb.userModel;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    // Successfully connected to Mongo
});

passport.deserializeUser(function(obj, done) {
      done(null, obj);
});

passport.use(new TwitterStrategy({
    consumerKey: "VD71ZdjZkG155RHEXnIA",
    consumerSecret: "V1rQ6ol99B19cIC9m008qrl9hcCmCDoln8ivPHEj0",
    callbackURL: "http://www.tweetforce.org/auth/twitter/callback"
    },
    function(token, tokenSecret, profile, done) {
        User.findOne({name: profile.username}, 'name', function (err, user){
            if (!err) {
                if (user === null) {
                    var new_user = new User({name: profile.username});   
                    new_user.save();
                    console.log("##################### new user created"+new_user.name);
                } else {
                    console.log("**********************user found");
                }
            } 
            return done(null, profile);
        });
    }
));

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.logger());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'secret' }));
  app.use(express.static(__dirname + '/public'));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
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
  passport.authenticate('twitter', { successRedirect: '/account',
                                       failureRedirect: '/' }));
app.get('/auth/twitter',passport.authenticate('twitter'));

// JSON API

app.get('/api/name', api.name);
app.get('/api/tsearch/:term', api.tsearch);


// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

app.post('/save-info-first-time', function(req, res) {
    console.log(req.body.city);
    console.log(req.body.streetAddress);
    console.log(req.body.radius);
    User.findOne({name: req.user.username}, 'city streetAddress radius firstTimeUser', function(err, user) {
        user.city = req.body.city;
        user.streetAddress = req.body.streetAddress;
        user.radius = req.body.radius; 
        user.firstTimeUser = false;
        user.save();
    });

    res.redirect('/account');
});

// Start server

//app.listen(3000, function(){
//  console.log("Server started");
//});

//Ensures tht the user is authenticated.
function ensureAuthenticated(req, res, next) {
      if (req.isAuthenticated()) { return next(); }
        res.redirect('/')
}

module.exports = app
