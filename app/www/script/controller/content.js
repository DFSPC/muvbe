var  muvbe = angular.module('posts', []);
// metodo get
muvbe.controller('posts', function ($scope, $http, user ){
  console.log('posts');
  $http.get("http://local.muvbe.com/?rest_route=/wp/v2/posts").success(function(data){
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

// metodo post

muvbe.controller('posts', function ($scope, $http, user ){
  console.log('sucess')
  var req = {
   method: 'POST',
   url: 'http://local.muvbe.com/?rest_route=/wp/v2/posts',
   headers: {
     'Content-Type': post
   },
   data: { title: 'test' }
  }

  $http(req).then(function(){
    console.log('sucess');

  }, function(){
    console.log('sucesss');

  });

});



// // POST que crea un TODO y devuelve todos tras la creación
// app.post('/api/todos', function(req, res) {
//     Todo.create({
//         text: req.body.text,
//         done: false
//     }, function(err, todo){
//         if(err) {
//             res.send(err);
//         }

//         Todo.find(function(err, todos) {
//             if(err){
//                 res.send(err);
//             }
//             res.json(todos);
//         });
//     });
// });




