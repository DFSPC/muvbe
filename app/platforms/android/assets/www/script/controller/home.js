/* Metodo Get Home Data
*****************************************************/

muvbe.controller('muvbeHomeController', function ($scope, $http){
  var scope = this;
  if ($scope.mv.media
    && $scope.mv.comments
    && $scope.mv.posts
    && $scope.mv.categories
    && $scope.mv.users
    ){
  }else{
    $scope.mv.getAllData();
  }
});
