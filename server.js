var express = require('express');
var parser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var userModel = require('./models/userModel.js')


// Create express app object
var app = express();


// Application Configuration
app.use(logger('dev'));
app.use(parser.json());
app.use(parser.urlencoded({ extended : true}));
app.use(express.static(__dirname + '/public'));


// Connect to mongoDB
mongoose.connect('mongodb://localhost/betaBankDB');


// Routes
app.get('/', function(req, res) {
	res.sendFile('html/index.html', {root : './public'})
});



// Listen
var port = process.env.port || 3000;
app.listen(port, function() {
	console.log("We are listening to you on " + port)
});