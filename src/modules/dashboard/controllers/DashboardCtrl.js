'use strict';

angular.module('basics').controller('DashboardCtrl', ['$scope', 'esServ', '$uibModal', function($scope, esServ, $uibModal) {

    /* Parameters for pagination */
    $scope.currentPage = 1;
    $scope.maxSize = 4;
    $scope.numPages = 5;
    $scope.itemsPerPage = 10;
    var currentIndex = 0;
    $scope.totalItems = 0;
    $scope.conservatories = [];

    var orders = {
        'denomination_sociale.folded': 'asc',
        'ville.folded': 'asc',
        'cp': 'asc'
    };
    var currentCriteria = 'cp';

    $scope.sortByColumn = function(criteria) {
        currentCriteria = criteria;
        if (orders[currentCriteria] === 'asc') {
            orders[currentCriteria] = 'desc';
        } else {
            orders[currentCriteria] = 'asc';
        }
        $scope.changePage($scope.currentPage);
    };

    $scope.changePage = function(page) {
        currentIndex = $scope.itemsPerPage * (page - 1);
        var request = 'conservatory_index/conservatories/_search?source={"size":' + $scope.itemsPerPage + ',"from":' + currentIndex + ',"sort":[{"fields.' + currentCriteria + '":{"order":"' + orders[currentCriteria] + '"}}]}';

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

    $scope.changePage($scope.currentPage, 'cp');

    $scope.openDetails = function(conservatory) {
        var modalInstance = $uibModal.open({
            templateUrl: 'templates/conservatory/templates/conservatoryDetails.html',
            controller: 'ConservatoryDetailsCtrl',
            resolve: {
                conservatory: function() {
                    return conservatory._source.fields;
                }
            }
        });

        modalInstance.result.then(function(selectedItem) {}, function() {});
    };

}]);
