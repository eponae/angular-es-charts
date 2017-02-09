'use strict';

angular.module('basics').config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'uiGmapGoogleMapApiProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider, uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: "AIzaSyDOaHhIXyhaoX9I692e6YUBVYCicLvED5A", //Clé pour utiliser l'API
            libraries: 'geometry,visualization' //Librairies supplémentaires
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
            })
            .state('init', {
                url: '/init',
                templateUrl: 'templates/initES/templates/initES.html',
                controller: 'InitESCtrl'
            });
    }
]);
