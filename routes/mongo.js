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

exports.userModel = User;


