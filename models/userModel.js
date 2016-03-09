var mongoose = require('mongoose');

// User Schema
var userSchema = mongoose.Schema({
	firstName : String,
	lastName  : String,
	userName  : String,
	password  : String,
	email     : String,
	city	  : String,
	state     : String,
	country	  : String,
	date      : { type : Date, default : Date.now }
});

// Set Model(Collection) name
var Users = mongoose.model('Users', userSchema);

module.exports = {
	userSchema : userSchema,
	Users 	   : Users
};