var User = require('../models/userModel.js')
var bcrypt = require('bcryptjs')
var passport = require('passport')

function userSignup (req, res) {
	bcrypt.genSalt(11, function(error, salt){
        bcrypt.hash(req.body.password, salt, function(hashError, hash){
			var newUser = new User.User({
				firstName : req.body.firstName,
				lastName : req.body.lastName,
				userName : req.body.userName,
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
        if (err) { return next(err); }
        if (!user) { return res.send({error : 'Please try logging in again ' + req.body.username}); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/profile');
        });
    })(req, res, next);
}

module.exports = {
	userSignup : userSignup,
	userLogin  : userLogin
}