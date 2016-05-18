var muvbe = angular.module('muvbe', ['ngRoute']);

muvbe.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "muvbeController"})
    // Pages
    .when("/user", {templateUrl: "partials/user.html", controller: "muvbeController"})
}]);

muvbe.controller('muvbeController', function (){
  var scope = this;

  scope.validateLogin = function(user, password){
    if (user == 'daniel' && password == '123456'){
      scope.successLogin = true;
      scope.messageLogin = 'Gracias por Ingresar';
      window.location = "/#/user";
    }else{
      scope.successLogin = false;
      scope.messageLogin = 'Error al ingresar, intenta con el usuario: daniel y la contraseña 123456';
    }
  }
});
