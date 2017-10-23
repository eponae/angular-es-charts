'use strict';

import angular from 'angular';
import ChartsController from 'charts-controller';

export default angular.module('conservatories.charts')
    .component('charts', {
        templateUrl: 'charts/charts.html',
        controllerAs: '$ctrl',
        controller: ChartsController
    });