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
muvbe.controller('post', function ($scope, $http, user ){
  // variables
  var scope = this;
  scope.user = user;
  var userHash = decodeUserData(scope.user.userName + ':' + scope.user.userPassword);

  // creamos el objeto con las variables
  scope.createPost = function(post){



    var name = $scope.name;
    var file = $scope.file;



    console.log(name);
    console.log(file);


    // var env = {
    //       title : post.title,
    //       content : post.content,
    //       excerpt : 'excerpt',
    //     };

    // console.log(post.image);

  $http({
      method: 'POST',
      url: 'http://local.muvbe.com/wp-json/wp/v2/posts',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + userHash ,
      },
      transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
      },
      data: {
          title : name,
          content : ' fdfdfdf',
          file:  file,
          excerpt : 'excerpt',
        },
    }).success(function (data) {
        console.log(data);
    });
  }






});




muvbe.directive('uploaderModel', ["$parse", function ($parse) {
  return {
    restrict: 'A',
    link: function (scope, iElement, iAttrs)
    {
      iElement.on("change", function(e)
      {
        $parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);
      });
    }
  };
}])









