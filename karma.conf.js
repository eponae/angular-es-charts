// Karma configuration
// Generated on Tue Apr 18 2017 22:19:16 GMT+0200 (Romance Daylight Time)

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/angular/angular.min.js',
      'node_modules/angular-i18n/angular-locale_fr-fr.js',
      'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
      'node_modules/zingchart/client/zingchart.min.js',
      'node_modules/zingchart-angularjs/src/zingchart-angularjs.js',
      'node_modules/angular-spinner/dist/angular-spinner.js',
      'node_modules/angular-animate/angular-animate.min.js',
      'node_modules/angular-ui-router/release/angular-ui-router.min.js',
      'node_modules/angular-simple-logger/dist/angular-simple-logger.min.js',
      'node_modules/angular-google-maps/dist/angular-google-maps.min.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'src/scripts/app.js',
      'src/scripts/interceptor/ErrorInterceptor.js',
      'src/scripts/home/MasterCtrl.js',
      'src/scripts/**/*.js',
      'src/tests/**/*.test.js'
    ],


    // list of files to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {},


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
};
