var mongoose = require('mongoose');

// User schema definition
var userSchema = mongoose.Schema({ 
    name: {type: String, default: ''},
    city: {type: String, default: ''},
    streetAddress: {type: String, default: ''},
    keywords: [String],
    radius: {type: Number, default: 20},
    geocode: [Number],
    firstTimeUser: {type: Boolean, default: true}
}); 
var User = mongoose.model('User', userSchema); 

var keywordBankSchema = mongoose.Schema({
    industry: {type: String, default: ''},
    keywords: [String]    
});
var KeywordBank = mongoose.model('KeywordBank', keywordBankSchema);

exports.userModel = User;
exports.keywordBankModel = KeywordBank;
