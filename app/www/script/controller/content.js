var  muvbe = angular.module('posts', []);
// metodo get
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

// metodo post

muvbe.controller('post', function ($scope, $http, user ){

  // TestController($scope, $http);
// $http.defaults.headers.common.Authorization = 'Basic ZGV2ZWxvcGVyOmRldmVsb3Blcg==';
  // function TestController($scope, $http) {
  //   $http({
  //       method: "POST",
  //       url: 'http://local.muvbe.com/wp-json/wp/v2/posts',
  //       data: {
  //         title: 'casa colombia',
  //         // content: 'es grande buena vista',
  //         // excerpt: 'Excerpt'
  //       },
  //       config: {

  //       },
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //         'Authorization': 'Basic YWRtaW46YWRtaW4='
  //       }
  //   }).success(function (data, status, headers, config) {
  //       $scope.persons = data; // assign  $scope.persons here as promise is resolved here
  //       // console.log(data)

  //   }).error(function (data, status, headers, config) {
  //       $scope.status = status;
  //   });
  // }

  //  var req = {
  //       method: 'POST',
  //       url: 'http://local.muvbe.com/wp-json/wp/v2/posts',
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //         'Authorization': 'Basic YWRtaW46YWRtaW4='
  //       },
  //       data: { title : 'test' },
  //      }

  // $http(req).then(function(){console.log('if')}, function(){console.log('else')});


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

      console.log(' setUTCFullYear(yearValue)');

  });

});




