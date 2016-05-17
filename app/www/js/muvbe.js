var muvbe = angular
  .module('muvbe', [])
  .controller("muvbeController", ['$http', muvbeController]);

function muvbeController($http){
  var scope = this;

  scope.validateLogin = function(user, password){
    if (user == 'daniel' && password == '123456'){
      scope.successLogin = true;
      scope.messageLogin = 'Gracias por Ingresar';
    }else{
      scope.successLogin = false;
      scope.messageLogin = 'Error al ingresar, intenta con el usuario: daniel y la contraseña 123456';
    }
  }
}
