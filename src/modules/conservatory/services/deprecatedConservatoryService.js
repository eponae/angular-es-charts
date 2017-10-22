'use strict';

angular.module('basics').factory('deprecatedConservatoryService', ['$http', 'ES_URL', function($http, ES_URL) {
    return {
        getData: function(url, callback) {
            $http.get(ES_URL + url)
                .then(function(response) {
                    if (callback && callback.then && typeof(callback.then) === 'function') {
                        callback.then(response);
                    }
                })
                .catch(function() {
                    if (callback && callback.catch && typeof(callback.catch) === 'function') {
                        callback.catch();
                    }
                });
        }
    };
}]);