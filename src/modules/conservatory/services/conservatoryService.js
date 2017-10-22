'use strict';

angular.module('basics').factory('conservatoryService', ['$http', 'API_URL', function($http, API_URL) {
    return {
        getConservatories: function(params, callback) {
            $http.get(API_URL + '?page=' + params.page + '&pageSize=10&sort=' + params.sort + '&order=' + params.order + '&q=' + params.filter)
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