(function() {
	'use strict';

	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.directive('foundItems', FoundItemsDirective)
	.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

	function FoundItemsDirective() {
		var ddo = {
			templateUrl: 'foundItems.html',
			scope: {
				items: '<',
				onRemove: '&'
			},
			controller: FoundItemsDirectiveController,
			controllerAs: 'list',
			bindToController: true
		};

		return ddo;
	}

	function FoundItemsDirectiveController() {
		var list = this;

		list.removeItem = function (itemIndex) {
			list.onRemove({index: itemIndex});
		};
	}

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService) {
		var narrow = this;

		narrow.searchTerm = "";
		narrow.found = [];
		narrow.errorMessage = "";

		narrow.narrowItDown = function () {
			if (narrow.searchTerm.trim() !== "") {
				var promise = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);

				promise.then(function (foundItems) {
					narrow.found = foundItems;
				})
				.catch(function (error) {
					narrow.errorMessage = error.message;
					console.log(error);
				});
			}
			else {
				narrow.found = [];
			}
		};

		narrow.removeItem = function (itemIndex) {
			narrow.found.splice(itemIndex, 1);
		};
	}

	MenuSearchService.$inject = ['$http', 'ApiBasePath']
	function MenuSearchService($http, ApiBasePath) {
		var service = this;

		service.getMatchedMenuItems = function (searchTerm) {
			return $http({
				method: "GET",
				url: (ApiBasePath + "/menu_items.json")
			})
			.then(function (response) {
				var foundItems = [];
				var menuItems = response.data.menu_items
