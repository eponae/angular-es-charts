'use strict';

angular.module('conservatories').controller('DashboardCtrl', ['$scope', '$uibModal', 'conservatoryService',
    function ($scope, $uibModal, conservatoryService) {

        /* Parameters for pagination */
        $scope.currentPage = 1;
        $scope.maxSize = 2;
        $scope.numPages = 5;
        $scope.itemsPerPage = 10;

        $scope.filter = '';

        var clearResults = function () {
            $scope.totalItems = 0;
            $scope.conservatories = [];
        };

        $scope.orders = {
            'city': 'asc',
            'name': 'asc',
            'zip': 'asc'
        };

        $scope.currentCriteria = 'name';

        $scope.sortByColumn = function (criteria) {

            $scope.currentCriteria = criteria;
            if ($scope.orders[$scope.currentCriteria] === 'asc') {
                $scope.orders[$scope.currentCriteria] = 'desc';
            } else {
                $scope.orders[$scope.currentCriteria] = 'asc';
            }

            $scope.changePage({
                page: $scope.currentPage,
                sort: $scope.currentCriteria,
                order: $scope.orders[$scope.currentCriteria],
                filter: $scope.filter
            });
        };

        $scope.changePage = function (params) {

            conservatoryService.getConservatories(params, {
                then: function (response) {
                    $scope.totalItems = response.data.total;
                    $scope.conservatories = response.data.results;
                },
                catch: function () {
                    clearResults();
                }
            });
        };

        clearResults();
        $scope.changePage({
            page: $scope.currentPage,
            sort: $scope.currentCriteria,
            order: $scope.orders[$scope.currentCriteria],
            filter: $scope.filter
        });

        $scope.openDetails = function (conservatory) {
            var modalInstance = $uibModal.open({
                templateUrl: 'templates/conservatory/templates/conservatoryDetails.html',
                controller: 'ConservatoryDetailsCtrl',
                resolve: {
                    conservatory: function () {
                        return conservatory;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
            }, function () {
            });
        };

    }]);
