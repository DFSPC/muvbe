var muvbe = angular.module('muvbe', ['ngRoute']);

//ROUTING
muvbe.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html"})
    // SignUp
    .when("/signup", {templateUrl: "partials/signup.html", controller: "muvbeController"})
    // User
    .when("/user", {templateUrl: "partials/user.html", controller: "muvbeController"})
}]);

//FACTORY
muvbe.factory("user",function(){
  return {};
});

//CONTROLLER
muvbe.controller('muvbeController', function ($scope, user){
  var scope = this;
  scope.user = user;
  (function validateSession(){
    if (!scope.user.successLogin){
      //window.location = "#/";
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

  scope.createUser = function(userName, userEmail, userPassword){
    scope.user.successLogin = true;
    scope.user.userName = userName;
    scope.user.userPassword = userPassword;
    scope.user.userEmail = userEmail;
    scope.messageLogin = 'Gracias por Ingresar';
    window.location = "#/user";
  }
});
