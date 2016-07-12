function onload()
{
    document.addEventListener("deviceready",onDR,false);
}
function onDR()
{
alert("device ready");
}


//Data URL base64
function takephoto()
{
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


//Take FILE_URL
function takephotoURL()
{
navigator.camera.getPicture(onURLSuccess, onURLFail,
{ quality : 75,
  destinationType : Camera.DestinationType.FILE_URI,
  sourceType : Camera.PictureSourceType.CAMERA,
  allowEdit : true,
  encodingType: Camera.EncodingType.PNG,
  targetWidth: 100,
  targetHeight: 100,
  saveToPhotoAlbum: true }
    );
}
function onURLSuccess(imageURI) {
    var image = document.getElementById('myImageUrl');
    image.src = imageURI;
    document.getElementById("text2").innerHTML = imageURI;
}

function onURLFail(message) {
    alert('Failed because: ' + message);
}


//From Library 

function choosePhoto()
{
navigator.camera.getPicture(onlibSuccess, onlibFail,
{ quality : 75,
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
    var image = document.getElementById('lib');
    image.src = imageURI;
}

function onlibFail(message) {
    alert('Failed because: ' + message);
}


//Saveed Photot
function choosePhotoAlbum()
{
navigator.camera.getPicture(onalbumSuccess, onalbumFail,
{ quality : 75,
  destinationType : Camera.DestinationType.FILE_URI,
  sourceType : Camera.PictureSourceType.SAVEDPHOTOALBUM,
  allowEdit : true,
  encodingType: Camera.EncodingType.JPEG,
  targetWidth: 100,
  targetHeight: 100,
  popoverOptions: CameraPopoverOptions,
  saveToPhotoAlbum: false }
    );
}
function onalbumSuccess(imageURI) {
    var image = document.getElementById('album');
    image.src = imageURI;
}

function onalbumFail(message) {
    alert('Failed because: ' + message);
}





