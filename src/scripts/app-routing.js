export default function routing(
  $stateProvider, $urlRouterProvider, $httpProvider,
  uiGmapGoogleMapApiProvider, $mdAriaProvider
) {
  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyDOaHhIXyhaoX9I692e6YUBVYCicLvED5A',
    libraries: 'geometry,visualization'
  });

  $mdAriaProvider.disableWarnings();

  $urlRouterProvider.otherwise('/dashboard');
  $httpProvider.interceptors.push('errorInterceptor');

  $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      template: '<dashboard></dashboard>'
    })
    .state('charts', {
      url: '/charts',
      template: '<charts></charts>'
    })
    .state('contact', {
      url: '/contact',
      template: '<contact></contact>'
    });
}

routing.$inject = [
  '$stateProvider', '$urlRouterProvider', '$httpProvider',
  'uiGmapGoogleMapApiProvider', '$mdAriaProvider'
];
