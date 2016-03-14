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

		// Creates a new marker with an event listener that sets currentModal when the Input box is populated, the Create Location button has been clicked (sets addNewLocation to true) and then user clicks on map
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

		


				
		

		
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
			CONSTRUCTOR AREA
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */



	$scope.locations = {};
	$scope.newArea = {};
	$scope.newProblem = {};
	$scope.addArea = true;
	$scope.addProblem = true;
	// $scope.problemCompleted = null;
	// $scope.problemCompletedFunc = function() {
	// 	if ($scope.problemCreated === false) {
	// 		$scope.problemCreated = true;
	// 	} else {
	// 		$scope.problemCreated = false;
	// 	}
	// }
	$scope.currentModal = "";


	$scope.setModal = function(selectedModal) {
		$scope.currentModal = selectedModal;
	};

	$scope.isModalSet = function(modalName) {
		return $scope.currentModal === modalName;
	}
	
	$scope.anyAreas = function(name) {
		if (name.areas.length === 0) {
			return false;
		} else {
			return true;
		}
	}




	
	$scope.AreaCreate = function(name) {
		$scope.locations[$scope.currentModal].areas.push(name)
		$scope.newArea = {};
		console.log($scope.locations); // test
	}

	$scope.makeAnArea = function(name){
		console.log("current modal " + name)
		new $scope.AreaCreate(name)
	}

	$scope.problemCreate = function(problem, grade, rating, area) {
		// this.completed = completed;
		this.problem = problem;
		this.grade = grade;
		this.rating = rating;
		this.area = area;
		$scope.locations[$scope.currentModal].problems.push({name: this.problem, grade: this.grade, rating: this.rating, area: this.area})
		$scope.newProblem = {};
		// console.log($scope.locations[$scope.currentModal].problems[0].name);
	}	



}])

