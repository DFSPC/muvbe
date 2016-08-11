/* Metodo Get List
*****************************************************/
muvbe.controller('muvbeListCategotyController', function ($scope, $http ){

});

/* Metodo Get Detail
*****************************************************/
muvbe.controller('muvbeDetailCategotyController', function ($scope, $http, $routeParams ){

	var scope = this;

	scope.categoryId = $routeParams.categoryId;
	scope.categoryName = $scope.mv.getCategoryName(scope.categoryId );

});
