/* Metodo Login
*****************************************************/
muvbe.controller('muvbeLoginController', function ($scope, $http){
  var scope = this;
  scope.user = JSON.parse(localStorage.getItem("userSession"));
  if (scope.user){
    window.location = "#/home";
  }

  scope.user = JSON.parse(localStorage.getItem("userSession"));
  scope.media = JSON.parse(localStorage.getItem("media"));
  scope.comments = JSON.parse(localStorage.getItem("comments"));
  scope.categories = JSON.parse(localStorage.getItem("categories"));
  scope.ubications = JSON.parse(localStorage.getItem("ubications"));
  scope.users = JSON.parse(localStorage.getItem("users"));
  scope.posts = JSON.parse(localStorage.getItem("posts"));
  scope.favorites = JSON.parse(localStorage.getItem("favorites"));

  scope.validateLogin = function(userName, userPassword){

    var userHash = decodeUserData(userName + ':' + userPassword);
    scope.showMessage = true
    scope.messageLogin = 'Validando Usuario...';

    $http.defaults.headers.common.Authorization = 'Basic ' + userHash;
    $http.get(urlAppServer + '/users/me?_envelope').success(function(data){
      if (data.body.id){
        $http.get(urlAppServer2 + "/user/generate_auth_cookie?insecure=cool&username=" + userName + "&password=" + userPassword).success(function(dataCookie){
          var cookie = dataCookie.cookie;
          $http.get(urlAppServer2 + "/user/get_currentuserinfo/?insecure=cool&cookie=" + cookie).success(function(dataAvatar){
            $http.get(urlAppServer2 + "/wpfp/lists/?insecure=cool&cookie=" + cookie).success(function(dataFavorites){
              scope.user.successLogin = true;
              scope.user.id = data.body.id;
              scope.user.userName = userName;
              scope.user.name = data.body.name;
              scope.user.userPassword = userPassword;
              scope.user.avatar = dataAvatar.user.avatar;
              scope.user.favorites = dataFavorites.lists;
              scope.user.email = dataAvatar.user.email;
              $scope.mv.user = scope.user;
              localStorage.setItem("userSession", JSON.stringify(scope.user));
              scope.messageLogin = 'Gracias por Ingresar';
              window.location = "#/home";
            });
          });
        });
      }else{
        scope.successLogin = false;
        scope.showMessage = true
        scope.messageLogin = 'Error al ingresar, verifique sus credenciales';
      }
    });
  }
});

/* Create New User
************************************************/
muvbe.controller('muvbeSignUpController', function ($scope, $http){
  var scope = this;

  $scope.changeImage = false;


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
        saveToPhotoAlbum: true
      }
    );
    $scope.changeImage = true;

  }
  function onURLSuccess(imageURI) {
    var image = document.getElementById('myImageAvatar');
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
    $scope.changeImage = true;
    var image = document.getElementById('myImageAvatar');
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

  scope.createUser = function(userName, userEmail, userPassword){

    if( userName == undefined ||
        userEmail == undefined ||
        $scope.changeImage == false ||
        userPassword == undefined){
      if(userPassword == undefined ){
        scope.messageData = "¡ password esta Vacio !";
      }
      if(userEmail == undefined ){
        scope.messageData = "¡ Email esta Vacio !";
      }
      if(userName == undefined ){
        scope.messageData = "¡ Nombre esta Vacio !";
      }
      if($scope.changeImage == false  ){
        scope.messageData = "¡ No hay foto!";
      }
    }else{
      load();
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
          'authorization': 'Basic ' + userHashAdmin,
          'content-type': 'application/json',
        },
        data: data,
      }).success(function (data) {
        var fd = new FormData();
        imageBase = getBase64Image(document.getElementById("myImageAvatar"));
        var blob = dataURItoBlob(imageBase);
        var fd = new FormData();
        fd.append("file", blob, "image.png");
        $http.post(urlAppServer + '/media', fd, {
          transformRequest: angular.identity,
          headers: {
            "authorization": 'Basic ' + userHashAdmin,
            'content-type': undefined,
            "content-disposition": "attachment; filename=image.png",
          }
        }).success(function (dataMedia) {
          $http.get(urlAppServer2 + "/user/generate_auth_cookie?insecure=cool&username=" + userName + "&password=" + userPassword).success(function(dataCookie){
            var cookie = dataCookie.cookie;
            $http.get(urlAppServer2 + "/user/update_user_meta_vars/?insecure=cool&cookie=" + cookie + "&wp_user_avatar=" + dataMedia.id).success(function(dataAvatar){
              $http.get(urlAppServer2 + "/user/get_currentuserinfo/?insecure=cool&cookie=" + cookie).success(function(dataAvatarImage){
                scope.user.id = data.id;
                scope.user.successLogin = true;
                scope.user.userName = userName;
                scope.user.name = userName;
                scope.user.userPassword = userPassword;
                scope.user.email = userEmail;
                scope.user.avatar = dataAvatarImage.user.avatar;
                scope.user.favorites = new Array();
                $scope.mv.user = scope.user;
                scope.messageLogin = 'Gracias por Ingresar';
                localStorage.setItem("userSession", JSON.stringify(scope.user));
                window.location = "#/home";
              });
            });
          });
        });
      });
      window.location = "#/";
      finishedLoad();
    }
  }
});

muvbe.controller('muvbeExitController', function ($scope){
  var scope = this;
  localStorage.removeItem("userSession");
  localStorage.removeItem("media");
  localStorage.removeItem("comments");
  localStorage.removeItem("categories");
  localStorage.removeItem("ubications");
  localStorage.removeItem("users");
  localStorage.removeItem("posts");
  localStorage.removeItem("favorites");
  localStorage.clear();
  $scope.mv.user = localStorage.getItem("userSession");
  $scope.mv.media = localStorage.getItem("media");
  $scope.mv.comments = localStorage.getItem("comments");
  $scope.mv.categories = localStorage.getItem("categories");
  $scope.mv.ubications = localStorage.getItem("ubications");
  $scope.mv.users = localStorage.getItem("users");
  $scope.mv.posts = localStorage.getItem("posts");
  $scope.mv.favorites = localStorage.getItem("favorites");
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

// Html content filter
muvbe.filter('to_trusted', ['$sce',function($sce) {
  return function(text){
    return $sce.trustAsHtml(text);
  }
}]);
