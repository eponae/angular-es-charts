'use strict';

angular.module('basics').directive('customDrilldown', [function () {
    return {
        restrict: 'E',
        scope: {
            addNewSeries: '=',
            removeSeries: '=',
            loadData: "=",
            drilldown: '=',
            title: '=',
            type: '='
        },
        template: '<div id="containerDrill" style="min-width: 310px; height: 600px; margin: 0 auto"></div>',
        link: function (scope, element, attr) {
            var series = [];

            var updateTitle = function () {
                var chart = $('#containerDrill').highcharts();
                if (chart && chart.series[0]) {
                    chart.setTitle({
                        text: chart.series[0].data.length + " departments"
                    });
                }
            };

            /*Remove old chart while leaving page and draw a new one*/
            if (Highcharts.charts && Highcharts.charts.length > 0) {
                Highcharts.charts.length = 0;
            }

            $('#containerDrill').highcharts({
                chart: {
                    type: scope.type,
                    events: {
                        drilldown: scope.drilldown,
                        drillup: function () {
                            scope.$evalAsync(updateTitle);
                        }
                    },
                    marginTop: 50
                },
                drilldown: {
                    drillUpButton: {
                        relativeTo: "plotBox",
                        position: "y"
                    }
                },
                title: {
                    text: scope.title,
                    margin: 50,
                    style: {
                        'color': '#003399',
                        'fontSize': '18px'
                    }
                },
                xAxis: {
                    labels: {
                        enabled: false
                    },
                    title: {
                        text: ""
                    }
                },
                yAxis: {
                    labels: {
                        enabled: false
                    },
                    title: {
                        text: ""
                    }
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                            format: '{point.y}'
                        }
                    }
                },
                tooltip: {
                    headerFormat: '',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span><br/>'
                },
                series: series
            });

            scope.removeSeries = function () {
                var chart = $('#containerDrill').highcharts();
                if (chart) {
                    if (chart.drilldownLevels && chart.drilldownLevels.length > 0) {
                        while (chart.drilldownLevels.length > 0) {
                            chart.drillUp();
                        }
                    }
                    scope.$evalAsync(function () {
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

            scope.addNewSeries = function (newValue) {
                var chart = $('#containerDrill').highcharts();
                if (chart) {
                    if (chart.drilldownLevels && chart.drilldownLevels.length > 0) {
                        while (chart.drilldownLevels.length > 0) {
                            chart.drillUp();
                        }
                    }
                    scope.$evalAsync(function () {
                        for (var newi = 0; newi < newValue.length; newi++) {
                            chart.addSeries(newValue[newi], false, true);
                        }
                        chart.redraw();
                    }, 200);
                }
            };

            scope.$watch('title', function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    var chart = $('#containerDrill').highcharts();
                    if (chart) {
                        chart.setTitle({
                            text: newValue
                        });
                    }
                }
            });

            scope.$watch('type', function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    var chart = $('#containerDrill').highcharts();
                    if (chart) {
                        chart.options.chart.type = newValue;
                        scope.removeSeries();
                        scope.loadData();
                        chart.redraw();
                    }
                }
            });
        }
    };
}]);
