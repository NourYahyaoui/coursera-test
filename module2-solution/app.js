(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController);

  function ShoppingListCheckOffService() {
    var service = this;

    // Initial items to buy
    var toBuyItems = [
      { name: "cookies", quantity: 10 },
      { name: "apples", quantity: 5 },
      { name: "chips", quantity: 3 },
      { name: "soda", quantity: 2 },
      { name: "bananas", quantity: 7 }
    ];
    // Initialize bought items
    var boughtItems = [];

    service.buyItem = function (itemIndex) {
      var item = toBuyItems[itemIndex];
      boughtItems.push(item);
      toBuyItems.splice(itemIndex, 1);
    };

    service.getToBuyItems = function () {
      return toBuyItems;
    };

    service.getBoughtItems = function () {
      return boughtItems;
    };
  }

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.items = ShoppingListCheckOffService.getToBuyItems();

    toBuy.bought = function (item) {
      ShoppingListCheckOffService.buyItem(toBuy.items.indexOf(item));
    };

    toBuy.isEmpty = function () {
      return toBuy.items.length === 0;
    };
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;

    bought.items = ShoppingListCheckOffService.getBoughtItems();

    bought.isEmpty = function () {
      return bought.items.length === 0;
    };
  }
})();
