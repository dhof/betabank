angular.module('betaBankApp')
	.factory("mapFactory", [function() {


	var map = window.mapInit = function() {
		var map = new google.maps.Map(document.getElementById("map"), {
			center	  : {lat: 40.0169753, lng: -105.2222925},
			zoom	  : 12,
			mapTypeId : google.maps.MapTypeId.TERRAIN
		})
		return map;
	}

	function roma(){
		console.log("i'm roma!");
	};

	return {
		map: map	
	};
		
	}]);