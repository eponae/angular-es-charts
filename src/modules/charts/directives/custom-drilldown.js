'use strict';

angular.module('basics').directive('customDrilldown', ['$timeout', function ($timeout) {
        var directive = {
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
                var timer1, timer2;

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
                                $timeout(updateTitle, 100);
                            }
                        },
                        marginTop: 50
                    },
                    title: {
                        text: scope.title,
                        margin: 50
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
                        if (timer1) {
                            $timeout.cancel(timer1);
                        }
                        timer1 = $timeout(function () {
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
                        if (timer2) {
                            $timeout.cancel(timer2);
                        }
                        timer2 = $timeout(function () {
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

                scope.$on('$destroy', function () {
                    $timeout.cancel(timer1);
                    $timeout.cancel(timer2);
                });
            }
        };
        return directive;
    }]);
