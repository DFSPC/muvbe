muvbe.controller('muvbeHomeController', function ($scope, $http){
  var scope = this;
  scope.user = JSON.parse(localStorage.getItem("userSession"));
  if (!scope.user){
    window.location = "#/";
  }

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
        post.author = data[post_data].author;
        post.authorName = getAuthorName(data[post_data].author);
        post.date = data[post_data].date;
        var datePost = new Date(data[post_data].date);
        post.date = datePost.getDate() + " de " + monthNames[datePost.getMonth()] + " del " + datePost.getFullYear();
        post.categoryId = data[post_data].categories[0];
        post.categoryName = getCategoryName(data[post_data].categories[0]);
        post.mediaId = data[post_data].featured_media;
        getImageUrlByPost(post, data[post_data].featured_media);
        getCommentsByPost(post);
        posts.push(post);
        scope.posts = posts;
      }
      localStorage.setItem("posts", JSON.stringify(scope.posts));
    });
  }

  scope.getAllData = function(){
    $http.get(urlAppServer + "/categories?per_page=100").success(function(data){
      scope.categories = data;
      localStorage.setItem("categories", JSON.stringify(scope.categories));
      $http.get(urlAppServer + "/users?per_page=100").success(function(dataUsers){
        scope.users = dataUsers;
        localStorage.setItem("users", JSON.stringify(scope.users));
        $http.get(urlAppServer + "/comments?per_page=100").success(function(dataComments){
          scope.comments = dataComments;
          localStorage.setItem("comments", JSON.stringify(scope.comments));
          $http.get(urlAppServer + "/media?per_page=100").success(function(dataMedia){
            scope.media = dataMedia;
            localStorage.setItem("media", JSON.stringify(scope.media));
            scope.getPosts();
          });
        });
      });
    });
  }

  if (localStorage.getItem("posts") && localStorage.getItem("categories") && localStorage.getItem("users")){
    scope.media = JSON.parse(localStorage.getItem("media"));
    scope.comments = JSON.parse(localStorage.getItem("comments"));
    scope.posts = JSON.parse(localStorage.getItem("posts"));
    scope.categories = JSON.parse(localStorage.getItem("categories"));
    scope.users = JSON.parse(localStorage.getItem("users"));
  }else{
    scope.getAllData();
  }

  function getImageUrlByPost(post, mediaId){
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

  function getCommentsByPost(post){
    if(!scope.comments){
      scope.comments();
    }else{
      var comments = scope.comments;
      post.comments = Array();
      for(var comments_data in comments) {
        if (post.id == comments[comments_data].post){
          var commentInfo = new Object();
          commentInfo.user = comments[comments_data].author_name;
          var dateComment = new Date(comments[comments_data].date);
          commentInfo.date = dateComment.getDate() + " de " + monthNames[dateComment.getMonth()] + " del " + dateComment.getFullYear();
          commentInfo.content = comments[comments_data].content.rendered;
          post.comments.push(commentInfo);
        }
      }
    }
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
