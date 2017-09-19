angular.module('listings').controller('ListingsController', ['$scope', '$location', '$stateParams', '$state', 'Listings',
    function ($scope, $location, $stateParams, $state, Listings) {
        $scope.find = function () {
            /* set loader*/
            $scope.loading = true;

            /* Get all the listings, then bind it to the scope */
            getAllListings();
        };

        $scope.findOne = function () {
            // debugger;
            $scope.loading = true;

            /*
              Take a look at 'list-listings.client.view', and find the ui-sref attribute that switches the state to the view
              for a single listing. Take note of how the state is switched:

                ui-sref="listings.view({ listingId: listing._id })"

              Passing in a parameter to the state allows us to access specific properties in the controller.

              Now take a look at 'view-listing.client.view'. The view is initialized by calling "findOne()".
              $stateParams holds all the parameters passed to the state, so we are able to access the id for the
              specific listing we want to find in order to display it to the user.
             */

            var id = $stateParams.listingId;

            Listings.read(id)
                .then(function (response) {
                    $scope.listing = response.data;
                    $scope.loading = false;
                }, function (error) {
                    $scope.error = 'Unable to retrieve listing with id "' + id + '"\n' + error;
                    $scope.loading = false;
                });
        };

        $scope.create = function (isValid) {
            $scope.error = null;

            /*
              Check that the form is valid. (https://github.com/paulyoder/angular-bootstrap-show-errors)
             */
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'articleForm');

                return false;
            }

            /* Create the listing object */
            var listing = {
                name: $scope.name,
                code: $scope.code,
                address: $scope.address
            };

            /* Save the article using the Listings factory */
            Listings.create(listing)
                .then(function (response) {
                    //if the object is successfully saved redirect back to the list page
                    $state.go('listings.list', {successMessage: 'Listing succesfully created!'});
                }, function (error) {
                    //otherwise display the error
                    $scope.error = 'Unable to save listing!\n' + error;
                });
        };

        $scope.update = function (isValid) {
            /*
              Fill in this function that should update a listing if the form is valid. Once the update has
              successfully finished, navigate back to the 'listing.list' state using $state.go(). If an error
              occurs, pass it to $scope.error.
             */
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'articleForm');
                return false;
            }
            var entry = $scope.listing;

            var newEntry = {
                name: entry.name,
                code: entry.code,
                address: entry.address
            };

            /* Save the article using the Listings factory */
            Listings.update($scope.listing._id, newEntry)
                .then(function () {
                    //if the object is successfully saved redirect back to the list page
                    $state.go('listings.list', {successMessage: 'entry updated'});
                }, function (err) {
                    //otherwise display the error
                    $scope.error = 'Cant update' + err;
                });
        };

        $scope.remove = function () {
            var id = $scope.listing._id;
            Listings.delete(id).then(function (err) {
                $state.go("listings/list", {successMessage: "Deleted successfully"})
            }, function (err) {
                $scope.error = "error deleting " + err;
            })
            /*
            TODO
              Implement the remove function. If the removal is successful, navigate back to 'listing.list'. Otherwise,
              display the error.
             */
        };

        /* Bind the success message to the scope if it exists as part of the current state */
        if ($stateParams.successMessage) {
            $scope.success = $stateParams.successMessage;
        }

        /* Map properties */
        $scope.map = {
            center: {
                latitude: 29.65163059999999,
                longitude: -82.3410518
            },
            zoom: 4,
        };
        var createRandomMarker = function (i, bounds, idKey) {

            if (idKey == null) {
                idKey = "id" + i;
            }
            var longitude = $scope.listings[i].coordinates.longitude;
            var latitude = $scope.listings[i].coordinates.latitude;
            var ret = {
                latitude: latitude,
                longitude: longitude,
                title: 'm' + i,
                name: $scope.listings[i].name,
                code: $scope.listings[i].code,
                address: $scope.listings[i].address,
                id: i
            };
            ret[idKey] = i;
            return ret;

        };
        $scope.setMap = function () {
            console.log("set map------------------->");
            getAllListings(addMarkers);
        };

        var addMarkers = function () {
            if ($scope.listings != undefined) {
                var markers = [];
                for (var i = 0; i < $scope.listings.length; i++) {
                    //TODO dont add if latitude is undefined
                    if ($scope.listings[i].coordinates != undefined) {
                        var longitude = $scope.listings[i].coordinates.longitude;
                        var latitude = $scope.listings[i].coordinates.latitude;
                        if (longitude != undefined && latitude != undefined) {
                            markers.push(createRandomMarker(i, $scope.map.bounds))
                        }
                    }
                }
                $scope.randomMarkers = markers;
            }
        };


        var getAllListings = function (addMarkers) {
            Listings.getAll().then(function (response) {
                $scope.loading = false; //remove loader
                $scope.listings = response.data;
                if (addMarkers != undefined) {
                    addMarkers();
                }
            }, function (error) {
                $scope.loading = false;
                $scope.error = 'Unable to retrieve listings!\n' + error;
            });
        }
    }


]);


