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

exports.auth = function (reg, res) {
};
