'use strict';

angular.module('basics').directive('chartLine', ['$timeout',  function($timeout) {
    var directive = {
        restrict: 'E',
        scope: {
            chartConfig: '=',
            updateChart: '=',
            listCapt: '=',
            sizeListCapt: '=',
            addNewSerie: '='
        },
        template: '<highchart id="chart1" config="chartConfig" class="chartcontainer"></highchart>',
        link: function(scope, element, attr) {

            scope.addNewSerie = function(metricName) {
            };

            scope.emptyChart = function() {
                if (scope.sizeListCapt > 0) {
                    scope.chartConfig.loading = 'Chargement...';
                    scope.chartConfig.series = [];
                }
            };
        }
    };
    return directive;
}]);
