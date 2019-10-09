ruinard.controller('liveStandingsController', function($http){
	let self = this;
	console.log("calling standings")
	$http({
		method: 'GET',
		url: 'https://sebabarre.usw1.kubesail.io/standings'
	}).success(function (data, status) {
		self.east = data.east
        self.west = data.west
		console.log(self.east)
	}).error(function (data, status) {
		console.log(data)
	});

    $http({
        method: 'GET',
        url: 'https://sebabarre.usw1.kubesail.io/pronos'
    }).success(function (data, status) {
        self.pronos = data
    }).error(function (data, status) {
        console.log(data)
    });
});