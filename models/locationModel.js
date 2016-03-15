var mongoose = require('mongoose')

var locationSchema = mongoose.Schema({
	name	 : String,
	position   : Object,
	walls :  [
	{
	wallName : String,
	problems : []
	}]
})

module.exports = mongoose.model('Locations', locationSchema)