'use strict';
/**
 * Master Controller
 */

angular.module('basics').controller('MasterCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
    $rootScope.alerts = [];

    $scope.closeAlert = function(index) {
        $rootScope.alerts.splice(index, 1);
    };

    /* Initialise Highcharts graphs properties */
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
}]);
