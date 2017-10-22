'use strict';

angular.module('basics').controller('DashboardCtrl', ['$scope', 'conservatoryService', '$uibModal', function($scope, conservatoryService, $uibModal) {

    /* Parameters for pagination */
    $scope.currentPage = 1;
    $scope.maxSize = 2;
    $scope.numPages = 5;
    $scope.itemsPerPage = 10;
    var currentIndex = 0;

    var clearResults = function() {
        $scope.totalItems = 0;
        $scope.conservatories = [];
    };

    clearResults();

    var orders = {
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
        $scope.changePage($scope.currentPage, $scope.searchedConserv);
    };

    $scope.changePage = function(page, value) {
        currentIndex = $scope.itemsPerPage * (page - 1);
        var request = 'conservatory_index/conservatories/_search?source={"size":' + $scope.itemsPerPage + ',"from":' + currentIndex + ',"sort":[{"fields.' + currentCriteria + '":{"order":"' + orders[currentCriteria] + '"}}] ' + ((value) ? ',"query":{"multi_match":{"query":"' + value + '","type":"cross_fields","fields":["fields.cp","fields.denomination_sociale","fields.dep","fields.ville"],"operator":"and"}}}' : '}');

        conservatoryService.getData(request, {
            then: function(response) {
                if (response.data && response.data.hasOwnProperty("hits")) {
                    $scope.totalItems = response.data.hits.total;
                    $scope.conservatories = response.data.hits.hits;
                } else {
                    clearResults();
                }
            },
            catch: function() {
                clearResults();
            }
        });
    };

    $scope.changePage($scope.currentPage, "");

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
