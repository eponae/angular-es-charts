'use strict';

angular.module('basics').directive('customDrilldown', ['$timeout', function($timeout) {
    var directive = {
        restrict: 'E',
        scope: {
            addNewSeries: '=',
            removeSeries: '=',
            drilldown: '=',
            title: '=',
            type: '='
        },
        template: '<div id="containerDrill" style="min-width: 310px; height: 600px; margin: 0 auto"></div>',
        link: function(scope, element, attr) {
            var series = [];
            var timer1, timer2;

            /*Remove old chart while leaving page and draw a new one*/
            if (Highcharts.charts && Highcharts.charts.length > 0) {
                Highcharts.charts.length = 0;
            }
            $('#containerDrill').highcharts({
                chart: {
                    type: scope.type,
                    events: {
                        drilldown: scope.drilldown
                    },
                    marginTop: 50
                },
                title: {
                    text: scope.title
                },
                xAxis: {
                    labels: {
                        enabled: false
                    }
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}: {point.y}'
                        },
                        turboThreshold: 0
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
                },
                series: series
            });

            scope.removeSeries = function() {
                var chart = $('#containerDrill').highcharts();
                if (chart) {
                    if (chart.drilldownLevels && chart.drilldownLevels.length > 0) {
                        while (chart.drilldownLevels.length > 0) {
                            chart.drillUp();
                        }
                    }
                    if (timer1) {
                        $timeout.cancel(timer1);
                    }
                    timer1 = $timeout(function() {
                        while (chart.series.length > 0) {
                            chart.series[0].remove();
                        }
                        if (chart.drillUpButton) {
                            chart.drillUpButton = chart.drillUpButton.destroy();
                        }
                        chart.redraw();
                    }, 200);

                }
            };

            scope.addNewSeries = function(newValue) {
                var chart = $('#containerDrill').highcharts();
                if (chart) {
                    if (chart.drilldownLevels && chart.drilldownLevels.length > 0) {
                        while (chart.drilldownLevels.length > 0) {
                            chart.drillUp();
                        }
                    }
                    if (timer2) {
                        $timeout.cancel(timer2);
                    }
                    timer2 = $timeout(function() {
                        for (var newi = 0; newi < newValue.length; newi++) {
                            chart.addSeries(newValue[newi], false, true);
                        }
                        chart.redraw();
                    }, 200);
                }
            };

            scope.$watch('title', function(newValue, oldValue) {
                if (newValue !== oldValue) {
                    var chart = $('#containerDrill').highcharts();
                    if (chart) {
                        chart.setTitle({
                            text: newValue
                        });
                    }
                }
            });

            scope.$on('$destroy', function() {
                $timeout.cancel(timer1);
                $timeout.cancel(timer2);
            });
        }
    };
    return directive;
}]);
