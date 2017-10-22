'use strict';

angular.module('conservatories').component('conservatoryDrilldown', {
    template: '<div>' +
    '<zingchart id="myChart" zc-json="chartData" zc-height="100%" zc-width="100%">' +
    '</zingchart></div>',
    controller: ['$scope', 'conservatoryService', function customDrilldownCompoCtrl($scope, conservatoryService) {

        $scope.chartData = {
            type: "bar",
            title: {
                backgroundColor: "transparent",
                fontColor: "black",
                text: 'Departments'
            },
            backgroundColor: "transparent",
            plot: {
                cursor: 'pointer',
                valueBox: {
                    text: '%t'
                }
            },
            series: [],
            scaleX: {
                item: {visible: false}
            }
        };

        var formatData = function (results) {
            var series = [];

            var resultsKeys = Object.keys(results);

            resultsKeys.forEach(function(key) {
                series.push({
                    "values": [results[key]],
                    "text": 'Dep ' + key.toString(),
                    "data-id": key
                });
            });

            $scope.chartData.series = series;
            $scope.chartData.title.text = resultsKeys.length + " departments";
        };

        this.$onInit = function () {

            conservatoryService.getAggregateByDepartment({
                then: function (response) {
                    formatData(response.data || {});
                },
                catch: function () {

                }
            });

            zingchart.node_click = function (p) {
                console.log('click', p);
            };
        };
    }]
});


