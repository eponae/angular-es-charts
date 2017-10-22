angular.module('conservatories').factory('ErrorInterceptor', ['$rootScope', function ($rootScope) {
    var addAlert = function (alert) {
        $rootScope.alerts.push(alert);
    };

    return {
        requestError: function () {
            addAlert({type: 'danger', msg: 'An error occurred'});
        },
        responseError: function () {
            addAlert({type: 'danger', msg: 'An error occurred'});
        }
    };
}]);