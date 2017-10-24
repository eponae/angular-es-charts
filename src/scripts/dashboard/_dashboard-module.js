

import angular from 'angular';
import DashboardController from 'dashboard-controller';

export default angular.module('conservatories.dashboard')
    .component('dashboard', {
        templateUrl: 'dashboard/dashboard.html',
        controllerAs: '$ctrl',
        controller: DashboardController
    });