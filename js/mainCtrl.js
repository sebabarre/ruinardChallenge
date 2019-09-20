ruinard.controller('liveStandingsController', function($http){
	let self = this;
	$http({
		method: 'GET',
		url: 'http://localhost:7777/standings'
	}).success(function (data, status) {
		self.east = data.east
		console.log(self.east)
	}).error(function (data, status) {
		console.log(data)
	});
});