var Locations = require('../models/locationModel.js')

function createLocation (req, res) {
	console.log("body wrecker ", req.body)
	var newLocation = new Locations({
		name   : req.body.name,
		position : req.body.position
	})
	newLocation.save(function (saveErr, location) {
		if (saveErr) {
			res.send({err : saveErr})
		} else {
			console.log(location)
			// res.send({location : location})
		}
	})
}

function getLocations (req, res) {
	Locations.find({}, function (err, locations) {
		res.send(locations)
	})
}

module.exports = {
	createLocation : createLocation,
	getLocations   : getLocations
}