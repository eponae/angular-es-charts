export default function configuration(
  $stateProvider,
  $urlRouterProvider,
  $httpProvider,
  $mdAriaProvider,
  $mdThemingProvider,
  uiGmapGoogleMapApiProvider,
  tmhDynamicLocaleProvider,
  $translateProvider
) {
  const $injector = angular.injector(['ng']);
  const $http = $injector.get('$http');

  $http.get('/env').then(response => {
    uiGmapGoogleMapApiProvider.configure({
      key: response.data.GOOGLE_MAPS_KEY,
      libraries: 'geometry,visualization'
    });
  });

  $translateProvider.useStaticFilesLoader({
    prefix: '/locales/',
    suffix: '.json'
  });
  $translateProvider.preferredLanguage('fr').fallbackLanguage('fr');
  $translateProvider.useSanitizeValueStrategy('sceParameters');
  $translateProvider.useLocalStorage();

  tmhDynamicLocaleProvider.localeLocationPattern('/locales/angular-i18n/angular-locale_{{locale}}.js');
  tmhDynamicLocaleProvider.defaultLocale('fr');

  $mdThemingProvider
    .theme('altTheme')
    .primaryPalette('purple')
    .accentPalette('orange');
  $mdThemingProvider.setDefaultTheme('altTheme');

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

configuration.$inject = [
  '$stateProvider',
  '$urlRouterProvider',
  '$httpProvider',
  '$mdAriaProvider',
  '$mdThemingProvider',
  'uiGmapGoogleMapApiProvider',
  'tmhDynamicLocaleProvider',
  '$translateProvider'
];
