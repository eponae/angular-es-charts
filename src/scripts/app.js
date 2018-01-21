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

import '../assets/sass/app.scss';

import { configuration } from './app-config.js';
import { conservatoryModule } from './conservatory/conservatory.module.js';
import { dashboardModule } from './dashboard/dashboard.module.js';
import { contactModule } from './contact/contact.module.js';
import { chartsModule } from './charts/charts.module.js';
import { ErrorInterceptor } from './interceptor.js';
import { ErrorService } from './error-service.js';
import { upperFirstLetterFilter } from './utils/upper-first-letter.filter.js';
import { AppController } from './app.controller.js';

angular
  .module('conservatories', [
    'ui.router',
    'zingchart-angularjs',
    'uiGmapgoogle-maps',
    'ngMaterial',
    'pascalprecht.translate',
    'tmh.dynamicLocale',
    'ngCookies',
    conservatoryModule.name,
    chartsModule.name,
    dashboardModule.name,
    contactModule.name
  ])
  .controller('appController', AppController)
  .filter('upperFirstLetter', () => upperFirstLetterFilter)
  .service('errorInterceptor', ErrorInterceptor)
  .service('errorService', ErrorService)
  .constant('API_URL', 'https://api.eponae.fr/conservatories/')
  .config(configuration);
