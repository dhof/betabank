var app = angular.module('betaBankApp', ['ngRoute']);



app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl : "/html/home.html",
			controller  : "homeControl"
		})
		.when('/profile', {
			templateUrl : "/html/userprofile.html",
			controller  : "profileControl"
		})
		.when('/map', {
			templateUrl : "/html/map.html",
			controller  : "mapControl"
		})
}])


app.controller('homeControl', ['$scope', '$http', function($scope, $http) {
	console.log("home control")

	$scope.needToSignUp = false
	$scope.alreadySignedIn = false

	// $scope.showSignUp = function

	$http.get('/api/user')
		.then(function(userData){
			if(!userData.data.user){
				$scope.alreadySignedIn = true
			}	
		})

}])

app.controller('profileControl', ['$scope', '$http', function($scope, $http) {
	console.log("profile control")

	// var userID = $routeParams.id

	$http.get('/api/user')
		.then(function(userData){
			if(!userData.data.user){
				// Kick em out
				window.location.href = '/'
				// $location.url()
			}
			else{
				$scope.user = userData.data.user
				console.log("user ", $scope.user)
			}
		})

	$scope.showMe = function() {
		console.log($scope.user)
		// console.log($scope.user.data.user.username)
	}
}])





