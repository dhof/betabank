var app=angular.module("betaBankApp",["ngRoute","ngResource"]);app.config(["$routeProvider",function(o){o.when("/",{templateUrl:"/html/home.html",controller:"homeController"}).when("/profile",{templateUrl:"/html/userprofile.html",controller:"profileController"}).when("/map",{templateUrl:"/html/map.html",controller:"mapController"})}]),app.controller("homeController",["$scope","$http",function(o,l){console.log("home control")}]),app.controller("profileController",["$scope","$http","$routeParams",function(o,l,e){console.log("profile control"),l.get("/api/users/").then(function(l){l.data.user?(o.user=l,console.log(o.user)):window.location.href="/"}),o.showMe=function(){console.log(o.user.data)}}]),app.controller("mapController",["$scope",function(o){console.log("map control")}]);