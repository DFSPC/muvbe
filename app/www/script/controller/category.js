

/* Metodo Get List
*****************************************************/
muvbe.controller('muvbeListCategotyController', function ($scope, $http ){

	var scope = this;

	scope.user = JSON.parse(localStorage.getItem("userSession"));
  if (!scope.user){
    window.location = "#/";
  }
	scope.getCategories = function(){
	    $http.get(urlAppServer + "/categories").success(function(data){
	      scope.categories = data;
	      localStorage.setItem("categories", JSON.stringify(scope.categories));
	    });
  	};


	if (localStorage.getItem("categories")){
		scope.categories = JSON.parse(localStorage.getItem("categories"));
	}else{
		scope.getCategories();
	}

});



/* Metodo Get Detail
*****************************************************/

muvbe.controller('muvbeDetailCategotyController', function ($scope, $http, $routeParams ){

	var scope = this;

	scope.getCategories = function(){
	    $http.get(urlAppServer + "/categories").success(function(data){
	      scope.categories = data;
	    });
  	};

	if (localStorage.getItem("categories")){
		scope.categories = JSON.parse(localStorage.getItem("categories"));
	}else{
		scope.getCategories();
	}

	scope.categoryId = $routeParams.categoryId;
	scope.categoryName = getCategoryName(scope.categoryId );

	function getCategoryName(categoryId){
		if(!scope.categories){

		  scope.getCategories();


		}else{
		  categories = scope.categories;
		  for( var category in scope.categories) {
		    if (categories[category].id == categoryId){
		      return categories[category].name;
		    }
		  }
		}
	}






  	  if (localStorage.getItem("posts")){
	    scope.posts = JSON.parse(localStorage.getItem("posts"));
	  }else{

	  }


});