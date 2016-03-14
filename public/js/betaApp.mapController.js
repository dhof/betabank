angular.module('betaBankApp')
	.controller('mapControl', ['$scope', '$http', 'mapFactory', function($scope, $http, mapFactory) {
		
		console.log("map control")
		var map = mapFactory.map()
		
		

		$http.get('/api/locations')
			.then(function(returnedLocations) {
				console.log(returnedLocations.data)
				$scope.allLocations = returnedLocations.data
			})

		$scope.populateMarkers = function() {
			for (var i = 0; i < $scope.allLocations.length; i++) {
				marker = new google.maps.Marker({
					position : allLocations[i].position,
					map 	 : map
				})
			}
		}
		$scope.populateMarkers()


		map.addListener('click', function(event) {
		        $scope.createMarker({ lat : event.latLng.lat(), lng : event.latLng.lng()})
		          
		        console.log(event.latLng.lat())
		        console.log(event.latLng.lng())
        });



	 	$scope.createMarker = function(location) {
	 		// console.log("new Loc ", $scope.addNewLocation)
	 		if ($scope.addNewLocation === true) {
	 		marker = new google.maps.Marker({
	 			position : location,
	 			map : map
	 		})
	 		var newLocation = {
				name 	: $scope.newLocationName,
				position 	: location
			}
				console.log("this is loc ", newLocation)
				$http.post('/api/locations', newLocation)
					.then(function(returnData) {
						console.log(returnData.data)
					})

		 	$scope.addNewLocation = false;
			$scope.newLocationName = "";

	 	}
	 }
		
		$scope.createMarker({lat: 40.0169753, lng: -105.2222925})
		$scope.createMarker({lat: 40.0169753, lng: -105.2122925})
		$scope.createMarker({lat: 40.04627736453682 , lng : -105.18791198730469})
		$scope.createMarker({lat: 40.03812939078128 , lng : -105.23735046386719})

		$scope.addNewLocation = false;
		// $scope.newLocationName


		

				

				// marker.addListener('click', function(){
	   //                     // Close the previous inforwindow if still open
	   //                     // openWindow.close();
	   //                     // $scope.showLocation(marker);
	                      // $scope.setModal(location.name);
	            //           console.log($scope.currentModal);
	            // });
		

		// $scope.showarray = function() {
		// 	console.log("fddf")
		// }
		/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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


	$scope.LocationCreate = function(name) {
		this.name = name;
		// this.position = position;
		this.areas = [];	/* {name: "", problems: []} */
		this.problems = [];
		$scope.locations[name] = this;
		console.log($scope.locations); //test
	}
	
	$scope.makeALocation = function(name){
		new $scope.LocationCreate(name)
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

