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

var urlAppServer = 'http://londonojp.com/muvbe/web/wp-json/wp/v2'

//ROUTING
muvbe.config(['$routeProvider', function ($routeProvider) {
  $routeProvider

    /*
    **  Login
    **********************************************/
    .when("/", {
      templateUrl: "partials/login/login.html",
      controller: "muvbeHomeController as mhc"
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
      controller: "muvbeUserController as muc"
    })

    /*
    **  Content
    **********************************************/
    .when("/post-info/:postId", {
      templateUrl: "partials/content/getInfo.html",
      controller: "muvbePostInfoController as mpic"
    })
    .when("/post", {
      templateUrl: "partials/content/postInfo.html",
      controller: "muvbeCreatePostController as mcpc"
    })

    /*
    **  Categorys
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
    **  User
    **********************************************/

    .when("/author/:authorId", {
      templateUrl: "partials/author/detail.html",
      controller: "muvbeDetailAuthorController as mda"
    })
    //default url
    .otherwise({redirectTo: "/" });
}]);
