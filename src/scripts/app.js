import 'lodash';
import 'angular';
import 'angular-ui-router';
import 'angular-ui-bootstrap';
import 'zingchart-angularjs';
import 'angular-simple-logger';
import 'angular-google-maps';

import routing from './app-routing.js';

import '../assets/sass/app.scss';

import conservatoryDetails from './conservatory/conservatory-details-component.js';
import conservatoryDrilldown from './conservatory/conservatory-drilldown-component.js';
import conservatoryService from './conservatory/conservatory-service.js';
import dashboard from './dashboard/dashboard-component.js';
import charts from './charts/charts-component.js';
import contact from './contact/contact-component.js';

angular.module('conservatories.conservatory', [])
  .service('conservatoryService', conservatoryService)
  .component('conservatoryDetails', conservatoryDetails)
  .component('conservatoryDrilldown', conservatoryDrilldown);

angular.module('conservatories.contact', [])
  .component('contact', contact);

angular.module('conservatories.dashboard', [])
  .component('dashboard', dashboard);

angular.module('conservatories.charts', [])
  .component('charts', charts);

let conservatories = angular.module('conservatories', [
  'conservatories.conservatory',
  'conservatories.charts',
  'conservatories.dashboard',
  'conservatories.contact',
  'ui.router',
  'ui.bootstrap',
  'zingchart-angularjs',
  'uiGmapgoogle-maps'
])
  .config(routing)
  .constant('API_URL', 'https://charts-api.vibioh.fr/conservatories/');

export default conservatories;
