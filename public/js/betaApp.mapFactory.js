angular.module('betaBankApp')
	.factory("mapFactory", [function() {
		var map = window.mapInit = function() {
			var mapDiv = document.getElementById("map");
			var map = new google.maps.Map(mapDiv, {		
				center: {lat: 40.0169753, lng: -105.2222925},
				zoom: 12
			});
			return map;
		};	
		return {
			map: map	
		};
	}]);