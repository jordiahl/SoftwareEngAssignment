angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
    function ($scope, Listings) {
        $scope.listings = Listings;
        $scope.detailedInfo = [];
        $scope.jordiDid = "jordi";
        var savedIndex = undefined;
        /*
          Implement these functions in the controller to make your application function
          as described in the assignment spec.
         */
        $scope.addListing = function () {
            if ($scope.createdEntry.code != undefined && $scope.createdEntry.name != undefined ){
                $scope.listings.unshift($scope.createdEntry);
                $scope.createdEntry = {};
            }
        };
        $scope.deleteListing = function () {

            if($scope.detailedInfo !== undefined && savedIndex!== undefined){
                $scope.detailedInfo = [];
                $scope.listings.splice(savedIndex,1);
                savedIndex = undefined;
            }
        };
        $scope.showDetails = function (index) {
            $scope.detailedInfo = [];
            var entry = $scope.listings[index];
            $scope.try1 = [];
             savedIndex= index;

            var recursive = function (en, extra) {
                for (var key in en) {
                    if (key == "$$hashKey"){
                        continue;
                    }
                    if (typeof en[key] === "object" && key) {
                        $scope.detailedInfo.push(key+":")
                        recursive(en[key], extra +" - ");
                    }
                    else {
                        $scope.detailedInfo.push(extra + key+": "+en[key]);
                    }
                }
            }
            recursive(entry, "");

        }
    }
]);