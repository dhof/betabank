angular.module('betaBankApp')
	.controller('mapControl', ['$scope', '$http', 'mapFactory', function($scope, $http, mapFactory) {
		
		console.log("map control")
		var map = mapFactory.map()
	
		
		
		// Get already created locations from DB, set returned data to $scope.allLocations and create markers and event listeners for all of them
		$http.get('/api/locations')
			.then(function(returnedLocations) {
				$scope.allLocations = returnedLocations.data
				console.log($scope.allLocations)
				console.log($scope.allLocations.length)
				for (var i = 0; i < $scope.allLocations.length; i++) {
					var marker = new google.maps.Marker({
						position	: $scope.allLocations[i].position,
						map         : map,
						name        : $scope.allLocations[i].name
					})
					marker.addListener('click', function(){
	                       // Close the previous inforwindow if still open
	                      $scope.setModal(this.name);
	                      console.log($scope.currentModal)
	            });
				}
			})
		

		map.addListener('click', function(event) {
		        $scope.createMarker({ lat : event.latLng.lat(), lng : event.latLng.lng()})
		        // console.log(event.latLng.lat())
		        // console.log(event.latLng.lng())
        });



		$scope.addNewLocation = false;
		$scope.newLocationName = "";

		// Create new Marker and Location
	 	$scope.createMarker = function(location) {
	 		if ( $scope.addNewLocation === true && $scope.newLocationName != "" ) {
	 		marker = new google.maps.Marker({
	 			position : location,
	 			map : map,
	 			name : $scope.newLocationName
	 		})
	 		marker.addListener('click', function(){
                       // $scope.showLocation(marker);
                      $scope.setModal(marker.name);
                      console.log($scope.currentModal);
            });
	 		var newLocation = {
				name 	: $scope.newLocationName,
				position 	: location
			}
			if (newLocation.position != undefined) {
				console.log("this is loc ", newLocation)
				$http.post('/api/locations', newLocation)
					.then(function(returnData) {
						console.log(returnData.data)
					})
			}

		 	$scope.addNewLocation = false;
			$scope.newLocationName = "";

	 		}
		}


		// Create new Wall
		$scope.makeNewWall = function(wallInfo) {
			var newWall = {
				locationId : wallInfo.id,
				name 	   : wallInfo.name
			}
			console.log("newWall ", newWall)
			$http.post('/api/walls', newWall)
				.then(function(returnedWall) {
					$scope.locationWalls = returnedWall
				})
		}


		// Create new Problem
		$scope.makeNewProblem = function(problemInfo) {
			var newProblem = {
				locationId  : problemInfo.id,
				name 	    : problemInfo.name,
				grade 	    : problemInfo.grade,
				rating	    : problemInfo.rating,
				wall 		: problemInfo.wall
				// addedBy     : user.username,
				// firstAscent : newProblem.fa       
			}
			console.log("newProblems ", newProblem)
			$http.post('/api/problems', newProblem)
				.then(function(returnData) {
					console.log(returnData.data)
				})
		}
		

	$scope.addWall = true;
	$scope.addProblem = true;
	$scope.currentModal = "";

	// $scope.problemCompleted = null;
	// $scope.problemCompletedFunc = function() {
	// 	if ($scope.problemCreated === false) {
	// 		$scope.problemCreated = true;
	// 	} else {
	// 		$scope.problemCreated = false;
	// 	}
	// }
	


	$scope.setModal = function(selectedModal) {
		$scope.currentModal = selectedModal;
	};

	$scope.isModalSet = function(modalName) {
		return $scope.currentModal === modalName;
	}



}])

