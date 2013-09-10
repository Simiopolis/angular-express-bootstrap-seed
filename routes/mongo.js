var mongoose = require('mongoose');

// User schema definition
var userSchema = mongoose.Schema({ 
    name: {type: String, default: ''},
    city: {type: String, default: ''},
    streetAddress: {type: String, default: ''},
    keywords: [String],
    radius: {type: Number, default: 20},
    geocode: [Number],
    firstTimeUser: {type: Boolean, default: true},
    token: {type: String, default: ''},
    tokenSecret: {type: String, default: ''}
}); 

var signUpSchema = mongoose.Schema({
    businessName: {type: String, default: ''},
    emailAddress: {type: String, default: ''},
    phoneNumber: {type: String, default: ''},
    city: {type: String, default: ''}
});

var keywordBankSchema = mongoose.Schema({
    industry: {type: String, default: ''},
    keywords: [String]    
});

var User = mongoose.model('User', userSchema); 
var SignUp = mongoose.model('SignUp', signUpSchema);
var KeywordBank = mongoose.model('KeywordBank', keywordBankSchema);

exports.userModel = User;
exports.keywordBankModel = KeywordBank;
exports.signUpModel = SignUp;
