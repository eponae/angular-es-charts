'use strict';

angular.module('basics').controller('ConservatoryDetailsCtrl', ['$scope', 'conservatory', '$uibModalInstance', 'uiGmapIsReady', function ($scope, conservatory, $uibModalInstance, uiGmapIsReady) {
    $scope.myMap = {};

    $scope.conservatory = conservatory;

    $scope.showMap = false;
    $scope.showWindow = false;

    $scope.templateUrl = "templates/conservatory/templates/markerWindow.html";

    $scope.marker = {
        coord: {
            latitude: $scope.conservatory.lat,
            longitude: $scope.conservatory.lng
        },
        id: 0,
        show: false,
        zoom: 11
    };

    $scope.map = {
        coord: {
            latitude: $scope.conservatory.lat,
            longitude: $scope.conservatory.lng
        }
    };

    $scope.onMarkerClick = function () {
        $scope.showWindow = !$scope.showWindow;
    };

    $scope.closeClick = function () {
        $scope.showWindow = false;
    };

    $scope.close = function () {
        $uibModalInstance.dismiss('closed');
    };

    uiGmapIsReady.promise(1).then(function () {
       $scope.myMap.refresh();
    });
}]);
