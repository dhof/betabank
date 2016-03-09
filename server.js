var express = require('express');
var parser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var userModel = require('./models/userModel.js');
var userCtrl = require('./controllers/userCtrl.js');

// Create express app object
var app = express();


// Application Configuration
app.use(logger('dev'));
app.use(parser.json());
app.use(parser.urlencoded({ extended : true}));
app.use(express.static(__dirname + '/public'));


// Connect to mongoDB
mongoose.connect('mongodb://localhost/betaBankDB');



// Passport Config
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
	done(null, user.id);
});
passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
});


// var bcrypt = require('bcryptjs')
// passport.use(new LocalStrategy(
//     function (username, password, done) {
//         User.findOne({ username: username }, function (err, user) {
//             if (err) { return done(err); }
//             if (!user) {
//                 return done(null, false);
//             }
//             // User exists, check password match
//             bcrypt.compare(password, user.password, function (error, response){
//                 if (response === true){
//                     return done(null,user)
//                 }
//                 else {
//                     return done(null, false)
//                 }
//             })
//         });
//     }
// ));










// Routes
app.get('/', function(req, res) {
	res.sendFile('html/index.html', {root : './public'})
});

app.post('/createuser', userCtrl.createUser) // ADD PASSPORT TO THIS <<


// app.post('/login', userCtrl.userLogin) // BUILD THIS <<




// Listen
var port = process.env.port || 3000;
app.listen(port, function() {
	console.log("We are listening to you on " + port)
});