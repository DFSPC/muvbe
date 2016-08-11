/* Metodo Get Detail
*****************************************************/
muvbe.controller('muvbeDetailAuthorController', function ($scope, $http, $routeParams ){

	var scope = this;

	scope.authorId = $routeParams.authorId;
	scope.authorName = $scope.mv.getAuthorName(scope.authorId);

	scope.filterAuthorId = function(actual, expected) {
		return actual == expected;
	}
});
