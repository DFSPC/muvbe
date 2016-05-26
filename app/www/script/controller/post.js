var  muvbe = angular.module('posts', []);

muvbe.controller('posts', function ($scope, $http, user ){
  console.log('posts');
  $http.get("http://muvbe.com/?rest_route=/wp/v2/posts").success(function(data){
    //scope.listaMisComidas = respuesta.listaComidas;
    console.log(data);
    $scope.posts = data;

    // scope.title = data.title.rendered;
    scope.content = data.content.rendered;
    // scope.date = data.date;

  });
  var scope = this;
  scope.user = user;

  //validateSession(scope.user.successLogin);
});