angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
    function ($scope, Listings) {
        /* Get all the listings, then bind it to the scope */
        var fillTable = function () {
            Listings.getAll().then(function (response) {
                $scope.listings = response.data;
            }, function (error) {
                console.log('Unable to retrieve listings:', error);
            });
        };

        fillTable();

        $scope.detailedInfo = undefined;

        $scope.addListing = function () {
            //TODO: add to the database
            $scope.listings.push($scope.newListing);
            $scope.newListing = {};
        };

        $scope.deleteListing = function (index) {
            Listings.delete($scope.listings[index]._id).then(function () {
                fillTable();
                console.log("deleted" + $scope.listings[index]);
            }, function (error) {
                console.log('Cant delete listing' + error);
            });
        };

        $scope.showDetails = function (index) {
            $scope.detailedInfo = $scope.listings[index];
        };
    }
]);