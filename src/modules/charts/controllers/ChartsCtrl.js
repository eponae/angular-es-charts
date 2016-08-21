'use strict';

angular.module('basics').controller('ChartsCtrl', ['$scope', 'esServ', function ($scope, esServ) {

        $scope.type = 'pie';
        $scope.dep = 0;

        $scope.chooseDep = "Select a department";
        $scope.deps = [];

        var loadDeps = function (fieldName) {
            var request = 'conservatory_index/conservatories/_search?source={"size":0,"aggs":{"_res":{"terms":{"field":"' + fieldName + '","size":0}}}}&pretty=true';

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
        
        var formatDeps = function(tmpDeps) {
            $scope.deps = [];
            var deps = [];
            for(var depIndex = 0; depIndex < tmpDeps.length; depIndex++) {
                insert(tmpDeps[depIndex].key, deps);
            }
            $scope.deps = deps;
        };

        loadDeps("fields.dep");

    }]);
