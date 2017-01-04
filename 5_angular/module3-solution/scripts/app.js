(function() {

  "use strict";

  angular.module("NarrowItDownApp", [])
  .controller("NarrowItDownController", NarrowItDownController)
  .service("MenuSearchService", MenuSearchService)
  .directive("foundItems", FoundItemsDirective)
  .constant("ApiBasePath", "https://davids-restaurant.herokuapp.com/");

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: "foundItems.html",
      scope: {
        found: "<",
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: "controller",
      bindToController: true
    };

    return ddo;
  };

  function FoundItemsDirectiveController() {
    var controller = this;
  };

  NarrowItDownController.$inject = ["MenuSearchService"];
  function NarrowItDownController(MenuSearchService) {
    var controller = this;

    controller.findFilteredItems = function(filter) {
      var promise = MenuSearchService.getMatchedMenuItems(filter);
      promise.then(function (filteredItems) {
        controller.found = filteredItems;
      });
    };

    controller.removeItem = function (index) {
      controller.found.splice(index, 1);
    };
  };

  MenuSearchService.$inject = ["$http", "ApiBasePath"];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function(filter) {
      return $http({
        method: "GET",
        url: ApiBasePath + "menu_items.json"
      }).then(function (response) {
        var menu_items = response.data.menu_items;

        var filteredItems = [];
        for (var i in menu_items) {
          if (menu_items[i].description.indexOf(filter) > -1) {
            filteredItems.push(menu_items[i]);
          }
        }

        return filteredItems;
      });
    }
  };

})();
