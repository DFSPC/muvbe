/* Metodo Get List
*****************************************************/
muvbe.controller('muvbeListUbicationController', function ($scope, $http ){
  var scope = this;
  if (!$scope.mv.user){
    window.location = "#/";
  }
});

/* Metodo Get Detail
*****************************************************/
muvbe.controller('muvbeDetailUbicationController', function ($scope, $http, $routeParams ){
  var scope = this;
  if (!$scope.mv.user){
    window.location = "#/";
  }

  scope.ubicationId = $routeParams.ubicationId;
  scope.ubicationName = $scope.mv.getUbicationName(scope.ubicationId);

});
