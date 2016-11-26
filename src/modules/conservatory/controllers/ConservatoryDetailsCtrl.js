'use strict';

angular.module('basics').controller('ConservatoryDetailsCtrl', ['$scope', '$timeout', 'conservatory', '$uibModalInstance', function($scope, $timeout, conservatory, $uibModalInstance) {
    $scope.conservatory = conservatory;
    var coordsMarker = $scope.conservatory.lat_lon;

    $scope.showMap = false;
    $scope.showWindow = false;

    $scope.templateUrl = "templates/conservatory/templates/markerWindow.html";

    $scope.marker = {
        coord: {
            latitude: coordsMarker[0],
            longitude: coordsMarker[1]
        },
        id: 0,
        show: false,
        zoom: 11
    };

    $scope.map = {
        coord: {
            latitude: coordsMarker[0],
            longitude: coordsMarker[1]
        }
    };

    $scope.onMarkerClick = function() {
        $scope.showWindow = !$scope.showWindow;
    };

    $scope.closeClick = function() {
        $scope.showWindow = false;
    };

    $scope.close = function() {
        $uibModalInstance.dismiss('closed');
    };

    $timeout(function() {
      $scope.showMap = true;
    }, 500);
}]);
