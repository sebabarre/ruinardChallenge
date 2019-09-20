ruinard.factory('nbaStanding', function($http) {
	var standing = {};

	standing.west = [];
	standing.pronos = [];
    standing.lastMatch = [];

	const getPronoRanking = function () {
		$http({
			method: 'GET',
			url: 'https://sebabarre.usw1.kubesail.io/pronos'
		}).success(function (data, status) {

			for (let i = 0; i < data.length; i++) {
				standing.pronos[i] = data[i];
			}
		}).error(function (data, status) {
			console.log(data)
		});
	};

	var getCurrentConferenceStanding = function () {

	};

	// getPronoRanking()
	getCurrentConferenceStanding();
	return standing;
});


function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) - 1);
}