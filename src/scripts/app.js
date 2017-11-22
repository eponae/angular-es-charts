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
import 'angular-translate';
import 'angular-translate-storage-cookie';
import 'angular-translate-loader-static-files';
import 'angular-dynamic-locale';
import 'angular-cookies';
import 'angular-translate-storage-local';

import configuration from './app-config.js';

import '../assets/sass/app.scss';

import conservatory from './conservatory/conservatory.module.js';
import dashboard from './dashboard/dashboard.module.js';
import contact from './contact/contact.module.js';
import charts from './charts/charts.module.js';
import ErrorInterceptor from './interceptor.js';
import ErrorService from './error-service.js';
import upperFirstLetter from './utils/upper-first-letter.filter.js';

export default angular
  .module('conservatories', [
    'ui.router',
    'zingchart-angularjs',
    'uiGmapgoogle-maps',
    'ngMaterial',
    'pascalprecht.translate',
    'tmh.dynamicLocale',
    'ngCookies',
    conservatory.name,
    charts.name,
    dashboard.name,
    contact.name
  ])
  .filter('upperFirstLetter', () => upperFirstLetter)
  .service('errorInterceptor', ErrorInterceptor)
  .service('errorService', ErrorService)
  .constant('API_URL', 'https://api.eponae.fr/conservatories/')
  .config(configuration)
  .run([
    'tmhDynamicLocale',
    tmhDynamicLocale => {
      tmhDynamicLocale.set('fr');
    }
  ]);
