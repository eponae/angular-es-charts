'use strict';

angular.module('basics').controller('DashboardCtrl', ['$scope', 'esServ', '$uibModal', function($scope, esServ, $uibModal) {

    /* Parameters for pagination */
    $scope.currentPage = 1;
    $scope.maxSize = 4;
    $scope.numPages = 5;
    $scope.itemsPerPage = 10;
    $scope.currentIndex = 0;
    $scope.totalItems = 0;
    $scope.conservatories = [];

    $scope.changePage = function(page) {
        $scope.currentIndex = $scope.itemsPerPage * (page - 1);
        var request = 'conservatory_index/conservatories/_search?source={"size":' + $scope.itemsPerPage + ',"from":' + $scope.currentIndex + '}';

        esServ.getData(request, {
            then: function(response) {
                if (response.data && response.data.hasOwnProperty("hits")) {
                    $scope.totalItems = response.data.hits.total;
                    $scope.conservatories = response.data.hits.hits;
                } else {
                    $scope.totalItems = 0;
                    $scope.conservatories = [];
                }
            },
            catch: function() {

            }
        });
    };

    $scope.changePage($scope.currentPage);

    $scope.openDetails = function(conservatory) {
        var modalInstance = $uibModal.open({
            templateUrl: 'templates/conservatory/templates/conservatoryDetails.html',
            controller: 'ConservatoryDetailsCtrl',
            size: 'lg',
            resolve: {
                conservatory: function() {
                    return conservatory._source.fields;
                }
            }
        });

        modalInstance.result.then(function(selectedItem) {
        }, function() {});
    };

}]);
