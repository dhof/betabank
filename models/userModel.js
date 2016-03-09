var mongoose = require('mongoose');

// User Schema
var userSchema = mongoose.Schema({
	firstName : String,
	lastName  : String,
	userName  : String,
	password  : String,
	// email     : String,
	// city	  : String,
	// state     : String,
	// country	  : { type: String, default : 'United States' }
	date      : { type : Date, default : Date.now }
});

// Set Model(Collection) name
var User = mongoose.model('User', userSchema);

module.exports = {
	User : User
};