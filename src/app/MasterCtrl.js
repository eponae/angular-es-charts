'use strict';
/**
 * Master Controller
 */

angular.module('basics').controller('MasterCtrl', ['$scope', function($scope) {


    /* Initialise Highcharts graphs properties */
    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
}]);
