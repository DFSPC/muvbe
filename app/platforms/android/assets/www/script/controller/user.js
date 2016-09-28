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
  scope.changeImage = false;
  scope.userName      = $scope.mv.user.name;
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
    scope.changeImage = true;
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
    scope.changeImage = true;
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

  scope.updateUser = function(name, userEmail, userPassword){
    if (scope.changeImage){

    }else{
      $http({
        method: 'POST',
        url: urlAppServer + '/users/' + scope.userId +
          '?name=' + name +
          '&email=' + userEmail +
          '&password=' + userPassword
        ,
        crossDomain: true,
        headers: {
          'authorization': 'Basic ' + userHashAdmin,
          'content-type': 'application/json',
        },
      }).success(function (data) {
        $scope.mv.user.name = data.name;
        $scope.mv.user.userPassword = userPassword;
        $scope.mv.user.email = data.email;
        localStorage.setItem("userSession", JSON.stringify($scope.mv.user));
        window.location = "#/home";
      });
    }
  }
});


