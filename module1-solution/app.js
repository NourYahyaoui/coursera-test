(function () {
	'use strict';

	angular.module('LunchCheck', [])
	.controller('LunchCheckController', LunchCheckController);

	LunchCheckController.$inject = ['$scope'];

	function LunchCheckController($scope) {
		$scope.menu = "";
		$scope.message = "";
		$scope.messageStyle = "";

		$scope.checkMenu = function () {
			var menuItems = $scope.menu.split(',');
			var itemCount = 0;

			for (var i = 0; i < menuItems.length; i++) {
				if (menuItems[i].trim() != "") {
					itemCount++;
				}
			}

			if (itemCount == 0) {
				$scope.message = "Please enter data first";
				$scope.messageStyle = "text-danger";
			} else if (itemCount <= 3) {
				$scope.message = "Enjoy!";
				$scope.messageStyle = "text-success";
			} else {
				$scope.message = "Too much!";
				$scope.messageStyle = "text-success";
			}
		};
	}
})();
