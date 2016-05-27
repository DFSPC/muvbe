var  muvbe = angular.module('posts', []);


/* Metodo Post
*****************************************************/

muvbe.controller('get', function ($scope, $http, user ){
  console.log('posts');
  $http.get("http://local.muvbe.com/?rest_route=/wp/v2/posts").success(function(data){
    //scope.listaMisComidas = respuesta.listaComidas;
    console.log(data);
    // scope.title = data.title.rendered;
    scope.content = data.content.rendered;
    // scope.date = data.date;
  });
  var scope = this;
  scope.user = user;

  //validateSession(scope.user.successLogin);
});

/* Metodo Post
*****************************************************/
muvbe.controller('post', function ($scope, $http, user ){

  var scope = this;

  scope.createPost = function(postTtlle){

    console.log(postTtlle)
  }

  $http({
      method: 'POST',
      url: 'http://local.muvbe.com/wp-json/wp/v2/posts',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic YWRtaW46YWRtaW4='
      },
      transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
      },
      data: {
        title : 'test 2',
        content : ' test test test test ',
        excerpt : 'excerpt'
       },
    }).success(function (data) {
      console.log(data);
    });
});



//en nuestro controlador inyectamos registerUsers para poder utilizar
//la función newRegister pasando los datos del formulario con $scope.user
muvbe.controller("registerController", function($scope, registerUsers){

  console.log('log');
    $scope.registerUser = function(){
        registerUsers.newRegister($scope.user);

        console.log($scope.user)
    }
})

//esto simplemente es para lanzar un mensaje si el login falla, se puede extender para darle más uso
// app.factory("mensajesFlash", function($rootScope){
//     return {
//         show_success : function(message){
//             $rootScope.flash_success = message;
//         },
//         show_error : function(message){
//             $rootScope.flash_error = message;
//         },
//         clear : function(){
//             $rootScope.flash_success = "";
//             $rootScope.flash_error = "";
//         }
//     }
// });

//factoria para registrar usuarios a la que le inyectamos la otra factoria
//mensajesFlash para poder hacer uso de sus funciones
// muvbe.factory("registerUsers", function($http, mensajesFlash){
//     return {
//         newRegister : function(user){
//             return $http({
//                 url: 'http://localhost/register_angular_ci/register/registerUser',
//                 method: "POST",
//                 data : "email="+user.email+"&password="+user.password+"&nombre="+user.nombre,
//                 headers: {'Content-Type': 'application/x-www-form-urlencoded'}
//             }).success(function(data){
//                     if(data.respuesta == "success"){
//                         mensajesFlash.clear();
//                         mensajesFlash.show_success("El registro se ha procesado correctamente.");
//                     }else if(data.respuesta == "exists"){
//                         mensajesFlash.clear();
//                         mensajesFlash.show_error("El email introducido ya existe en la bd.");
//                     }else if(data.respuesta == "error_form"){
//                         mensajesFlash.show_error("Ha ocurrido algún error al realizar el registro!.");
//                     }
//                 }).error(function(){
//                     mensajesFlash.show_error("Ha ocurrido algún error al realizar el registro!.");
//                 })
//         }
//     }
// })




