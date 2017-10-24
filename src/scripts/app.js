import angular from 'angular';
import routing from 'app-routing';
import HomeController from "home/home-controller";

import conservatoryConserv from 'conservatory/_conservatory-module';
import conservatoryDashboard from 'dashboard/_dashboard-module';
import conservatoryCharts from 'charts/_charts-module';
import conservatoryContact from 'contact/_contact-module';

import uirouter from 'angular-ui-router';
import uibootstrap from 'angular-ui-bootstrap';
import zingchart from 'zingchart';
import zingchartangular from 'zingchart-angularjs';
import uiGmapgooglemaps from 'angular-google-maps';
import angulari18n from 'angular-i18n';

import bootstrapStyle from '../../node_modules/bootstrap/dist/css/bootstrap.css';
import style from '../assets/sass/basics.scss';

/* Add lodash, angular spinner and animate if missing */

angular.module('conservatories', [
    conservatoryConserv,
    conservatoryCharts,
    conservatoryDashboard,
    conservatoryContact,
    uibootstrap,
    uirouter,
    zingchart,
    zingchartangular,
    uiGmapgooglemaps
])
    .constant('API_URL', 'https://charts-api.vibioh.fr/conservatories/')
    .controller('homeController', HomeController)
    .config(routing);