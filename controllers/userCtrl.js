var userModel = require('../models/userModel.js')

function createUser (req, res) {
	var newUser = new userModel.User({

	firstName : req.body.firstName,
	lastName : req.body.lastName,
	userName : req.body.userName,
	password : req.body.password,
	})
	
	newUser.save(function (err, doc){
		console.log(newUser)
		res.redirect('/')
	})
}

module.exports = {
	createUser : createUser
}