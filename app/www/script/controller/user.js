/* Metodo Get Detail
*****************************************************/
muvbe.controller('muvbeUserInfoController', function ($scope, $http, $routeParams ){
	var scope = this;
  if (!$scope.mv.user){
    window.location = "#/";
  }
	scope.filterUserId = function(actual, expected) {
		return actual == expected;
	}
});

muvbe.controller('muvbeUserEditController', function ($scope, $http, $routeParams ){


  var scope = this;

  scope.userName      = $scope.mv.user.userName;
  scope.userEmail     = $scope.mv.user.email;
  scope.userAvatar    = $scope.mv.user.avatar;
  scope.userPassword  = $scope.mv.user.userPassword;
  scope.userId        = $scope.mv.user.id;

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

  scope.updateUser = function(userName, userEmail, userPassword){
    data = JSON.stringify({
      "username" : userName,
      "name" : userName,
      "email" : userEmail,
      "password" : userPassword,
      "roles" : ['author'],
    });

    $http({
      method: 'POST',
      url: urlAppServer + '/users/' + scope.userId,
      crossDomain: true,
      headers: {
        'authorization': 'Basic ' + userHashAdmin,
        'content-type': 'application/json',
      },
      data: data,
    }).success(function (data) {
      var fd = new FormData();
      imageBase = getBase64Image(document.getElementById("myImageAvatar"))
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
        scope.user.avatar = dataMedia.source_url;
        $http.get(urlAppServer2 + "/user/generate_auth_cookie?insecure=cool&username=" + userName + "&password=" + userPassword).success(function(dataCookie){
          var cookie = dataCookie.cookie;
          $http.get(urlAppServer2 + "/user/update_user_meta_vars/?insecure=cool&cookie=" + cookie + "&wp_user_avatar=" + dataMedia.id).success(function(data){
            scope.user.id = data.id;
            scope.user.successLogin = true;
            scope.user.userName = userName;
            scope.user.userPassword = userPassword;
            scope.user.userEmail = userEmail;
            $scope.mv.user = scope.user;
            scope.messageLogin = 'Gracias por Ingresar';
            localStorage.setItem("userSession", JSON.stringify(scope.user));
          });
        });
      load();
      });
    });
    finishedLoad()
  }
});


