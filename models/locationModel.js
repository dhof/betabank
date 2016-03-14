var mongoose = require('mongoose')

var locationSchema = mongoose.Schema({
	name	 : String,
	position   : Object,
	walls 	 : []
})

module.exports = mongoose.model('Locations', locationSchema)