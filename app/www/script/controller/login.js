var  muvbe = angular.module('peopleController', []);

// FACTORY
muvbe.factory("user",function(){
  return {};
});

//CONTROLLERS
muvbe.controller('muvbeController', function ($scope, user){
  console.log('muvbeController');
  var scope = this;
  scope.user = user;
});

muvbe.controller('muvbeHomeController', function ($scope, $http, user){
  console.log('muvbeHomeController');
  var scope = this;
  //scope.user = user;
  scope.user = JSON.parse(localStorage.getItem("userSession"));
  if (scope.user){
    window.location = "#/user";
  }

  scope.validateLogin = function(userName, userPassword){

    var userHash = decodeUserData(userName + ':' + userPassword);

    $http.defaults.headers.common.Authorization = 'Basic ' + userHash;
    $http.get('http://local.muvbe.com/wp-json/wp/v2/users/me?_envelope').success(function(data){
      if (data.body.id){
        scope.user.successLogin = true;
        scope.user.userName = userName;
        scope.user.userPassword = userPassword;
        scope.messageLogin = 'Gracias por Ingresar';
        localStorage.setItem("userSession", JSON.stringify(scope.user));
        window.location = "#/user";
      }else{
        scope.successLogin = false;
        scope.messageLogin = 'Error al ingresar, verifique sus credenciales';
      }
    });
  }
});


/* Crea New User
************************************************/
muvbe.controller('muvbeSignUpController', function ($scope, $http, user){
  console.log('muvbeSignUpController');
  var scope = this;
  scope.user = user;
  scope.createUser = function(userName, userEmail, userPassword){

    data = JSON.stringify({
        "username" : userName,
        "name" : userName,
        "email" : userEmail,
        "password" : userPassword,
        "roles" : ['author'],
    });

    console.log("prueba" + data);

    $http({
      method: 'POST',
      url: 'http://local.muvbe.com/wp-json/wp/v2/users',
      crossDomain: true,
      headers: {
        'authorization': 'Basic YWRtaW46YWRtaW4=',
        'content-type': 'application/json',
      },
      data: data,
    }).success(function (data) {
      scope.user.successLogin = true;
      scope.user.userName = userName;
      scope.user.userPassword = userPassword;
      scope.user.userEmail = userEmail;
      scope.messageLogin = 'Gracias por Ingresar';
      window.location = "#/user";
    });
  }
});

muvbe.controller('muvbeUserController', function ($scope, $http, user){
  console.log('muvbeUserController');
  var scope = this;
  scope.user = JSON.parse(localStorage.getItem("userSession"));
  console.log(scope.user);
  if (!scope.user){
    window.location = "#/";
  }
  var posts = new Array();
  $http.get("http://local.muvbe.com/wp-json/wp/v2/posts").success(function(data){
    for(var post_data in data) {
      var post = new Array();
      post['id'] = data[post_data].id;
      post['title'] = data[post_data].title.rendered;
      post['content'] = data[post_data].content.rendered;
      post['date'] = data[post_data].date;
      getImageUrlByPost(data[post_data].id, data[post_data].featured_media);
      posts.push(post);
    }
  });

  function getImageUrlByPost(postId, fileId){
    $http.get("http://local.muvbe.com/wp-json/wp/v2/media/" + fileId).success(function(data_image){
      posts.forEach(function(value) {
        if (value['id'] == postId){
          value['urlFeaturedImage'] = data_image.media_details.sizes.full.source_url;
        }
      });
    });
  }
  scope.posts = posts;
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
    console.log('no login');
  }
}

function decodeUserData(input) {
    /* jshint ignore:start */
  var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var output = "";
  var chr1, chr2, chr3 = "";
  var enc1, enc2, enc3, enc4 = "";
  var i = 0;

  do {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);

    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;

    if (isNaN(chr2)) {
        enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
        enc4 = 64;
    }

    output = output +
        keyStr.charAt(enc1) +
        keyStr.charAt(enc2) +
        keyStr.charAt(enc3) +
        keyStr.charAt(enc4);
    chr1 = chr2 = chr3 = "";
    enc1 = enc2 = enc3 = enc4 = "";
  }while (i < input.length);
  return output;
}

function killSession(scopeUser){
  scopeUser.userName = '';
  scopeUser.userEmail = '';
  scopeUser.userPassword = '';
  scopeUser.successLogin = false;
  localStorage.clear();
}

// Html content filter
muvbe.filter('to_trusted', ['$sce',function($sce) {
  return function(text){
    return $sce.trustAsHtml(text);
  }
}]);
