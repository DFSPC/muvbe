var  muvbe = angular.module('posts', []);

/* Metodo get
*****************************************************/

muvbe.controller('get', function ($scope, $http, user ){
  console.log('posts');
  $http.get(urlAppServer + "/posts").success(function(data){
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


  scope.getCategories = function(){
    $http.get(urlAppServer + "/categories").success(function(data){
      scope.categories = data;
    });
  }

  scope.createPost = function(title, content, file, category){
    var fd = new FormData();
    fd.append('file', file);
    $http.post(urlAppServer + '/media', fd, {
      transformRequest: angular.identity,
      headers: {
        "authorization": 'Basic ' + userHash,
        'content-type': undefined,
        "content-disposition": "attachment; filename=" + file.name,
      }
    }).success(function (data) {
      var imagePost = data.id;
      var status =  "publish";
      if (imagePost){
        data = JSON.stringify({
          "title" : title,
          "content" : content,
          "featured_media" : imagePost,
          "categories" : [category],
          "status" : status
        });

        console.log(data);
        $http({
          method: 'POST',
          url: urlAppServer + '/posts',
          headers: {
            'authorization': 'Basic ' + userHash,
            'content-type': 'application/json',
          },
          data: data,
        }).success(function (data) {
          window.location = "#/validate";
        });
      }
    });
  }

  scope.getCategories();
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
