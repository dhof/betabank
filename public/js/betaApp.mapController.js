angular.module('betaBankApp')
	.controller('mapControl', ['$scope', 'mapFactory', function($scope, mapFactory) {
		console.log("map control")

		var markers = [];
		var map = mapFactory.map();

		var convertXYToLatLng = function(x,y) {
			// get top left point on the map and then offset from there	
			var northEast = map.getBounds().getNorthEast();
			var southWest = map.getBounds().getSouthWest();
			var proj = map.getProjection();
			var tRight = proj.fromLatLngToPoint(northEast);
			var bLeft = proj.fromLatLngToPoint(southWest);
			var scale = 1 << map.getZoom();
			var newLatLng = proj.fromPointToLatLng(new google.maps.Point(x / scale + bLeft.x, y / scale + tRight.y));
			return newLatLng; 	
		}

		// Creates a marker object on ng-click
		$scope.createMarker = function($event) {

			if ($scope.addNewLocation === true) {
				var x = $event.clientX;
				var y = $event.clientY;
				// Convert x and y coordinate to lat and longitude coordinates
				var latLng = convertXYToLatLng(x, y);
				var marker = new google.maps.Marker({
					position:latLng,
					map : map,
					name: $scope.newLocationName
				});
				// marker.addListener('click', function(){
	   //                     // Close the previous inforwindow if still open
	   //                     // openWindow.close();
	   //                     // $scope.showLocation(marker);
	   //                    $scope.setModal(marker.name);
	            //           console.log($scope.currentModal);
	            // });

				// Push the created marker into markers array
				markers.push(marker);
				console.log(markers)
				$scope.addNewLocation = false;
				$scope.newLocationName = "";
				
			}	
		}

		$scope.addNewLocation = false;
		$scope.newLocationName		
	}])