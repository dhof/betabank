var app = angular.module('betaBankApp', ['ngRoute']);



app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl : "/html/home.html",
			controller  : "homeController"
		})
		.when('/profile', {
			templateUrl : "/html/userprofile.html",
			controller  : "userController"
		})
		.when('/map', {
			templateUrl : "/html/map.html",
			controller  : "mapController"
		})
}])


app.controller('homeController', ['$scope', '$http', function($scope, $http) {
	console.log("home control")
	
}])

app.controller('userController', ['$scope', '$http', function($scope, $http) {
	console.log("user control")
	
	$http.get('/getuser')
		.then(function(userData){
			if(!userData.data.user){
				// Kick em out
				window.location.href = '/'
				// $location.url()
			}
			else{
				$scope.user = userData
				console.log($scope.user)
			}
		})

	$scope.showMe = function() {
		console.log($scope.user)
	}
}])

app.controller('mapController', ['$scope', function($scope) {
	console.log("map control")
}])