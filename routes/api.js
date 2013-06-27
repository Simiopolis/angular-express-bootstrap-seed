/*
 * Serve JSON to our AngularJS client
 */
var util = require('util');
var OAuth = require('oauth').OAuth;

exports.name = function (req, res) {
  res.json({
  	name: 'Bob'
  });
};

exports.tsearch = function (req, res) {
  var geocode = "33.021794%2C-96.766505%2C30mi";
  oa.get("https://api.twitter.com/1.1/search/tweets.json?q="+req.params.term+"&count=15&geocode="+geocode, access_token, access_token_secret, function (error, data) {
    res.json(JSON.parse(data));
  });
};

exports.getUserKeywords = function (req, res) {
    if (req.user == null)
        return res.json({"error": "Cannot find user. Please sign in."});
    User.findOne({name: req.user.username}, 'keywords', function(err, user){
        res.json({"keywords":user.keywords});        
    });
};

exports.addUserKeyword = function (req, res) {
    User.findOne({name: req.user.username}, 'keywords',  function(err, user) {
        user.keywords.push(req.params.keywordToAdd);
        user.save();
        res.send(user.keywords);
    });
};

exports.removeKeyword = function (req, res) {
    User.findOne({name: req.user.username}, 'keywords', function(err, user) {
         var oldKeywords = user.keywords;
         var newKeywordArr = [];
         oldKeywords.forEach(function (element, index, array) {
            if (index != req.params.keywordToRemove)
                newKeywordArr.push(element);
         });
         user.keywords = newKeywordArr;
         user.save();
         res.send(user.keywords);
    });
};
