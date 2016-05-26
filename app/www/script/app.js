var muvbe = angular.module('muvbe', [
  'ngRoute',
  'peopleController',
  'posts'
]);

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
    .when("/get", {
      templateUrl: "partials/post/get.html",
      controller: "posts as muc"
    })
    .when("/post", {
      templateUrl: "partials/post/post.html",
      controller: "posts as muc"
    })
    //default url
    .otherwise({redirectTo: "/" });
}]);

