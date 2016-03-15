var Locations = require('../models/locationModel.js')

function createLocation (req, res) {
	console.log(req.body)
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


function createWall (req, res) {
	Locations.findOne({_id : req.body.locationId }, function(err, foundLocation) {
		foundLocation.walls.push({ 
			wallName : req.body.name, 
			problems : []
		})
		foundLocation.markModified('walls')
		foundLocation.save(function(err, saved) {
			console.log(saved)
		})
	})	
}


function createProblem (req, res) {
	console.log("reqqer ", req.body)
	Locations.findOne({_id : req.body.locationId }, function(err, foundLocation) {
		console.log("found ", foundLocation)
		for (var i = 0; i < foundLocation.walls.length; i++) {
			if(foundLocation.walls[i].wallName === req.body.wall) {
				console.log("wall ", foundLocation.walls[i].problems)
				foundLocation.walls[i].problems.push({ 
					problemName : req.body.name, 
					grade 		: req.body.grade,
					rating 		: req.body.rating
				})
				foundLocation.markModified('problems')
				foundLocation.save(function(err, saved) {
					console.log("saved ", saved)
			})
			}
		}
	})	
}


module.exports = {
	createLocation  : createLocation,
	getLocations    : getLocations,
	createWall 		: createWall,
	createProblem   : createProblem
}