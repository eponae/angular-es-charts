'use strict';

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
import spinner from 'angular-spinner';
import animate from 'angular-animate';
import uiGmapgooglemaps from 'angular-google-maps';

angular.module('conservatories', [
        conservatoryConserv,
        conservatoryCharts,
        conservatoryDashboard,
        conservatoryContact,
        uibootstrap,
        uirouter,
        zingchart,
        zingchartangular,
        spinner,
        animate,
        uiGmapgooglemaps
    ]
)
    .constant("API_URL", "https://charts-api.vibioh.fr/conservatories/")
    .controller('homeController', HomeController)
    .config(routing);