'use strict';

routing.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider', 'uiGmapGoogleMapApiProvider'];


export default function routing($stateProvider, $urlRouterProvider, $httpProvider, uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: "AIzaSyDOaHhIXyhaoX9I692e6YUBVYCicLvED5A",
        libraries: 'geometry,visualization'
    });
    $urlRouterProvider.otherwise('/dashboard');
    $httpProvider.interceptors.push('ErrorInterceptor');

    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'dashboard/dashboard.html',
            controller: 'DashboardCtrl'
        })
        .state('charts', {
            url: '/charts',
            templateUrl: 'charts/charts.html',
            controller: 'ChartsCtrl'
        })
        .state('contact', {
            url: '/contact',
            templateUrl: 'contact/contact.html',
            controller: 'ContactCtrl'
        });
}