var ruinard = angular.module('ruinard', ['ngResource', 'ui.router']);

ruinard.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
		function ($stateProvider, $urlRouterProvider, $locationProvider) {
			$urlRouterProvider.otherwise("/"); 
			$stateProvider 
			.state('home', { 
			  url: "/", 
			  templateUrl: "standing.html", 
			  controller: "liveStandingsController as main" 
			}) 
			.state('backOffice', { 
			  url: "/backOffice", 
			  templateUrl: "backOffice.html", 
			  controller: "backOfficeController" 
			}) 
			}]);