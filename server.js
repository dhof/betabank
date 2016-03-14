var express = require('express');
var parser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');

var userCtrl = require('./controllers/userCtrl.js');
var locationCtrl = require('./controllers/locationCtrl.js');
var passportConfig = require('./config/passportConfig.js');

// Create express app object
var app = express();

// Connect to mongoDB
mongoose.connect('mongodb://localhost/betaBankDB');


/** Express Session Setup **/
var session = require('express-session')
app.sessionMiddleware = session({
  secret: 'you will never guess me!',
  resave: false,
  saveUninitialized: true
})
app.use(app.sessionMiddleware)
/** End Express Session Setup **/

// Passport hooks into our app
app.use(passport.initialize());
app.use(passport.session());


// Application Configuration
app.use(logger('dev'));
app.use(parser.json());
app.use(parser.urlencoded({ extended : true}));
app.use(express.static(__dirname + '/public'));








// Routes

// GET
app.get('/', function (req, res) {
	res.sendFile('html/index.html', {root : './public'})
});

app.get('/maptest', function (req, res) {
	res.sendFile('html/maptest.html', {root : './public'})
});

app.get('/api/user', userCtrl.getUser)
app.get('/logout', userCtrl.userLogout)
app.get('/api/locations', locationCtrl.getLocations)

// POST
app.post('/signup', userCtrl.userSignup)
app.post('/login', userCtrl.userLogin)
app.post('/api/locations', locationCtrl.createLocation)




// Listen
var port = process.env.port || 3000;
app.listen(port, function() {
	console.log("We are listening to you on " + port)
});