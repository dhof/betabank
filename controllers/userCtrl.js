var User = require('../models/userModel.js')
var bcrypt = require('bcryptjs')
var passport = require('passport')

function userSignup (req, res) {
	bcrypt.genSalt(11, function(error, salt){
        bcrypt.hash(req.body.password, salt, function(hashError, hash){
			var newUser = new User({
				firstname : req.body.firstname,
				lastname : req.body.lastname,
				username : req.body.username,
				password : hash,
			});
			newUser.save(function (saveErr, user){
				if (saveErr) {
					res.send({error : saveErr})
				} else {
					console.log(user)
					res.redirect('/')
				}	
			})
		})
	})
}

function userLogin (req, res, next){
	passport.authenticate('local', function(err, user, info) {
		console.log(passport.authenticate())
        if (err) { return next(err); }
        if (!user) { return res.send({error : 'Please try logging in again' }); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/#/profile');
        });
    })(req, res, next);
}


function userLogout (req, res) {
	req.logOut()
	res.redirect('/')
}


function getUser (req, res) {
	res.send({user : req.user})
}

function completedClimbs (req, res) {
	User.findOne({_id : req.user._id}, function (err, user) {

		user.completedClimbs = user.completedClimbs || {}
		user.completedClimbs[req.body.locationId] = user.completedClimbs[req.body.locationId] || {}
		user.completedClimbs[req.body.locationId][req.body.wallName] = user.completedClimbs[req.body.locationId][req.body.wallName] || []
		user.completedClimbs[req.body.locationId][req.body.wallName].push(req.body.problemName)
		user.markModified('completedClimbs')
		user.save(function (err, saved) {
			console.log("saved ", saved)
			res.sendStatus(200)
		})
		
	})
}


module.exports = {
	userSignup     : userSignup,
	userLogin      : userLogin,
	userLogout 	   : userLogout,
	getUser        : getUser,
	completedClimbs : completedClimbs
}