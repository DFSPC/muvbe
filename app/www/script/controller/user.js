/* Metodo Get Detail
*****************************************************/
muvbe.controller('muvbeUserInfoController', function ($scope, $http, $routeParams ){
	var scope = this;
  if (!$scope.mv.user){
    window.location = "#/";
  }

	scope.filterUserId = function(actual, expected) {
		return actual == expected;
	}
});
