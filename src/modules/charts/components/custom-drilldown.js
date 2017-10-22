'use strict';

angular.module('basics').component('customDrilldown', {
    template: '<div>' +
    '<zingchart id="myChart" zc-json="chartData" zc-height="100%" zc-width="100%">' +
    '</zingchart></div>',
    controller: ['$scope', 'deprecatedConservatoryService', function customDrilldownCompoCtrl($scope, deprecatedConservatoryService) {

        var firstLevel = 'fields.dep';
        //var request = 'conservatory_index/conservatories/_search?source={"aggs":{"dep_cp":{"filter":{"term":{"fields.dep":"' + drilldown + '"}},"aggs":{"_res":{"terms":{"field":"fields.cp","size":10000}}}}}}';

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
            var resultsLength = results.length;

            for (var resIndex = 0; resIndex < resultsLength; resIndex++) {
                var key = results[resIndex].key;

                series.push({
                    "values": [results[resIndex].doc_count],
                    "text": 'Dep ' + key.toString(),
                    "data-id": key
                });
            }

            $scope.chartData.series = series;
            $scope.chartData.title.text = resultsLength + " departments";
        };

        this.$onInit = function () {
            var request = 'conservatory_index/conservatories/_search?source={"aggs":{"_res":{"terms":{"field":"' + firstLevel + '","size":10000}}}}';

            deprecatedConservatoryService.getData(request, {
                then: function (response) {
                    if (response.data && response.data.hasOwnProperty("aggregations")) {

                        var results = response.data.aggregations._res.buckets || [];
                        formatData(results);
                    }
                },
                catch: function () {

                }
            });

            zingchart.node_click = function (p) {
                console.log('click', p);
            };
        };

        this.$onChanges = function (changes) {

        };
    }]
});


