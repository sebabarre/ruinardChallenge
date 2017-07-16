ruinard.factory('nbaStanding', function($http) {
	var standing = {};

	standing.east = [];
	standing.west = [];
	standing.pronos = [];
    standing.lastMatch = [];

	var getCurrentConferenceStanding = function() {
		//Appel Ajax pour récupérer le json du classement actuel
		$http({
			method: 'GET',
			url: 'http://api.thescore.com/nba/standings?rpp=-1'
		}).success(function(data, status) {
			for (var i=0; i < data.length ; i++) {
				//Alimenter les tableaux est/west avec le retour json
				if (data[i].conference === "Western") {
					standing.west[data[i].conference_seed] = data[i];
				} else {
					standing.east[data[i].conference_seed] = data[i];
				}
			}
            // Appel Ajax pour récupérer le json des pronos
			$http({
				dataType: 'JSONP',
				url: 'https://gist.githubusercontent.com/anonymous/d02b226f4ea4fd57fe972d7ae9338501/raw/e7f9340f81e334f2a890155b38dd454040ccaa8b/gistfile1.txt'
			}).success(function(data, status) {
                // calcul du classement des pronos
				for (var i=0; i < data.length ; i++) {
					standing.pronos[i] = data[i];
					standing.pronos[i].points = 0;
					standing.pronos[i].numberOfFirst = 'z';
					standing.pronos[i].numberOfSecond = 'z';
					standing.pronos[i].statusWest = [];
					standing.pronos[i].statusEast = [];
                    standing.pronos[i].cumul = [];
                    standing.pronos[i].departagePhrase = '';
				}
				for (var i=0; i < standing.pronos.length ; i++) {
					// parcours est
					for (var j=1; j<=8; j++) {
						for (var k=1; k<=8; k++) {
							if (standing.pronos[i].East[j] === standing.east[k].team.medium_name && j === k) {
								standing.pronos[i].points += 5;
								standing.pronos[i].statusEast[j] = 5;
                                standing.pronos[i].numberOfFirst = nextChar(standing.pronos[i].numberOfFirst); 
                                standing.pronos[i].cumul[j] = 'a';
								break;
							} else if (standing.pronos[i].East[j] === standing.east[k].team.medium_name) {
								standing.pronos[i].points += 2;
								standing.pronos[i].statusEast[j]= 2;
                                standing.pronos[i].numberOfSecond = nextChar(standing.pronos[i].numberOfSecond);
                                standing.pronos[i].cumul[j] = 'b';
								break;
							} else if (k === 8) {
                                standing.pronos[i].cumul[j] = 'c';
                            }
						}
					}
					// parcours ouest
					for (var j=1; j<=8; j++) {
						for (var k=1; k<=8; k++) {
							if (standing.pronos[i].West[j] === standing.west[k].team.medium_name && j === k) {
								standing.pronos[i].points += 5;
								standing.pronos[i].statusWest[j] = 5;
                                standing.pronos[i].numberOfFirst = nextChar(standing.pronos[i].numberOfFirst); 
                                standing.pronos[i].cumul[j] += 'a';
								break;
							} else if (standing.pronos[i].West[j] === standing.west[k].team.medium_name) {
								standing.pronos[i].points += 2;
								standing.pronos[i].statusWest[j] = 2;
                                standing.pronos[i].numberOfSecond = nextChar(standing.pronos[i].numberOfSecond);
                                standing.pronos[i].cumul[j] += 'b';
								break;
							} else if (k === 8){
                                standing.pronos[i].cumul[j] += 'c';
                            }
						}
					}
                    standing.pronos[i].departagePhrase += standing.pronos[i].numberOfFirst;
                    standing.pronos[i].departagePhrase += standing.pronos[i].numberOfSecond;
                    for (var j=1; j<=8; j++) {
                    var letter = '';
                        if (standing.pronos[i].cumul[j] === 'aa') {
                            letter = 'e';
                        } else if (standing.pronos[i].cumul[j].indexOf('a') > -1) {
                            letter = 'd';
                        } else if (standing.pronos[i].cumul[j] === 'bb') {
                            letter = 'c';
                        } else if (standing.pronos[i].cumul[j].indexOf('b') > -1) {
                            letter = 'b';
                        } else {
                            letter = 'a';
                        }
                        standing.pronos[i].departagePhrase += letter;
                    }
				}

                $http({
                    dataType: 'JSONP',
                    url: 'http://api.thescore.com/nba/schedule?utc_offset=25200'
                }).success(function(data,status) {
                    var urlResults="http://api.thescore.com/nba/events?id.in=";
                    for(var i=0 ; i < data.current_group.event_ids.length; i++) {
                        urlResults += data.current_group.event_ids[i];
                        if (i!=data.current_group.event_ids.length-1) {
                            urlResults += "%2C";
                        }
                    }
                    $http({
                        dataType: 'JSONP',
                        url: urlResults
                    }).success(function(data,status) {
                        for(var i=0 ; i < data.length; i++) {
                            if (data[i].event_status === 'final') {
                                standing.lastMatch[i] = data[i];
                            }
                        }
                    });
                });
			}).error(function(data, status) {
				console.log(data)
			});
		}).error(function(data, status) {
			console.log(data)
		});
	};
	getCurrentConferenceStanding();
	return standing;
});


function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) - 1);
}