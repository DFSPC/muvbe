var  muvbe = angular.module('posts', []);




/* Metodo get
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
<<<<<<< HEAD
muvbe.controller('muvbeCreatePostController', function ($scope, $http, user ){
  console.log("muvbeCreatePostController");
=======

muvbe.controller('post', function ($scope, $http, user ){
>>>>>>> 4beb9a11a020bfa72fca24c2d117d84614b066c5
  // variables
  var scope = this;
  scope.user = user;
  var userHash = decodeUserData(scope.user.userName + ':' + scope.user.userPassword);

  scope.createPost = function(title, content, file){

    console.log(title);
    console.log(content);
    console.log(file);

    data = JSON.stringify({
        "title" : title,
        "description" : content,
        "file": file,
    });

    var fd = new FormData();
    fd.append('file', file);
    $http.post('http://local.muvbe.com/wp-json/wp/v2/media', fd, {
      transformRequest: angular.identity,
      headers: {
        "authorization": 'Basic YWRtaW46YWRtaW4=',
        'content-type': undefined,
        "content-disposition": "attachment; filename=" + file.name,
      }
    }).success(function (data) {
        console.log(data);
    });
  }
});

muvbe.directive('muvbeFileModel', ['$parse', function ($parse) {
  console.log("muvbeFileModel");
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var model = $parse(attrs.muvbeFileModel);
      var modelSetter = model.assign;

      element.bind('change', function(){
        scope.$apply(function(){
          modelSetter(scope, element[0].files[0]);
        });
      });
    }
  };
}]);












>>>>>>> 4beb9a11a020bfa72fca24c2d117d84614b066c5
