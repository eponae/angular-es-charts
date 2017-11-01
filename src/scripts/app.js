import 'lodash';
import 'angular';
import 'angular-ui-router';
import 'angular-ui-bootstrap';
import 'zingchart-angularjs';
import 'angular-simple-logger';
import 'angular-google-maps';

import routing from './app-routing.js';

import '../assets/sass/app.scss';

import conservatory from './conservatory/_conservatory-module.js';
import dashboard from './dashboard/_dashboard-module.js';
import contact from './contact/_contact-module.js';
import charts from './charts/_charts-module.js';
import ErrorInterceptor from './interceptor.js';


export default angular.module('conservatories', [
  'ui.router',
  'ui.bootstrap',
  'zingchart-angularjs',
  'uiGmapgoogle-maps',
  conservatory.name,
  charts.name,
  dashboard.name,
  contact.name
])
  .service('errorInterceptor', ErrorInterceptor)
  .config(routing)
  .constant('API_URL', 'https://api.eponae.fr/conservatories/');
