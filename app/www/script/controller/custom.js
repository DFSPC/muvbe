/*
**  Active de nav de footer
**********************************************/
muvbe.directive('myFooter', function ($location) {
  var menuActive;
  menuActive = function(scope, element, attrs) {
    // var animateDown, animateRight, pageOne, pageTwo;
    $menu = element.find('.nav-aux');
    $menu.find('.item a').click(function(event) {
      /* Act on the event */
      $menu.find('a').removeClass('active');
      $(this).addClass('active');
    });

    $menu.find('.item a').on('click', efecto)

    function efecto() {
      var
        $this     =  $(this),
        urls      =  ["#/home", "#/categories", "#/post", "#/ubications", "#/user"],
        there     =  $location.path(),
        posThere  =  urls.indexOf('#' + there),
        here      =  $(this).attr('href'),
        posHere   =  urls.indexOf(here),
        href      =  $this.attr('href'),
        $content  =  $('#content');

      $this.removeAttr('href');
      box =  $('#content').children().eq(0);
      if (posHere > posThere) {
        slideLeft(box)
      }
      if(posHere < posThere) {
        slideRigth(box);
      }
      if(posHere == posThere){
        $this.attr('href', href);
        window.location.href = href;
      }

      function slideLeft($box){
        $($box).addClass('sliderLeft');
        var box =$('.sliderLeft');
        box.css("margin-left", "0");
        box.animate({
          "margin-left": "-100%"
        }, 500);
        $content.css('opacity', '1');
        $content.animate({
          opacity :  "0"
        }, 500);
        timeAnimate();
      }

      function slideRigth($box){
        $body =  element.find('body');
        $body.addClass('overflow')
        $($box).addClass('sliderRigth');
        var box =$('.sliderRigth');
        box.css("margin-left", "0");
        box.animate({
          "margin-left": "100%"
        }, 500);
        $content.css('opacity', '1');
        $content.animate({
          opacity :  "0"
        }, 500);
        timeAnimate();
        $body.removeClass('overflow');
      }

      function timeAnimate() {
        setTimeout(function(){
          $this.attr('href', href);
          window.location.href = href;
          var $newContent  =  $('#content');
          $newContent.css('opacity', '0');
          $newContent.animate({
            opacity :  "1"
          }, 250);
        }, 250);
      }
    }
  };
  return {
      restrict: 'E',
      link: menuActive
  };
});



// /*
// **  Active de nav de footer
// **********************************************/
// muvbe.directive('myFooter', function () {
//   var menuActive;
//   menuActive = function(scope, element, attrs) {
//   var box = $(".view-timeline");
//       box.css("margin-left");
//       box.animate({
//         "margin-left": 0
//       }, 700);

//   };
// });


/*
**  Active de nav de post favorites
**********************************************/
muvbe.directive('menuUser', function () {
  var navActiveUser;
  navActiveUser = function(scope, element, attrs) {
    $tabs = element.find('.menu-post');
	  active = function() {
	    $(this).parent('.menu-post').find('.link-post').removeClass('active');
	    $(this).addClass('active')
	  }
    $tabs.find('.link-post').on('click', active);
  };
  return {
    restrict: 'E',
    link: navActiveUser
  };
});

/*
**  Menu main
**********************************************/
muvbe.directive('menuMain', function () {

  var mainMenu;
  mainMenu = function(scope, element, attrs) {
    // var
    var
      $ico_menu    =  element.find('.menu-main'),
      $ico_closed  =  element.find('.closed-menu'),
      $body        =  angular.element('body'),
      $item        =  element.find('.list-link .item a'),
      $wraper      =  $ico_menu.siblings('wraper-menu')


    // eventos
    $ico_closed.on('click', cerrar);
    $ico_menu.on('click', open);
    $item.on('click', remove);


    // funciones
    function cerrar() {
      $body.removeClass('overflow');
      $(this).parent('.wraper-menu').removeClass('expand')
            .find('.transparent-back').removeClass('expand');
    }

    function open() {
      $body.addClass('overflow');
      $(this).siblings('.wraper-menu').addClass('expand')
            .find('.transparent-back').addClass('expand');
    }
    function remove() {
      $body.removeClass('overflow');
       $ico_closed.trigger('click', cerrar);
    }
  };

  // returna el jquery
  return {
      restrict: 'E',
      link: mainMenu
  };
});

