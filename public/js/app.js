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
	$http.get('/getuser')
		.then(function(returnData){
			if(!returnData.data.user){
				// Kick em out
				window.location.href = '/'
				// $location.url()
			}
			else{
				// rest of controller goes here
				$scope.user = returnData.data.user
				console.log($scope.user)

			}
		})
}])

app.controller('userController', ['$scope', function($scope) {
	console.log("user control")
}])

app.controller('mapController', ['$scope', function($scope) {
	console.log("map control")
}])