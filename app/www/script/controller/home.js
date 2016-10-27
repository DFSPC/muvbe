/* Metodo Get Home Data
*****************************************************/

muvbe.controller('muvbeHomeController', function ($scope, $http){
  var scope = this;
  scope.user = JSON.parse(localStorage.getItem("userSession"));
  if (!scope.user){
    window.location = "#/";
  }

  scope.user = JSON.parse(localStorage.getItem("userSession"));
  scope.media = JSON.parse(localStorage.getItem("media"));
  scope.comments = JSON.parse(localStorage.getItem("comments"));
  scope.categories = JSON.parse(localStorage.getItem("categories"));
  scope.ubications = JSON.parse(localStorage.getItem("ubications"));
  scope.users = JSON.parse(localStorage.getItem("users"));
  scope.posts = JSON.parse(localStorage.getItem("posts"));
  scope.favorites = JSON.parse(localStorage.getItem("favorites"));

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

muvbe.controller('swipeHome', function ($scope, $http){

  var scope = this;
  if((touch.pageY > yIni + 5) && (touch.pageX> xIni-5) && (touch.pageX<xIni+5)   ){
    // $nav_footer.addClass('expand');
    // $header.addClass('expand');
    console.log(touch.pageY + '......' + e.targetTouches.length);
    $content  =  $('#content');

    $content.animate({
      "marginTop": "200px",
      "opacity":   "0"
    }, 800);
    $content.animate({
      "marginTop": "0",
      "opacity":   "1"
    }, 400);
    // getAllData();
    $scope.mv.getAllData();
    // $content.trigger('.logo-app a');
    // .trigger( "click", [ ".logo-app a"] );
  }
});