var app = angular.module('betaBankApp', ['ngRoute', 'ngResource']);



app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl : "/html/home.html",
			controller  : "homeController"
		})
		.when('/profile', {
			templateUrl : "/html/userprofile.html",
			controller  : "profileController"
		})
		.when('/map', {
			templateUrl : "/html/map.html",
			controller  : "mapController"
		})
}])


app.controller('homeController', ['$scope', '$http', function($scope, $http) {
	console.log("home control")
}])

app.controller('profileController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
	console.log("profile control")

	// var userID = $routeParams.id

	$http.get('/api/users/')
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
		console.log($scope.user.data)
		// console.log($scope.user.data.user.username)
	}
}])

app.controller('mapController', ['$scope', function($scope) {
	console.log("map control")
}])