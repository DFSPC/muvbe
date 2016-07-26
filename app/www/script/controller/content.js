var  muvbe = angular.module('posts', []);

/* Metodo Get
*****************************************************/

muvbe.controller('muvbePostInfoController', function ($scope, $http, $routeParams, user ){
  var scope = this;
  scope.user = JSON.parse(localStorage.getItem("userSession"));
  if (!scope.user){
    window.location = "#/";
  }
  scope.postId = $routeParams.postId;
  if (localStorage.getItem("posts")){
    scope.posts = JSON.parse(localStorage.getItem("posts"));
  }
  var userHash = decodeUserData(scope.user.userName + ':' + scope.user.userPassword);

  var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  scope.addComment = function(content){
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
      posts = scope.posts;
      posts.forEach(function(value) {
        if (value.id == scope.postId){
          var commentInfo = new Object();
          commentInfo.user = data.author_name;
          var dateComment = new Date(data.date);
          commentInfo.date = dateComment.getDate() + " de " + monthNames[dateComment.getMonth()] + " del " + dateComment.getFullYear();
          commentInfo.content = data.content.rendered;
          value.comments.push(commentInfo);
        }
      });
      scope.posts = posts;
      localStorage.setItem("posts", JSON.stringify(scope.posts));
    });
  }
});

/* Metodo Post
*****************************************************/
muvbe.controller('muvbeCreatePostController', function ($scope, $http, user ){
  // variables
  var scope = this;
  scope.user = JSON.parse(localStorage.getItem("userSession"));
  if (!scope.user){
    window.location = "#/";
  }
  var userHash = decodeUserData(scope.user.userName + ':' + scope.user.userPassword);
  var posts = JSON.parse(localStorage.getItem("posts"));

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

  scope.getCategories = function(){
    $http.get(urlAppServer + "/categories").success(function(data){
      scope.categories = data;
    });
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

  var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  //Create Post

  scope.createPost = function(title, content, file, category){
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
    }).success(function (data) {
      var imagePost = data.id;
      var status =  "publish";
      if (imagePost){
        data = JSON.stringify({
          "title" : title,
          "content" : content,
          "featured_media" : imagePost,
          "categories" : [category],
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
        }).success(function (data) {
          var post = new Object();
          post.id = data.id;
          post.title = data.title.rendered;
          post.content = data.content.rendered;
          post.author = data.author;
          var datePost = new Date(data.date);
          post.date = datePost.getDate() + " de " + monthNames[datePost.getMonth()] + " del " + datePost.getFullYear();
          post.categoryId = data.categories[0];
          post.categoryName = getCategoryName(data.categories[0]);
          getImageUrlByPost(data.id, data.featured_media);
          posts.unshift(post);
        });
      }
    });
  }

  scope.getCategories();

  function getImageUrlByPost(postId, fileId){
    $http.get(urlAppServer + "/media/" + fileId).success(function(data_image){
      posts.forEach(function(value) {
        if (value.id == postId){
          value.urlFeaturedImage = data_image.source_url;
        }
      });
      scope.posts = posts;
      localStorage.setItem("posts", JSON.stringify(scope.posts));
      window.location = "#/user";
    });
  }

  function getCategoryName(categoryId){
    if(!scope.categories){
      scope.getCategories();
    }
    categories = scope.categories;
    for(var category in scope.categories) {
      if (categories[category].id == categoryId){
        return categories[category].name;
      }
    }
  }
});
