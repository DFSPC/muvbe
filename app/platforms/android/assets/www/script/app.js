function onload()
{
    document.addEventListener("deviceready",onDR,false);
}
function onDR()
{

}

var muvbe = angular.module('muvbe', [
  'ngRoute',
]);

//Variables
var urlAppServer = 'http://londonojp.com/muvbe/web/wp-json/wp/v2';
var urlAppServer2 = 'http://londonojp.com/muvbe/web/api';
var userHashAdmin = 'YWRtaW46YWRtaW4=';

//App controller
muvbe.controller('muvbeController', function ($scope, $http){
  var scope = this;
  scope.user = JSON.parse(localStorage.getItem("userSession"));
  scope.media = JSON.parse(localStorage.getItem("media"));
  scope.comments = JSON.parse(localStorage.getItem("comments"));
  scope.categories = JSON.parse(localStorage.getItem("categories"));
  scope.ubications = JSON.parse(localStorage.getItem("ubications"));
  scope.users = JSON.parse(localStorage.getItem("users"));
  scope.posts = JSON.parse(localStorage.getItem("posts"));

  scope.getMedia = function(){
    $http.get(urlAppServer + "/media?per_page=100").success(function(data){
      scope.media = data;
      localStorage.setItem("media", JSON.stringify(scope.media));
    });
  }

  scope.getCategories = function(){
    $http.get(urlAppServer + "/categories?per_page=100").success(function(data){
      scope.categories = data;
      localStorage.setItem("categories", JSON.stringify(scope.categories));
    });
  }

  scope.getUbications = function(){
    $http.get(urlAppServer + "/ubications?per_page=100").success(function(data){
      scope.ubications = data;
      localStorage.setItem("ubications", JSON.stringify(scope.ubications));
    });
  }

  scope.getUsers = function(){
    $http.get(urlAppServer + "/users?per_page=100").success(function(data){
      scope.users = data;
      localStorage.setItem("users", JSON.stringify(scope.users));
    });
  }

  scope.getComments = function(){
    $http.get(urlAppServer + "/comments?per_page=100").success(function(data){
      scope.comments = data;
      localStorage.setItem("comments", JSON.stringify(scope.comments));
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
        post.plainContent = $(data[post_data].content.rendered).text();
        post.author = data[post_data].author;
        post.authorName = scope.getAuthorName(data[post_data].author);
        var datePost = new Date(data[post_data].date);
        post.date = datePost.getDate() + " de " + monthNames[datePost.getMonth()] + " del " + datePost.getFullYear();
        if (data[post_data].categories){
          post.categoryName = scope.getCategoryName(data[post_data].categories[0]);
          post.categoryId = data[post_data].categories[0];
        }else{
          post.categoryName = "Sin Categoria";
          post.categoryId = 0;
        }
        if (data[post_data].ubications){
          post.ubicationId = data[post_data].ubications[0];
          post.ubicationName = scope.getUbicationName(data[post_data].ubications[0]);
        }else{
          post.ubicationId = 0;
          post.ubicationName = "Sin Ubicacion";
        }

        post.mediaId = data[post_data].featured_media;
        scope.getImageUrlByPost(post, data[post_data].featured_media);
        scope.getCommentsByPost(post);
        posts.push(post);
        scope.posts = posts;
      }
      scope.messageData = "";
      localStorage.setItem("posts", JSON.stringify(scope.posts));
    });
  }

  scope.getAllData = function(){
    scope.messageData = "Cargando... Categorias";
    scope.posts = new Array();
    $http.get(urlAppServer + "/categories?per_page=100").success(function(data){
      scope.categories = data;
      localStorage.setItem("categories", JSON.stringify(scope.categories));
      scope.messageData = "Cargando... Ubicaciones";
      $http.get(urlAppServer + "/ubications?per_page=100").success(function(data){
        scope.ubications = data;
        localStorage.setItem("ubications", JSON.stringify(scope.ubications));
        scope.messageData = "Cargando... Usuarios";
        $http.get(urlAppServer + "/users?per_page=100").success(function(dataUsers){
          scope.users = dataUsers;
          localStorage.setItem("users", JSON.stringify(scope.users));
          scope.messageData = "Cargando... Comentarios";
          $http.get(urlAppServer + "/comments?per_page=100").success(function(dataComments){
            scope.comments = dataComments;
            localStorage.setItem("comments", JSON.stringify(scope.comments));
            scope.messageData = "Cargando... Media";
            $http.get(urlAppServer + "/media?per_page=100").success(function(dataMedia){
              scope.media = dataMedia;
              localStorage.setItem("media", JSON.stringify(scope.media));
              scope.messageData = "Cargando... Posts";
              scope.getPosts();
            });
          });
        });
      });
    });
  }

  scope.getImageUrlByPost = function(post, mediaId){
    if(!scope.media){
      scope.getMedia();
    }else{
      var media = scope.media;
      for(var media_data in media) {
        if (mediaId == media[media_data].id){
          post.urlFeaturedImage = media[media_data].source_url;
        }
      }
    }
  }

  scope.getCommentsByPost = function( post){
    if(!scope.comments){
      scope.comments();
    }else{
      var comments = scope.comments;
      post.comments = Array();
      for(var comments_data in comments) {
        if (post.id == comments[comments_data].post){
          var commentInfo = new Object();
          commentInfo.id = comments[comments_data].id;
          commentInfo.authorId = comments[comments_data].author;
          commentInfo.authorName = comments[comments_data].author_name;
          var dateComment = new Date(comments[comments_data].date);
          commentInfo.date = dateComment.getDate() + " de " + monthNames[dateComment.getMonth()] + " del " + dateComment.getFullYear();
          commentInfo.content = comments[comments_data].content.rendered;
          post.comments.push(commentInfo);
        }
      }
    }
  }

  scope.getCategoryName = function(categoryId){
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

  scope.getUbicationName = function(ubicationId){
    if(!scope.ubications){
      scope.getUbications();
    }else{
      ubications = scope.ubications;
      for(var ubication in scope.ubications) {
        if (ubications[ubication].id == ubicationId){
          return ubications[ubication].name;
        }
      }
    }
  }

  scope.getAuthorName = function(authorId){
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


//ROUTING
muvbe.config(['$routeProvider', function ($routeProvider) {
  $routeProvider

    /*
    **  Login
    **********************************************/
    .when("/", {
      templateUrl: "partials/login/login.html",
      controller: "muvbeLoginController as mlc"
    })
    .when("/terms", {
      templateUrl: "partials/login/terms.html",
      controller: "muvbeSignUpController as msuc"
    })
    .when("/signup", {
      templateUrl: "partials/login/signup.html",
      controller: "muvbeSignUpController as msuc"
    })
    .when("/exit", {
      templateUrl: "partials/login/exit.html",
      controller: "muvbeExitController as mec"
    })

    /*
    **  Home
    **********************************************/
    .when("/home", {
      templateUrl: "partials/home/home.html",
      controller: "muvbeHomeController as mhc"
    })

    /*
    **  Content
    **********************************************/
    .when("/post-info/:postId", {
      templateUrl: "partials/content/getInfo.html",
      controller: "muvbePostInfoController as mpic"
    })
    .when("/edit-post/:postId", {
      templateUrl: "partials/content/editInfo.html",
      controller: "muvbeEditPostController as mepc"
    })
    .when("/post", {
      templateUrl: "partials/content/postInfo.html",
      controller: "muvbeCreatePostController as mcpc"
    })

    /*
    **  Categories
    **********************************************/
    .when("/categories", {
      templateUrl: "partials/category/list.html",
      controller: "muvbeListCategotyController as mlc"
    })
    .when("/categories/:categoryId", {
      templateUrl: "partials/category/detail.html",
      controller: "muvbeDetailCategotyController as mdc"
    })

    /*
    **  Ubications
    **********************************************/
    .when("/ubications", {
      templateUrl: "partials/ubication/list.html",
      controller: "muvbeListUbicationController as mlu"
    })
    .when("/ubications/:ubicationId", {
      templateUrl: "partials/ubication/detail.html",
      controller: "muvbeDetailUbicationController as mdu"
    })

    /*
    **  Author
    **********************************************/

    .when("/author/:authorId", {
      templateUrl: "partials/author/detail.html",
      controller: "muvbeDetailAuthorController as mda"
    })

    /*
    **  User
    **********************************************/

    .when("/user", {
      templateUrl: "partials/user/userInfo.html",
      controller: "muvbeUserInfoController as muic"
    })
    //default url
    .otherwise({redirectTo: "/" });
}]);

muvbe.filter('unique', function() {
   return function(collection, keyname) {
      var output = [],
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });

      return output;
   };
});
