export default function routing(
  $stateProvider, $urlRouterProvider, $httpProvider,
  uiGmapGoogleMapApiProvider
) {
  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyDOaHhIXyhaoX9I692e6YUBVYCicLvED5A',
    libraries: 'geometry,visualization'
  });

  $urlRouterProvider.otherwise('/dashboard');
  // $httpProvider.interceptors.push('ErrorInterceptor');

  $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      template: '<dashboard></dashboard>'
    })
    .state('charts', {
      url: '/charts',
      templateUrl: '<charts></charts>'
    })
    .state('contact', {
      url: '/contact',
      templateUrl: '<contact></contact>'
    });
}

routing.$inject = [
  '$stateProvider', '$urlRouterProvider', '$httpProvider',
  'uiGmapGoogleMapApiProvider'
];
