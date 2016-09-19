(function() {
  'use strict';

  angular.module('LunchChecker', [])

  .controller('LunchCheckerController', LunchCheckerController);

  LunchCheckerController.$inject = ['$scope'];
  function LunchCheckerController($scope) {

    $scope.checkMenu = function() {
      if (!$scope.menu) {
        $scope.message = "Please enter data first";
      } else {
        var menuItems = $scope.menu.split(",");
        if (menuItems.length <= 3) {
          $scope.message = "Enjoy!";
        } else {
          $scope.message = "Too much";
        }
      }
    }
  };

})();
