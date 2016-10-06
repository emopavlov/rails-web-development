(function() {

   'use strict';

   angular.module("ShoppingListCheckOff", [])
   .controller("ToBuyController", ToBuyController)
   .controller("AlreadyBoughtController", AlreadyBoughtController)
   .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

   ToBuyController.$inject = ["ShoppingListCheckOffService"];
   function ToBuyController(ShoppingListCheckOffService) {
     var toBuyList = this;

     toBuyList.items = ShoppingListCheckOffService.itemsToBuy();

     toBuyList.buy = function(index) {
       ShoppingListCheckOffService.buy(index);
     }

     toBuyList.isEmpty = function() {
       return this.items.length == 0;
     }
   };

   AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
   function AlreadyBoughtController(ShoppingListCheckOffService) {
     var boughtList = this;

     boughtList.items = ShoppingListCheckOffService.itemsBought();

     boughtList.isEmpty = function() {
       return this.items.length == 0;
     }
   }

   function ShoppingListCheckOffService() {
     var service = this;

     var toBuy = [
       { name: "cookies", quantity: 10 },
       { name: "sodas", quantity: 5 },
       { name: "loaves of bread", quantity: 2 },
       { name: "eggs", quantity: 10 },
       { name: "melon", quantity: 1 },
       { name: "bottles of wine", quantity: 3 },
     ];
     var bought = [];

     service.itemsToBuy = function() {
       return toBuy;
     };

     service.itemsBought = function() {
       return bought;
     };

     service.buy = function(index) {
       var item = toBuy[index];
       toBuy.splice(index, 1);
       bought.push(item);
     };
   };
})();
