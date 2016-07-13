var  muvbe = angular.module('posts', []);

/* Metodo get
*****************************************************/

muvbe.controller('get', function ($scope, $http, user ){
  console.log('posts');
  $http.get(urlAppServer + "/posts").success(function(data){
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



/* Metodo Post
*****************************************************/
muvbe.controller('muvbeCreatePostController', function ($scope, $http, user ){
  console.log("muvbeCreatePostController");
  // variables
  var scope = this;
  scope.user = JSON.parse(localStorage.getItem("userSession"));
  console.log(scope.user);
  if (!scope.user){
    window.location = "#/";
  }
  var userHash = decodeUserData(scope.user.userName + ':' + scope.user.userPassword);

  //Data URL base64
  function takephoto(){
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
      destinationType: Camera.DestinationType.DATA_URL
    });
  }
  function onSuccess(imageData) {
    var image = document.getElementById('myImage');
    image.src = "data:image/jpeg;base64," + imageData;
    document.getElementById("text1").innerHTML = imageData;
  }

  function onFail(message) {
    alert('Failed because: ' + message);
  }

  //From Library
  scope.choosePhoto = function(){
    navigator.camera.getPicture(onlibSuccess, onlibFail,
    { quality : 100,
      destinationType : Camera.DestinationType.FILE_URI,
      sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit : true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false }
    );
  }
  function onlibSuccess(imageURI) {
      var image = document.getElementById('myImage');
      image.src = imageURI;
  }
  function onlibFail(message) {
      alert('Failed because: ' + message);
  }


  scope.getCategories = function(){
    $http.get(urlAppServer + "/categories").success(function(data){
      scope.categories = data;
    });
  }

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

  function toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.send();
  }

  function getBase64Image(img) {
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

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

        console.log(data);
        $http({
          method: 'POST',
          url: urlAppServer + '/posts',
          headers: {
            'authorization': 'Basic ' + userHash,
            'content-type': 'application/json',
          },
          data: data,
        }).success(function (data) {
          window.location = "#/validate";
        });
      }
    });
  }

  scope.getCategories();
});
