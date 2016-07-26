
/* Metodo Get Detail
*****************************************************/

muvbe.controller('muvbeDetailAuthorController', function ($scope, $http, $routeParams ){

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
  }

  scope.getUsers = function(){
    $http.get(urlAppServer + "/users").success(function(data){
      scope.users = data;
      localStorage.setItem("users", JSON.stringify(scope.users));
    });
  }

	if (localStorage.getItem("categories")){
		scope.categories = JSON.parse(localStorage.getItem("categories"));
	}else{
		scope.getCategories();
	}


	if (localStorage.getItem("users")){
		scope.users = JSON.parse(localStorage.getItem("users"));
	}else{
		scope.getUsers();
	}

	scope.authorId = $routeParams.authorId;
	scope.authorName = getAuthorName(scope.authorId);

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

	 function getAuthorName(authorId){
	    if(!scope.users){
	      scope.getUsers();
	    }else{
	      users = scope.users;
	        for(var user in scope.users) {
	            if (users[user].id == authorId){
	               return users[user].name;
	            }
	        }
	    }
	}

	if (localStorage.getItem("posts")){
		scope.posts = JSON.parse(localStorage.getItem("posts"));
	}

	scope.filterAuthorId = function(actual, expected) {
    	return actual == expected;
	}


});
