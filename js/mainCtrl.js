ruinard.controller('liveStandingsController', function($http){
   	let self = this;
   	console.log("calling standings")
   	$http({
   		method: 'GET',
   		url: 'http://localhost:7777/standings'
   	}).success(function (data, status) {
   		self.east = data.east
           self.west = data.west
   		console.log(self.east)
   	}).error(function (data, status) {
   		console.log(data)
   	});

       $http({
           method: 'GET',
           url: 'http://localhost:7777/pronos'
       }).success(function (data, status) {
           self.pronos = data
       }).error(function (data, status) {
           console.log(data)
       });
   });