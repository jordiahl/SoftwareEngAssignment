angular.module('listings', []).factory('Listings', function ($http) {
    var methods = {
        getAll: function () {
            return $http.get('http://localhost:8080/api/listings');
        },
        delete: function (id) {
            return $http.delete('http://localhost:8080/api/listings/' + id);
        },
        update: function (id) {
            return $http.update('http://localhost:8080/api/listings/' + id);
        }
    };

    return methods;
});