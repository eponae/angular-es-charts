export default function routing(
  $stateProvider, $urlRouterProvider, $httpProvider,
  uiGmapGoogleMapApiProvider
) {
  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyDOaHhIXyhaoX9I692e6YUBVYCicLvED5A',
    libraries: 'geometry,visualization'
  });

  $urlRouterProvider.otherwise('/dashboard');
  $httpProvider.interceptors.push('ErrorInterceptor');

  $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: './templates/dashboard.html',
      controller: 'dashboardController'
    })
    .state('charts', {
      url: '/charts',
      templateUrl: './templates/charts.html',
      controller: 'chartsController'
    })
    .state('contact', {
      url: '/contact',
      templateUrl: './templates/contact.html',
      controller: 'contactController'
    });
}

routing.$inject = [
  '$stateProvider', '$urlRouterProvider', '$httpProvider',
  'uiGmapGoogleMapApiProvider'
];
