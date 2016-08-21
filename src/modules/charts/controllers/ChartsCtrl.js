'use strict';

angular.module('basics').controller('ChartsCtrl', ['$scope', 'esServ', '$timeout', function ($scope, esServ, $timeout) {

        $scope.type = 'pie';
        $scope.dep = 0;

        $scope.chooseDep = "Select a department";
        $scope.deps = [];
        $scope.title = "Departments";

        var loadDeps = function (fieldName) {
            var request = 'conservatory_index/conservatories/_search?source={"aggs":{"_res":{"terms":{"field":"' + fieldName + '","size":0}}}}';

            esServ.getData(request, {
                then: function (response) {
                    if (response.data && response.data.hasOwnProperty("aggregations")) {
                        var data = response.data.aggregations._res.buckets || [];
                        formatDeps(data);
                    }
                },
                catch : function () {

                }
            });
        };

        var formatDeps = function (tmpDeps) {
            $scope.deps = [];
            var deps = [];
            $scope.removeSeries();

            var chartSeries = [{
                    name: 'Aggregation of departments',
                    colorByPoint: true,
                    data: []
                }];

            for (var depIndex = 0; depIndex < tmpDeps.length; depIndex++) {
                insert(tmpDeps[depIndex].key, deps);
                var key = (tmpDeps[depIndex].hasOwnProperty('key_as_string')) ? tmpDeps[depIndex].key_as_string : tmpDeps[depIndex].key.toString();
                chartSeries[0].data.push({
                    name: key,
                    y: tmpDeps[depIndex].doc_count,
                    drilldown: key
                });
            }
            $scope.deps = deps;
            $scope.addNewSeries(chartSeries);

        };

        //Add serie as drilldown dynamically
        $scope.addDrilldown = function (e) {
            if (e && e.point && !e.seriesOptions) {
                var drilldown = e.point.drilldown;
                if (!drilldown) {
                    return;
                } else {
                    var request = 'conservatory_index/conservatories/_search?source={"aggs":{"dep_cp":{"filter":{"term":{"fields.dep":"' + drilldown + '"}},"aggs":{"_res":{"terms":{"field":"fields.cp","size":0}}}}}}';

                    esServ.getData(request, {
                        then: function (response) {
                            var drillData = response.data.aggregations.dep_cp._res.buckets;
                            var chart = $('#containerDrill').highcharts();
                            var series = {
                                name: 'Aggregation of postcodes filtered by department: ' + e.point.drilldown,
                                data: []
                            };
                            chart.showLoading();

                            for (var ind = 0; ind < drillData.length; ind++) {
                                var key = (drillData[ind].hasOwnProperty('key_as_string')) ? drillData[ind].key_as_string : drillData[ind].key.toString();
                                series.data.push({
                                    name: key,
                                    y: drillData[ind].doc_count
                                });
                            }

                            $timeout(function () {
                                chart.hideLoading();
                                chart.addSeriesAsDrilldown(e.point, series);
                                chart.redraw();
                            }, 500);
                        },
                        catch : function () {
                        }
                    });
                }
            }
        };

        loadDeps("fields.dep");

    }]);
