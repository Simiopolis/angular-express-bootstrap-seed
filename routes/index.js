
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { user: req.user });
};

exports.partial = function (req, res) {
  var name = req.params.name;
  res.render('partials/partial_' + name, { user: req.user });
};

exports.account = function(req, res){
  res.render('account', { user: req.user });
};
