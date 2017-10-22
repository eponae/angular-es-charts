'use strict';

angular.module('basics').component('customDrilldown', {
    template: '<div ng-bind="title"></div><div><canvas id="bar" class="chart chart-bar"' +
    '  chart-data="data" chart-labels="labels" chart-series="series"' +
    '</canvas></div>',
    controller: ['$scope', 'conservatoryService', function customDrilldownCompoCtrl($scope, conservatoryService) {

        $scope.title = 'Departments';

        var firstLevel = 'fields.dep';
        //var request = 'conservatory_index/conservatories/_search?source={"aggs":{"dep_cp":{"filter":{"term":{"fields.dep":"' + drilldown + '"}},"aggs":{"_res":{"terms":{"field":"fields.cp","size":10000}}}}}}';

        $scope.data = [];
        $scope.labels = [];
        $scope.series = ['Number of departments'];

        var formatDeps = function (results, resultsLength) {
            var data = [];
            var labels = [];

            for (var resIndex = 0; resIndex < resultsLength; resIndex++) {
                data.push(results[resIndex].doc_count);
                labels.push(results[resIndex].key);
            }
            $scope.data = [data];
            $scope.labels = labels;
        };

        this.$onInit = function () {
            var request = 'conservatory_index/conservatories/_search?source={"aggs":{"_res":{"terms":{"field":"' + firstLevel + '","size":10000}}}}';

            conservatoryService.getData(request, {
                then: function (response) {
                    if (response.data && response.data.hasOwnProperty("aggregations")) {
                        var results = response.data.aggregations._res.buckets || [];
                        var resultsLength = results.length;

                        formatDeps(results, resultsLength);
                        $scope.title = resultsLength + " departments";
                    }
                },
                catch: function () {

                }
            });
        };

        this.$onChanges = function (changes) {

        };
    }]
});


