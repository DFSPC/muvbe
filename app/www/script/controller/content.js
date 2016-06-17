var  muvbe = angular.module('posts', []);

/* Metodo get
*****************************************************/

muvbe.controller('get', function ($scope, $http, user ){
  console.log('posts');
  $http.get("http://londonojp.com/muvbe/web/wp-json/wp/v2/posts").success(function(data){
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
muvbe.controller('muvbeCreatePostController', function ($scope, $http, user ){
  console.log("muvbeCreatePostController");
  // variables
  var scope = this;
  scope.user = JSON.parse(localStorage.getItem("userSession"));
  console.log(scope.user);
  if (!scope.user){
    window.location = "#/";
  }
  var userHash = decodeUserData(scope.user.userName + ':' + scope.user.userPassword);

  scope.createPost = function(title, content, file){

    data = JSON.stringify({
        "title" : title,
        "description" : content,
        "file": file,
    });

    var fd = new FormData();
    fd.append('file', file);
    $http.post('http://londonojp.com/muvbe/web/wp-json/wp/v2/media', fd, {
      transformRequest: angular.identity,
      headers: {
        "authorization": 'Basic ' + userHash,
        'content-type': undefined,
        "content-disposition": "attachment; filename=" + file.name,
      }
    }).success(function (data) {
      var imagePost = data.id;
      if (imagePost){
        data = JSON.stringify({
          "title" : title,
          "content" : content,
          "featured_media" : imagePost,
        });

        console.log(data);
        $http({
          method: 'POST',
          url: 'http://londonojp.com/muvbe/web/wp-json/wp/v2/posts',
          headers: {
            'authorization': 'Basic ' + userHash,
            'content-type': 'application/json',
          },
          data: data,
        }).success(function (data) {
          window.location = "#/user";
        });
      }
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
