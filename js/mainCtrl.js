ruinard.controller('liveStandingsController', function(nbaStanding, Comments){
		var self = this;
		self.eastStanding = nbaStanding.east;
		self.westStanding = nbaStanding.west;
		self.pronos = nbaStanding.pronos;
        self.lastGames = nbaStanding.lastMatch;
        var commentService = new Comments();
        self.comments = Comments.get();
        self.addComment = function(){
        	commentService.$addComment(
        		{user: self.inputName, comment: self.inputComment},
        		function(){
        			//success
        			self.comments = Comments.get();
        			self.inputComment = "";
        		},
        		function(err){
        			// error
        			console.log("Error adding comment : ".err)
        		}
        	);
        }
        
        self.removeComment = function(commentId){
        	commentService.$removeComment(
        		{id: commentId},
        		function(){
        			// success
        			self.comments = Comments.get();
        		},
        		function(err){
        			// error
        			console.log("Error adding comment : ".err)
        		}
        	);
        }
});