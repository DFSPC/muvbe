/* Metodo Get
*****************************************************/
muvbe.controller('muvbePostInfoController', function ($scope, $http, $routeParams){
  var scope = this;
  if (!$scope.mv.user){
    window.location = "#/";
  }
  var userHash = decodeUserData($scope.mv.user.userName + ':' + $scope.mv.user.userPassword);
  var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  scope.postId = $routeParams.postId;
  $scope.show_confirm = false;
  $scope.pop_up = "hidden";
  $scope.disabled_class = "show";
  // $scope.overflow_class = "overflow_auto";

  scope.addComment = function(content){
    load();
    var data = JSON.stringify({
      "content" : content,
      "post" : scope.postId,
    });

    $http({
      method: 'POST',
      url: urlAppServer + '/comments',
      headers: {
        'authorization': 'Basic ' + userHash,
        'content-type': 'application/json',
      },
      data: data,
    }).success(function (data) {
      posts = $scope.mv.posts;
      posts.forEach(function(value) {
        if (value.id == scope.postId){
          if (!value.comments){
            value.comments = new Array();
          }
          var commentInfo = new Object();
          commentInfo.id = data.id;
          commentInfo.authorId = data.author;
          commentInfo.authorName = data.author_name;
          commentInfo.authorAvatar = $scope.mv.user.avatar;
          var dateComment = new Date(data.date);
          commentInfo.date = dateComment.getDate() + " de " + monthNames[dateComment.getMonth()] + " del " + dateComment.getFullYear();
          commentInfo.content = data.content.rendered;
          value.comments.push(commentInfo);
        }
      });
      $scope.mv.posts = posts;
      localStorage.setItem("posts", JSON.stringify($scope.mv.posts));
      finishedLoad()
    }).error(function(response){
      alert("Espera un momeno para volver a comentar");
    });
  }


  /*
  * Confirma  eliminar comentario
  ***********************************************/

  scope.confirmShow = function(element) {
    $scope.show_confirm = !$scope.show_confirm;

     var
      $body   =  angular.element('body');
      console.log(element);
      if($scope.show_confirm) {
        element.disabled_class = "hidden";
        element.pop_up = "show";
         $body.addClass('overflow');
      } else {
        element.disabled_class = "show";
        element.pop_up = "hidden";
        $body.removeClass('overflow');

    }
  }

  scope.deleteComment = function(id, value){
    load();
    $http({
      method: 'DELETE',
      url: urlAppServer + '/comments/' + id,
      headers: {
        'authorization': 'Basic ' + userHashAdmin,
        'content-type': 'application/json',
      },
    }).success(function (data) {
      posts = $scope.mv.posts;
      posts.forEach(function(value) {
        if (value.id == scope.postId){
          newCommmets = Array();
          value.comments.forEach(function(valueComment) {
            if (valueComment.id != id){
              newCommmets.push(valueComment);
            }
          });
          value.comments = newCommmets;
        }
      });
      $scope.mv.posts = posts;
      localStorage.setItem("posts", JSON.stringify($scope.mv.posts));
      $scope.show_confirm = false;
      // element.pop_up = "hidden";
      finishedLoad();
    });
  }

  scope.deletePost = function(id){
    $http({
      method: 'DELETE',
      url: urlAppServer + '/posts/' + id,
      headers: {
        'authorization': 'Basic ' + userHash,
        'content-type': 'application/json',
      },
    }).success(function (data) {
      posts = $scope.mv.posts;
      newPosts = Array();
      posts.forEach(function(value) {
        if (value.id != scope.postId){
          newPosts.push(value);
        }
      });
      $scope.mv.posts = newPosts;
      localStorage.setItem("posts", JSON.stringify($scope.mv.posts));
      window.location = "#/home";
    });
  }
});

