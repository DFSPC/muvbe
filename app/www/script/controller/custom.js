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
muvbe.directive('scrollEfect', function () {

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
            $nav_footer = angular.element('.nav-aux');
            $header = angular.element('.header');

          if((touch.pageX>xIni+20) && (touch.pageY> yIni-5) && (touch.pageY<yIni+5)){
          console.log("el swipe se genera hacia la izquierda");
          }

          if((touch.pageY < yIni - 10) && (touch.pageX> xIni-5) ){
            console.log('up')
            $nav_footer.removeClass('expand');
            $header.removeClass('expand');

          }

          if((touch.pageY > yIni + 10) ){
            console.log('down');
            $nav_footer.addClass('expand');
            $header.addClass('expand');
          }

          if((touch.pageX<xIni-20) && (touch.pageY> yIni-5) && (touch.pageY<yIni+5)){
          console.log("el swipe se genera hacia la derecha");
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








function SlidessListController($scope, SlidesModel, $routeParams, $location, $timeout, $rootScope) {

  // id=1 por defecto
  $scope.id = $routeParams.slideId || 1;
  $scope.slides = SlidesModel.getSlides();

  if($scope.id >$scope.slides.length)
    $location.path('/slides/1');

  $scope.slide =  SlidesModel.getSlide($scope.id);

  $scope.slideTo = $scope.slide;

  $scope.prettyContent = "";

  $scope.hide=false;

  // watch de más de una variable via stackoverflow:
  // http://stackoverflow.com/questions/11952579/watch-multiple-scope-attributes-in-angularjs
  $scope.$watch('[slide.title, slide.content]', function(newValue, oldValue) {

    // creamos contenido de la slide contatenándo título y content
    var markdownContent = '#'+$scope.slide.title+'\n\n\n'+$scope.slide.content;

    // convertir a html
    var showdown = new Showdown.converter();
    $scope.prettyContent = showdown.makeHtml(markdownContent);
  }, true);

  $scope.gotoLast = function() {
    $scope.gotoSlide($scope.slides.length);
  };

  $scope.gotoFirst = function() {
    $scope.gotoSlide(1);
  };

  $scope.gotoNext = function() {
    $scope.gotoSlide(parseInt($scope.slide.id,10)+1);
  };

  $scope.gotoPrev = function() {
    $scope.gotoSlide($scope.slide.id-1);
  };

  $scope.gotoSlide = function(pId) {

    var id = pId || $scope.slideTo.id;

    if(id!=$scope.slide.id)
    {
      animateSwitchSlide(id);
    }
  };

  $scope.newSlide = function() {

    var id = SlidesModel.addSlide();
    animateSwitchSlide(id);
  };

  animateSwitchSlide = function (id) {

    // utilizamos rootScope para discernir qué animacion haremos
    $rootScope.myAnimation = (id > $scope.slide.id)?'fade-left':'fade-right';

    $scope.hide=true;

    // transition tras timeout para dar timepo a la animación hide a finalizar
    $timeout( function(){ $location.path('/slides/'+id); }, 550 );
  };

}