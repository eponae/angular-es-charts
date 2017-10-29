import _ from '../../node_modules/lodash/lodash.min.js';

import angular from '../../node_modules/angular/angular.min.js';
import uirouter from '../../node_modules/angular-ui-router/release/angular-ui-router.min.js';
import uibootstrap from '../../node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js';
import zingchartangular from '../../node_modules/zingchart-angularjs/src/zingchart-angularjs.js';
import uiGmapgooglemaps from '../../node_modules/angular-google-maps/dist/angular-google-maps.min.js';

import routing from './app-routing.js';

import '../assets/sass/app.scss';

import conservatoryDetails from './conservatory/conservatory-details-component.js';
import conservatoryDrilldown from './conservatory/conservatory-drilldown-component.js';
import conservatoryService from './conservatory/conservatory-service.js';
import dashboard from './dashboard/dashboard-component.js';
import charts from './charts/charts-component.js';
import contact from './contact/contact-component.js';

let conservatoryModule = angular.module('conservatories.conservatory', []);
conservatoryModule.component('conservatoryDetails', conservatoryDetails);
conservatoryModule.component('conservatoryDrilldown', conservatoryDrilldown);
conservatoryModule.service('conservatoryService', conservatoryService);

let contactModule = angular.module('conservatories.contact', []);
contactModule.component('contact', contact);

let dashboardModule = angular.module('conservatories.dashboard', []);
dashboardModule.component('dashboard', dashboard);

let chartsModule = angular.module('conservatories.charts', []);
chartsModule.component('charts', charts);

let conservatories = angular.module('conservatories', [
  conservatoryModule,
  chartsModule,
  dashboardModule,
  contactModule,
  uibootstrap,
  uirouter,
  zingchartangular,
  uiGmapgooglemaps
]);
conservatories.config(routing);
conservatories.constant('API_URL', 'https://charts-api.vibioh.fr/conservatories/');

export default conservatories;
