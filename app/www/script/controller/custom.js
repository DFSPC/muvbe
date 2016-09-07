/*
**  Active de nav de footer
**********************************************/
muvbe.directive('myFooter', function () {

  var menuActive;

  menuActive = function(scope, element, attrs) {
    // var animateDown, animateRight, pageOne, pageTwo;
    $menu = element.find('.nav-aux');
    // pageTwo = angular.element(element.children()[1]);

	  animateDown = function() {
	      $(this).animate({
	          top: '+=50'
	      });
	  };

	  active = function() {
	    $(this).parent('.nav-aux').find('a').removeClass('active');
	    $(this).find('a').addClass('active')
	  }

    // animateRight = function() {
    //     $(this).animate({
    //         left: '+=50'
    //     });
    // };

    $menu.find('.item').on('click', active);
    // $(pageTwo).on('click', animateRight);
  };
  return {
      restrict: 'E',
      link: menuActive
  };
});

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

  var navActiveUser;

  mainMenu = function(scope, element, attrs) {

    // var
    var
      $ico_menu    =  element.find('.menu-main'),
      $ico_closed = element.find('.closed-menu');




    // eventos
    $ico_closed.on('click', cerrar);
    $ico_menu.on('click', open);


    // funciones
    function cerrar() {
      $body.removeClass('overflow');
      $(this).parent('.wraper-menu').removeClass('expand')
            .find('.transparent-back').removeClass('expand');
    }

    function open() {
      $body = angular.element('body');
      $body.addClass('overflow');
      $(this).siblings('.wraper-menu').addClass('expand')
            .find('.transparent-back').addClass('expand');

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
muvbe.directive('scrollEfect', function ( $location) {

  var navActiveUser;

  efectScroll = function(scope, element, attrs) {

    // var
    var
      $body = angular.element('body');

    cerrar();

    // funciones
    function cerrar() {

      var xIni;
      var yIni;

      window.addEventListener('touchstart', function(e){

        if (e.targetTouches.length == 1) {
          var touch = e.targetTouches[0];
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


          // swipe izquierda
          if((touch.pageX>xIni+20) && (touch.pageY> yIni-5) && (touch.pageY<yIni+5)){
            var
              urlnow = $location.path(),
              posicion = urls.indexOf(urlnow);
              newUrl = posicion - 1 ;

            if (posicion > 0){
              console.log(urls[newUrl]);
              window.location.href = "#" + urls[newUrl] ;
            }
          }
          // swipe derecha
          if((touch.pageX<xIni-20) && (touch.pageY> yIni-5) && (touch.pageY<yIni+5)){
             var
              urlnow = $location.path(),
              posicion = urls.indexOf(urlnow);
              newUrl = posicion + 1 ;

            if (posicion < 4){
              console.log(urls[newUrl]);
              window.location.href = "#" + urls[newUrl] ;
            }
          }
          // swipe arriba
          if((touch.pageY < yIni - 5) && (touch.pageX> xIni-5) && (touch.pageX<xIni+5)) {
            // console.log('up')
            $nav_footer.removeClass('expand');
            $header.removeClass('expand');

          }
          // swipe abajo
          if((touch.pageY > yIni + 5) && (touch.pageX> xIni-5) && (touch.pageX<xIni+5)   ){
            // console.log('down');
            $nav_footer.addClass('expand');
            $header.addClass('expand');
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
    var $elem = element.find('.sub-menu');
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







