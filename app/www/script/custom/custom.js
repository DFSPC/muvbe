muvbe.controller("muvbeController", function ($scope, $element) {
	$scope.clickme = function () {
		var elem = angular.element(document.querySelector('.item-1 '));
		console.log(elem.val())// console the value of textbox
	};
});

