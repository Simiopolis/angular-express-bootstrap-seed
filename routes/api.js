/*
 * Serve JSON to our AngularJS client
 */

exports.name = function (req, res) {
  res.json({
  	name: 'Bob'
  });
};

exports.tsearch = function (req, res) {
  oa.get("https://api.twitter.com/1.1/search/tweets.json?q="+req.params.term+"&count=15&geocode="+geocode, access_token, access_token_secret, function (error, data) {
    res.json(JSON.parse(data));
  });
};
