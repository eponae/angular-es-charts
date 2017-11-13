import 'lodash';
import 'angular';
import 'angular-ui-router';
import 'zingchart-angularjs';
import 'angular-simple-logger';
import 'angular-google-maps';
import 'angular-animate';
import 'angular-aria';
import 'angular-messages';
import 'angular-material';

import configuration from './app-config.js';

import '../assets/sass/app.scss';

import conservatory from './conservatory/_conservatory-module.js';
import dashboard from './dashboard/_dashboard-module.js';
import contact from './contact/_contact-module.js';
import charts from './charts/_charts-module.js';
import ErrorInterceptor from './interceptor.js';
import ErrorService from './error-service.js';

export default angular
  .module('conservatories', [
    'ui.router',
    'zingchart-angularjs',
    'uiGmapgoogle-maps',
    'ngMaterial',
    conservatory.name,
    charts.name,
    dashboard.name,
    contact.name
  ])
  .service('errorInterceptor', ErrorInterceptor)
  .service('errorService', ErrorService)
  .constant('API_URL', 'https://api.eponae.fr/conservatories/')
  .config(configuration);
