var  muvbe = angular.module('peopleController', []);

// FACTORY
muvbe.factory("user",function(){
  return {};
});

//CONTROLLERS
muvbe.controller('muvbeController', function ($scope, user){
  var scope = this;
  scope.user = user;
});

muvbe.controller('muvbeHomeController', function ($scope, $http, user){
  var scope = this;
  //scope.user = user;
  scope.user = JSON.parse(localStorage.getItem("userSession"));
  if (scope.user){
    window.location = "#/user";
  }

  scope.validateLogin = function(userName, userPassword){

    var userHash = decodeUserData(userName + ':' + userPassword);

    $http.defaults.headers.common.Authorization = 'Basic ' + userHash;
    $http.get(urlAppServer + '/users/me?_envelope').success(function(data){
      if (data.body.id){
        scope.user.successLogin = true;
        scope.user.id = data.body.id;
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

    $http({
      method: 'POST',
      url: urlAppServer + '/users',
      crossDomain: true,
      headers: {
        'authorization': 'Basic YWRtaW46YWRtaW4=',
        'content-type': 'application/json',
      },
      data: data,
    }).success(function (data) {
      scope.user.id = data.id;
      scope.user.successLogin = true;
      scope.user.userName = userName;
      scope.user.userPassword = userPassword;
      scope.user.userEmail = userEmail;
      scope.messageLogin = 'Gracias por Ingresar';
      localStorage.setItem("userSession", JSON.stringify(scope.user));
      window.location = "#/user";
    });
  }
});

muvbe.controller('muvbeUserController', function ($scope, $http, user){
  var scope = this;
  scope.user = JSON.parse(localStorage.getItem("userSession"));
  if (!scope.user){
    window.location = "#/";
  }

  scope.getCategories = function(){
    $http.get(urlAppServer + "/categories").success(function(data){
      scope.categories = data;
      localStorage.setItem("categories", JSON.stringify(scope.categories));
    });
  }

  scope.getUsers = function(){
    $http.get(urlAppServer + "/users").success(function(data){
      scope.users = data;
      localStorage.setItem("users", JSON.stringify(scope.users));
    });
  }

  var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  var posts = new Array();
  scope.getPosts = function(){
    posts = new Array();
    $http.get(urlAppServer + "/posts?per_page=100").success(function(data){
      for(var post_data in data) {
        var post = new Object();
        post.id = data[post_data].id;
        post.title = data[post_data].title.rendered;
        post.content = data[post_data].content.rendered;
        post.author = data[post_data].author;
        post.authorName = getAuthorName(data[post_data].author);
        post.date = data[post_data].date;
        var datePost = new Date(data[post_data].date);
        post.date = datePost.getDate() + " de " + monthNames[datePost.getMonth()] + " del " + datePost.getFullYear();
        post.categoryId = data[post_data].categories[0];
        post.categoryName = getCategoryName(data[post_data].categories[0]);
        getImageUrlByPost(data[post_data].id, data[post_data].featured_media);
        posts.push(post);
        scope.posts = posts;
      }
    });
  }

  scope.getPostsAndUsersAndCategories = function(){
    $http.get(urlAppServer + "/categories").success(function(data){
      scope.categories = data;
      localStorage.setItem("categories", JSON.stringify(scope.categories));
      $http.get(urlAppServer + "/users").success(function(dataUsers){
        scope.users = dataUsers;
        localStorage.setItem("users", JSON.stringify(scope.users));
        scope.getPosts();
      });
    });
  }

  if (localStorage.getItem("posts") && localStorage.getItem("categories") && localStorage.getItem("users")){
    scope.posts = JSON.parse(localStorage.getItem("posts"));
    scope.categories = JSON.parse(localStorage.getItem("categories"));
    scope.users = JSON.parse(localStorage.getItem("users"));
  }else{
    scope.getPostsAndUsersAndCategories();
  }

  function getImageUrlByPost(postId, fileId){
    $http.get(urlAppServer + "/media/" + fileId).success(function(data_image){
      posts.forEach(function(value) {
        if (value.id == postId){
          value.urlFeaturedImage = data_image.source_url;
        }
      });
      localStorage.setItem("posts", JSON.stringify(scope.posts));
    });
  }

  function getCategoryName(categoryId){
    if(!scope.categories){
      scope.getCategories();
    }else{
      categories = scope.categories;
      for(var category in scope.categories) {
        if (categories[category].id == categoryId){
          return categories[category].name;
        }
      }
    }
  }

  function getAuthorName(authorId){
    if(!scope.users){
      scope.getUsers();
    }else{
      users = scope.users;
      for(var user in scope.users) {
        if (users[user].id == authorId){
          return users[user].name;
        }
      }
    }
  }
});

muvbe.controller('muvbeExitController', function ($scope, user){
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
