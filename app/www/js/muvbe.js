var muvbe = angular.module('muvbe', ['ngRoute']);

muvbe.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html"})
    // Pages
    .when("/user", {templateUrl: "partials/user.html", controller: "muvbeController"})
}]);

muvbe.factory("user",function(){
  return {};
});

muvbe.controller('muvbeController', function ($scope, user){
  var scope = this;
  scope.user = user;
  (function validateSession(){
    if (!scope.user.successLogin){
      window.location = "#/";
    }
  })();

  scope.validateLogin = function(userName, userPassword){
    if (userName == 'daniel' && userPassword == '123456'){
      scope.user.successLogin = true;
      scope.user.userName = userName;
      scope.user.userPassword = userPassword;
      scope.messageLogin = 'Gracias por Ingresar';
      window.location = "#/user";
    }else{
      scope.successLogin = false;
      scope.messageLogin = 'Error al ingresar, intenta con el usuario: daniel y la contraseña: 123456';
    }
  }
});
