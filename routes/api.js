/*
 * Serve JSON to our AngularJS client
 */
var util = require('util');
var OAuth = require('oauth').OAuth;
var oa = new OAuth("https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token",
    "VD71ZdjZkG155RHEXnIA",
    "V1rQ6ol99B19cIC9m008qrl9hcCmCDoln8ivPHEj0",
    "1.0A",
    null,
    "HMAC-SHA1");

var access_token = '887525756-M9o4EsPf91dKD2pilgk7I2emxkNj2atv4dzVWncY';
var access_token_secret = 'qqXQ6ypVaCXaZeyZzocE3Wi2fmrLnUwOATjVUz9Jso';

var User = require('./mongo').userModel;
var KeywordBank = require('./mongo').keywordBankModel;

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

exports.getKeywordBank = function (req, res) {
    if (req.user == null)
        return res.json({"error": "Cannot find user. Please sign in."});
    KeywordBank.findOne({industry: req.params.industry}, 'keywords', function(err, bank){
        res.json({"keywordBank":bank.keywords});        
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

exports.removeKeywordBankTerm = function (req, res) {
    KeywordBank.findOne({industry: "spa"}, 'keywords', function(err, bank) {
         var oldKeywords = bank.keywords;
         var newKeywordArr = [];
         oldKeywords.forEach(function (element, index, array) {
            if (index != req.params.keywordIndexToRemove)
                newKeywordArr.push(element);
         });
         bank.keywords = newKeywordArr;
         bank.save();
         res.send(bank.keywords);
         console.log(bank.keywords);
    });
};
