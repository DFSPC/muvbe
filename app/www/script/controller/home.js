/* Metodo Get Home Data
*****************************************************/

muvbe.controller('muvbeHomeController', function ($scope, $http){
  var scope = this;
  scope.user = JSON.parse(localStorage.getItem("userSession"));
  if (!scope.user){
    window.location = "#/";
  }
  if ($scope.mv.media
    && $scope.mv.comments
    && $scope.mv.posts
    && $scope.mv.categories
    && $scope.mv.users
    && $scope.mv.ubications
    && $scope.mv.favorites
    ){
  }else{
    $scope.mv.getAllData();
  }
});
