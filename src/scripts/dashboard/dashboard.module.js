import { dashboard } from './dashboard.component.js';

const dashboardModule = angular
  .module('conservatories.dashboard', [])
  .component('dashboard', dashboard);
export { dashboardModule };
