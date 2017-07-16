ruinard.factory('Comments', function ($resource){
	return $resource(
		//'http://localhost:8080/challengeServer/comments.php',	// dev sophie
		'http://ruinartchallenge.000webhostapp.com/back/comments.php',	//prod
		null,
		{
			'get': {
				method:'GET',
				params: {'action': 'get'},
				isArray:true,
				transformResponse: function(data){
					data = angular.fromJson(data);
					data.forEach(function(d, index){
						data[index].date = new Date(d.date);

					});
					return data;
				}
			},
			'addComment': {method:'POST', params: {'action': 'add'}},
			'removeComment': {method:'POST', params: {'action': 'remove'}}
		}
	);
});