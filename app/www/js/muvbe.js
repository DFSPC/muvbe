var muvbe = angular.module('muvbe', ['ngRoute']);

//ROUTING
muvbe.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "muvbeHomeController as mhc"})
    // SignUp
    .when("/signup", {templateUrl: "partials/signup.html", controller: "muvbeSignUpController as msuc"})
    // User
    .when("/user", {templateUrl: "partials/user.html", controller: "muvbeUserController as muc"})
    // Exit
    .when("/exit", {templateUrl: "partials/exit.html", controller: "muvbeExitController as mec"})
}]);

//FACTORY
muvbe.factory("user",function(){
  return {};
});

//CONTROLLERS
muvbe.controller('muvbeController', function ($scope, user){
  console.log('muvbeController');
  var scope = this;
  scope.user = user;
});

muvbe.controller('muvbeHomeController', function ($scope, user){
  console.log('muvbeHomeController');
  var scope = this;
  scope.user = user;
  console.log(scope.user);
  validateSession(scope.user.successLogin);
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

muvbe.controller('muvbeSignUpController', function ($scope, user){
  console.log('muvbeSignUpController');
  var scope = this;
  scope.user = user;
  scope.createUser = function(userName, userEmail, userPassword){
    scope.user.successLogin = true;
    scope.user.userName = userName;
    scope.user.userPassword = userPassword;
    scope.user.userEmail = userEmail;
    scope.messageLogin = 'Gracias por Ingresar';
    window.location = "#/user";
  }
});

muvbe.controller('muvbeUserController', function ($scope, user){
  console.log('muvbeUserController');
  var scope = this;
  scope.user = user;
  validateSession(scope.user.successLogin);
});

muvbe.controller('muvbeExitController', function ($scope, user){
  console.log('muvbeExitController');
  var scope = this;
  scope.user = user;
  killSession(scope.user);
  window.location = "#/";
});

//HELPERS
function validateSession(successLogin){
  if (!successLogin){
    window.location = "#/";
  }
}

function killSession(scopeUser){
  scopeUser.userName = '';
  scopeUser.userEmail = '';
  scopeUser.userPassword = '';
  scopeUser.successLogin = false;
}