/*
**  Efectos del scroll
**********************************************/
muvbe.directive('scrollEfect', function ($location) {
  var navActiveUser;
  efectScroll = function(scope, element, attrs) {
    var
      $body = angular.element('body');

    // llamados
    scroollEvent();
    activeRecharge();

    // funciones
    function activeRecharge(){
      var
        urls = ["/home", "/categories", "/post", "/ubications", "/user"],
        urlnow = $location.path(),
        posicion = urls.indexOf(urlnow),
        newUrl = posicion - 1 ;

        // if (!urlnow ) {
        //   $nav_footer = angular.element('.nav-aux');
        //   // console.log(  $nav_footer);

        // }
        // if (posicion > 0){
        //   console.log($body.find('.nav-aux'));
        //   $body.find('.nav-aux').find('a').removeClass('active');
        //   $body.find('#footer .item-' + posicion ).find('a').addClass('active');
        // }


      // console.log(urlnow );


    }

    function scroollEvent() {
      var xIni;
      var yIni;
      window.addEventListener('touchstart', function(e){

        if (e.targetTouches.length == 1) {
          var
            touch = e.targetTouches[0];
            xIni = touch.pageX;
            yIni = touch.pageY;
        }
      }, false);

      window.addEventListener('touchmove', function(e){
        if (e.targetTouches.length == 1) {
          var
            touch = e.targetTouches[0],
            $nav_footer = angular.element('.nav-aux'),
            $header = angular.element('.header'),
            urls = ["/home", "/categories", "/post", "/ubications", "/user"];

            // console.log(  $nav_footer);

          // $( window ).scroll(function() {
          //   scrOfY = window.pageYOffset;
          //   if (scrOfY < 60) {
          //     $nav_footer.addClass('expand');
          //     $header.addClass('expand');
          //   }
          // });
          // swipe izquierda
          if((touch.pageX>xIni+20) && (touch.pageY> yIni-5) && (touch.pageY<yIni+5)){
            var
              urlnow = $location.path(),
              posicion = urls.indexOf(urlnow);
              newUrl = posicion - 1 ;

            // validamos la posicion de array
            if (posicion > 0){
              window.location.href = "#" + urls[newUrl];
              $body.find('.nav-aux').find('a').removeClass('active');
              $body.find('#footer .item-' + posicion ).find('a').addClass('active');
            }
          }
          // swipe derecha
          if((touch.pageX<xIni-20) && (touch.pageY> yIni-5) && (touch.pageY<yIni+5)){
            var
              urlnow = $location.path(),
              posicion = urls.indexOf(urlnow);
              newUrl = posicion + 1 ;

            // validamos la posicion de array
            if (posicion < 4){
              window.location.href = "#" + urls[newUrl];
              $body.find('.nav-aux').find('a').removeClass('active');
              $body.find('#footer .item-' + ( newUrl + 1) ).find('a').addClass('active');
            }
          }
          // swipe arriba
          console.log( (yIni - 40)  + '/////' + touch.pageY );


          if((touch.pageY > yIni - 40 && (touch.pageX > xIni-5) && (touch.pageX<xIni+5)  ) ){

            console.log('reee');
            $content  =  $('#content');
            $content.animate({
              "marginTop": "300px",
              "opacity":   "0"
            }, 300);
            setTimeout(function(){
              $content.animate({
              "marginTop": "0",
              "opacity":   "1"
              }, 300);
            },300);

            setTimeout(function(){
              scope.mv.getAllData();
            }, 600);
          }

          // active = function() {
          //   console.log('ssssss')
          //   var
          //   urls = ["/home", "/categories", "/post", "/ubications", "/user"],
          //   urlnow = $location.path(),
          //   posicion = urls.indexOf(urlnow),
          //   newUrl = posicion;

          //     $body.find('.nav-aux').find('a').addClass('class_name');
          //     $body.find('#footer .item-' + ( newUrl + 1) ).find('a').addClass('active');
          // }
          // $body.find('.nav-aux').find('a').on('click', active);
          // console.log($body.find('.nav-aux').find('a').on('click', active));

          // active = function() {
          // }

          // $body.find('.nav-aux').find('a').on('click', active);

          // swipe arriba
          // if((touch.pageY < yIni - 5) && (touch.pageX> xIni-5) && (touch.pageX<xIni+5)) {
          //   // $nav_footer.removeClass('expand');
          //   // $header.removeClass('expand');
          // }
          // swipe abajo
          if((touch.pageY > yIni - 20 && (touch.pageX> xIni-5) && (touch.pageX<xIni+5) )  ){

            // $nav_footer.addClass('expand');
            // $header.addClass('expand');
                        // $header.addClass('expand');






          }
        }
      }, false);
    }
  };

  // returna el jquery
  return {
      restrict: 'E',
      link: efectScroll
  };
});


/*
**  Sub menu del post
**********************************************/
muvbe.directive('subMenu', function () {
  toggleSubmenu = function(scope, element, attrs) {
    var
      $elem = element.find('.sub-menu');
    toggleSub();
    // funciones
    function toggleSub() {
      $elem.click(function(event) {
        $( this ).find('ul').toggleClass( "highlight" );
      });
    }
  };
  // returna el jquery
  return {
      restrict: 'E',
      link: toggleSubmenu
  };
});

/*
**  Active de nav de post favorites
**********************************************/
muvbe.directive('validatePost', function () {
  validate = function(scope, element, attrs) {
    var
      // $trash  =  element.find('.delete-trash'),
      $body   =  angular.element('body'),
      $enviar =  element.find('.botton-take'),
      $img    =  element.find('.menu-upphote img'),
      input   =  element.find('#myImage');




  };
  return {
    restrict: 'E',
    link: validate
  };
});







