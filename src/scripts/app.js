'use strict';

angular.module('conservatories', ['ui.bootstrap', 'ui.router', 'zingchart-angularjs', 'angularSpinner', 'ngAnimate', 'uiGmapgoogle-maps'])
    .constant("API_URL", "https://charts-api.vibioh.fr/conservatories/")
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'uiGmapGoogleMapApiProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider, uiGmapGoogleMapApiProvider) {
            uiGmapGoogleMapApiProvider.configure({
                key: "AIzaSyDOaHhIXyhaoX9I692e6YUBVYCicLvED5A",
                libraries: 'geometry,visualization'
            });
            $urlRouterProvider.otherwise('/dashboard');
            $httpProvider.interceptors.push('ErrorInterceptor');

            $stateProvider
                .state('dashboard', {
                    url: '/dashboard',
                    templateUrl: 'templates/dashboard/templates/dashboard.html',
                    controller: 'DashboardCtrl'
                })
                .state('charts', {
                    url: '/charts',
                    templateUrl: 'templates/charts/templates/charts.html',
                    controller: 'ChartsCtrl'
                })
                .state('contact', {
                    url: '/contact',
                    templateUrl: 'templates/contact/templates/contact.html',
                    controller: 'ContactCtrl'
                });
        }
    ]);