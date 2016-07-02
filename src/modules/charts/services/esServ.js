'use strict';

angular.module('basics').factory('esServ', ['$http', 'ES_URL', function($http, ES_URL) {

    return {
        createIndex: function(url, payload, callback) {
            $http.put(ES_URL + url, payload)
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
        },
        saveData: function(url, payload, callback) {
            $http.post(ES_URL + url, payload)
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
        },
        getData: function(url, callback) {
            $http.get(ES_URL + url)
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
