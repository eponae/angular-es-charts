'use strict';

angular.module('basics').controller('ConservatoryDetailsCtrl', ['$scope', '$timeout', 'conservatory', '$uibModalInstance', function($scope, $timeout, conservatory, $uibModalInstance) {
    $scope.conservatory = conservatory;
    var coordsMarker = $scope.conservatory.lat_lon;
    $scope.showMap = false;

    $scope.templateUrl = "templates/conservatory/templates/markerWindow.html";

    $scope.marker = {
        coord: {
            latitude: coordsMarker[0],
            longitude: coordsMarker[1]
        },
        icon: "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi.png",
        id: 0,
        show: false,
        zoom: 11
    };

    $scope.close = function() {
        $uibModalInstance.dismiss('closed');
    };

    $timeout(function() {
      $scope.showMap = true;
    }, 500);
}]);
