'use strict';

angular.module('basics').factory('jsonDataServ', ['$http', function($http) {
    return {
        loadDataFromFile: function(url, callback) {
            $http.get(url)
                .then(function(response) {
                    if (callback && callback.then && typeof(callback.then) === 'function') {
                        callback.then(response);
                    }
                })
                .catch(function(response) {
                    if (callback && callback.catch && typeof(callback.catch) === 'function') {
                        callback.catch();
                    }
                });
        }
    };
}]);
