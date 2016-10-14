/* Metodo Get List
*****************************************************/
muvbe.controller('muvbeListCategotyController', function ($scope, $http ){
  var scope = this;
  if (!$scope.mv.user){
    window.location = "#/";
  }
});

/* Metodo Get Detail
*****************************************************/
muvbe.controller('muvbeDetailCategotyController', function ($scope, $http, $routeParams ){
	var scope = this;
  if (!$scope.mv.user){
    window.location = "#/";
  }

	scope.categoryId = $routeParams.categoryId;
	scope.categoryName = $scope.mv.getCategoryName(scope.categoryId );

});
