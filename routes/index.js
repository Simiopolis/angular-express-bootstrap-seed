
/*
 * GET home page.
 */
var tfdb = require('./mongo');
var User = tfdb.userModel;

exports.index = function(req, res){
  res.render('index', { user: req.user });
};

exports.partial = function (req, res) {
  var name = req.params.name;
  res.render('partials/partial_' + name, { user: req.user });
};

exports.account = function(req, res){
    var isNew;
    User.findOne({name: req.user.username}, 'firstTimeUser', function(err, user) {
        isNew = user.firstTimeUser
        console.log(isNew);
        res.render('account', { user: req.user, 
                                newUser: isNew 
                              });
    });
};
