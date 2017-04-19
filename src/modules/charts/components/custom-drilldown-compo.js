'use strict';

angular.module('basics').component('customDrilldownCompo', {
    bindings: {
        addNewSeries: '=',
        removeSeries: '=',
        loadData: "=",
        drilldown: '=',
        title: '<',
        type: '<'
    },
    template: '<div id="containerDrill" style="min-width: 310px; height: 600px; margin: 0 auto"></div>',
    controller: ['$scope', function customDrilldownCompoCtrl($scope) {
        var series = [];

        var updateTitle = function () {
            var chart = $('#containerDrill').highcharts();
            if (chart && chart.series[0]) {
                chart.setTitle({
                    text: chart.series[0].data.length + " departments"
                });
            }
        };

        this.$onInit = function () {

            /*Remove old chart while leaving page and draw a new one*/
            if (Highcharts.charts && Highcharts.charts.length > 0) {
                Highcharts.charts.length = 0;
            }

            $('#containerDrill').highcharts({
                chart: {
                    type: this.type,
                    events: {
                        drilldown: this.drilldown,
                        drillup: function () {
                            $scope.$evalAsync(updateTitle);
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
                    text: this.title,
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

            this.removeSeries = function () {
                var chart = $('#containerDrill').highcharts();
                if (chart) {
                    if (chart.drilldownLevels && chart.drilldownLevels.length > 0) {
                        while (chart.drilldownLevels.length > 0) {
                            chart.drillUp();
                        }
                    }
                    $scope.$evalAsync(function () {
                        while (chart.series.length > 0) {
                            chart.series[0].remove();
                        }
                        if (chart.drillUpButton) {
                            chart.drillUpButton = chart.drillUpButton.destroy();
                        }
                        chart.redraw();
                    });

                }
            };

            this.addNewSeries = function (newValue) {
                var chart = $('#containerDrill').highcharts();
                if (chart) {
                    if (chart.drilldownLevels && chart.drilldownLevels.length > 0) {
                        while (chart.drilldownLevels.length > 0) {
                            chart.drillUp();
                        }
                    }
                    $scope.$evalAsync(function () {
                        for (var newi = 0; newi < newValue.length; newi++) {
                            chart.addSeries(newValue[newi], false, true);
                        }
                        chart.redraw();
                    });
                }
            };

            this.$onChanges = function (changes) {
                if ((changes.title && changes.title.isFirstChange()) || (changes.type && changes.type.isFirstChange())) {
                    return;
                }

                var chart = $('#containerDrill').highcharts();

                if (changes.title && changes.title.currentValue !== changes.title.previousValue) {
                    this.title = angular.copy(changes.title.currentValue);
                    if (chart) {
                        chart.setTitle({
                            text: this.title
                        });
                    }
                }
                if (changes.type && changes.type.currentValue !== changes.type.previousValue) {
                    this.type = angular.copy(changes.type.currentValue);
                    if (chart) {
                        chart.options.chart.type = this.type;
                        this.removeSeries();
                        this.loadData();
                        chart.redraw();
                    }
                }
            };
        };
    }]
});


