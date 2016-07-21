function onload()
{
    document.addEventListener("deviceready",onDR,false);
}
function onDR()
{
alert("device ready");
}

var muvbe = angular.module('muvbe', [
  'ngRoute',
  'peopleController',
  'posts',
  'listcategory',
]);

var urlAppServer = 'http://londonojp.com/muvbe/web/wp-json/wp/v2'

//ROUTING
muvbe.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {
      templateUrl: "partials/login/home.html",
      controller: "muvbeHomeController as mhc"
    })
    // SignUp
    .when("/signup", {
      templateUrl: "partials/login/signup.html",
      controller: "muvbeSignUpController as msuc"
    })
    // User
    .when("/user", {
      templateUrl: "partials/login/user.html",
      controller: "muvbeUserController as muc"
    })
    // Exit
    .when("/exit", {
      templateUrl: "partials/login/exit.html",
      controller: "muvbeExitController as mec"
    })
    .when("/post-info/:postId", {
      templateUrl: "partials/post/get.html",
      controller: "muvbePostInfoController as mpic"
    })
    .when("/post", {
      templateUrl: "partials/post/post.html",
      controller: "muvbeCreatePostController as mcpc"
    })
    /*
    **  Categorys
    **********************************************/
    .when("/categories", {
      templateUrl: "partials/categoria/list.html",
      controller: "muvbeListCategotyController as mlc"
    })
    .when("/categories/:categoryId", {
      templateUrl: "partials/categoria/detail.html",
      controller: "muvbeDetailCategotyController as mdc"
    })
    //default url
    .otherwise({redirectTo: "/" });
}]);
