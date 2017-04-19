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
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/angular/angular.min.js',
            'bower_components/angular-i18n/angular-locale_fr-fr.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'bower_components/lodash/dist/lodash.min.js',
            'bower_components/highstock-release/highstock.js',
            'bower_components/highstock-release/highcharts-more.js',
            'bower_components/highstock-release/modules/exporting.js',
            'bower_components/highstock-release/modules/drilldown.js',
            'bower_components/highcharts-ng/dist/highcharts-ng.min.js',
            'bower_components/angular-spinner/dist/angular-spinner.js',
            'bower_components/angular-animate/angular-animate.min.js',
            'bower_components/angular-ui-router/release/angular-ui-router.min.js',
            'bower_components/startbootstrap-sb-admin-2/bower_components/metisMenu/dist/metisMenu.js',
            'bower_components/startbootstrap-sb-admin-2/dist/js/sb-admin-2.js',
            'bower_components/angular-simple-logger/dist/angular-simple-logger.min.js',
            'bower_components/angular-google-maps/dist/angular-google-maps.min.js',
            'bower_components/libs/dichotomic.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'src/app/module.js',
            'src/app/routes.js',
            'src/app/filters/*.js',
            'src/app/constants.js',
            'src/app/ErrorInterceptor.js',
            'src/app/MasterCtrl.js',
            'src/modules/**/*.js',
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
