'use strict';

import angular from 'angular';
import ConservatoryDrilldownController from 'conservatory-drilldown-controller';
import ConservatoryDetailsController from 'conservatory-details-controller';
import ConservatoryService from 'conservatory-service';

export default angular.module('conservatories.conservatory')
    .service('conservatoryService', ConservatoryService)
    .component('conservatoryDrilldown', {
        templateUrl: 'conservatory/conservatory-drilldown.html',
        controllerAs: '$ctrl',
        controller: ConservatoryDrilldownController
    })
    .component('conservatoryDetails', {
        templateUrl: 'conservatory/conservatory-details.html',
        bindings: {
            conservatory: '<',
            close: '&'
        },
        controllerAs: '$ctrl',
        controller: ConservatoryDetailsController
    });