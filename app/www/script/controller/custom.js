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
**  Active de nav de post favorites
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
      $content.removeClass('overflow');
      $(this).parent('.wraper-menu').removeClass('expand')
            .find('.transparent-back').removeClass('expand');
    }

    function open() {
      $content = angular.element('.content');
      $content.addClass('overflow');
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