/* Metodo Post
*****************************************************/
muvbe.controller('muvbeCreatePostController', function ($scope, $http ){
  // variables
  var scope = this;
  if (!$scope.mv.user){
    window.location = "#/";
  }
  var userHash = decodeUserData($scope.mv.user.userName + ':' + $scope.mv.user.userPassword);
  var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  //Take FILE_URL
  scope.takephotoURL = function(){
    navigator.camera.getPicture(onURLSuccess, onURLFail,
    { quality : 100,
      destinationType : Camera.DestinationType.FILE_URI,
      sourceType : Camera.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: Camera.EncodingType.PNG,
      targetWidth: 640,
      targetHeight: 640,
      saveToPhotoAlbum: true }
    );
  }
  function onURLSuccess(imageURI) {
    var image = document.getElementById('myImage');
    image.src = imageURI;
  }

  function onURLFail(message) {
    alert('No tomaste una foto!');
  }

  //From Library
  scope.choosePhoto = function(){
    navigator.camera.getPicture(onlibSuccess, onlibFail,
    { quality : 100,
      destinationType : Camera.DestinationType.FILE_URI,
      sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit : true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 640,
      targetHeight: 640,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false }
    );
  }
  function onlibSuccess(imageURI) {
    var image = document.getElementById('myImage');
    image.src = imageURI;
  }
  function onlibFail(message) {
    alert('No seleccionaste una foto!');
  }

  //Convert URI to Blob to post in API
  function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});
  }

  //Get Image in Base64
  function getBase64Image(img) {
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 640;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    var dataURL = canvas.toDataURL("image/png");

    return dataURL;
  }

  //Create Post
  scope.createPost = function(title, content, file, category, ubication){
    scope.user = JSON.parse(localStorage.getItem("userSession"));
    var fd = new FormData();
    imageBase = getBase64Image(document.getElementById("myImage"))
    var blob = dataURItoBlob(imageBase);
    var fd = new FormData();
    fd.append("file", blob, "image.png");
    $http.post(urlAppServer + '/media', fd, {
      transformRequest: angular.identity,
      headers: {
        "authorization": 'Basic ' + userHash,
        'content-type': undefined,
        "content-disposition": "attachment; filename=image.png",
      }
    }).success(function (dataMedia) {
      var imagePost = dataMedia.id;
      var status =  "publish";
      if (imagePost){
        data = JSON.stringify({
          "title" : title,
          "content" : content,
          "featured_media" : imagePost,
          "categories" : [category],
          "ubications" : [ubication],
          "status" : status
        });

        $http({
          method: 'POST',
          url: urlAppServer + '/posts',
          headers: {
            'authorization': 'Basic ' + userHash,
            'content-type': 'application/json',
          },
          data: data,
        }).success(function (dataPost) {
          posts = $scope.mv.posts;
          var post = new Object();
          post.id = dataPost.id;
          post.title = dataPost.title.rendered;
          post.content = dataPost.content.rendered;
          post.plainContent = $(dataPost.content.rendered).text();
          post.author = dataPost.author;
          post.authorName = $scope.mv.getAuthorName(dataPost.author);
          post.authorAvatar = scope.user.avatar;
          var datePost = new Date(dataPost.date);
          post.date = datePost.getDate() + " de " + monthNames[datePost.getMonth()] + " del " + datePost.getFullYear();
          post.categoryId = dataPost.categories[0];
          post.categoryName = $scope.mv.getCategoryName(dataPost.categories[0]);
          post.ubicationId = dataPost.ubications[0];
          post.ubicationName = $scope.mv.getUbicationName(dataPost.ubications[0]);
          post.mediaId = dataPost.featured_media;
          post.urlFeaturedImage = dataMedia.source_url;
          post.countFavorites = "0";
          post.comments = Array();
          posts.unshift(post);
          $scope.mv.posts = posts;
          localStorage.setItem("posts", JSON.stringify($scope.mv.posts));
          window.location = "#/home";
        });
      }
    });
  }
});

/* Metodo Post Edit
*****************************************************/
muvbe.controller('muvbeEditPostController', function ($scope, $http, $routeParams){
  // variables
  var scope = this;
  if (!$scope.mv.user){
    window.location = "#/";
  }
  var userHash = decodeUserData($scope.mv.user.userName + ':' + $scope.mv.user.userPassword);
  var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  scope.postId = $routeParams.postId;
  posts = $scope.mv.posts;
  posts.forEach(function(value) {
    if (value.id == scope.postId){
      scope.postEdit = value;
    }
  });
  scope.categories = $scope.mv.categories;
  for(var categories_data in scope.categories) {
    if (scope.categories[categories_data].id == scope.postEdit.categoryId){
      scope.selectedCategory = scope.categories[categories_data];
    }
  }
  scope.ubications = $scope.mv.ubications;
  for(var ubications_data in scope.ubications) {
    if (scope.ubications[ubications_data].id == scope.postEdit.ubicationId){
      scope.selectedUbication = scope.ubications[ubications_data];
    }
  }

  //Create Post
  scope.editPost = function(postId, title, content, category, ubication){
    var status =  "publish";
    data = JSON.stringify({
      "title" : title,
      "content" : content,
      "categories" : [category],
      "ubications" : [ubication],
      "status" : status
    });
    $http({
      method: 'POST',
      url: urlAppServer + '/posts/' + postId,
      headers: {
        'authorization': 'Basic ' + userHash,
        'content-type': 'application/json',
      },
      data: data,
    }).success(function (dataPost) {
      posts = $scope.mv.posts;
      posts.forEach(function(value) {
        if (value.id == scope.postId){
          value.title = title;
          value.content = content;
          value.plainContent = content;
          value.categoryId = category;
          value.categoryName = $scope.mv.getCategoryName(category);
          value.ubicationId = ubication;
          value.ubicationName = $scope.mv.getUbicationName(ubication);
        }
      });
      $scope.mv.posts = posts;
      localStorage.setItem("posts", JSON.stringify($scope.mv.posts));
      window.location = "#/home";
    });
  };
});
