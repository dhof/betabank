var mongoose = require('mongoose');

// User Schema
var userSchema = mongoose.Schema({
	firstname : String,
	lastname  : String,
	username  : String,
	password  : String,
	// email     : String,
	// city	  : String,
	// state     : String,
	// country	  : { type: String, default : 'United States' },
	// group     : { type : Array, default : [] },
	// completedClimbs : {type : Array, default : [] },
	date      : { type : Date, default : Date.now }
});

// Set Model(Collection) name
// var User = mongoose.model('User', userSchema);

module.exports = mongoose.model('User', userSchema)

// module.exports = {
// 	User : User
// };