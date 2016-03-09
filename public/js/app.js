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


app.controller('homeController', ['$scope', function($scope) {
	console.log("home control")
}])

app.controller('userController', ['$scope', function($scope) {
	console.log("user control")
}])

app.controller('mapController', ['$scope', function($scope) {
	console.log("map control")
}])