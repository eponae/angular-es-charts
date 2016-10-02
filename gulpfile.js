var gulp = require('gulp'),
    del = require('del'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    inject = require('gulp-inject'),
    angularFilesort = require('gulp-angular-filesort'),
    minifyCss = require('gulp-clean-css'),
    minifyHTML = require('gulp-htmlmin'),
    minifyJs = require('gulp-uglify'),
    minifyImg = require('gulp-imagemin'),
    usemin = require('gulp-usemin'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    notify = require('gulp-notify');

var paths = {
    scripts: ['src/app/**/*.js', 'src/modules/**/*.js'],
    json: 'src/assets/json/**/*.json',
    styles: 'src/assets/css/**/*.css',
    sassFiles: ['src/assets/sass/**/*.scss', 'src/modules/**/sass/*.scss'],
    templates: 'src/modules/**/*.html',
    index: 'src/index.html',
    img: 'src/assets/img/*',
    bower_fonts: 'bower_components/**/*.{ttf,woff,eof,svg,woff2}'
};

/**
 * Handle bower components listed in index.html
 */
gulp.task('usemin-dist', function() {
    return gulp.src('dist/index.html')
        .pipe(usemin({
            jslib: [minifyJs(), 'concat'],
            css: [minifyCss({
                keepSpecialComments: 0
            }), 'concat'],
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('usemin', function() {
    return gulp.src('dist/index.html')
        .pipe(usemin())
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('clean', function() {
    return del([
        'dist'
    ]);
});

/**
 * Copy assets
 */
gulp.task('copy-bower_fonts', function() {
    return gulp.src(paths.bower_fonts)
        .pipe(rename({
            dirname: '/fonts'
        }))
        .pipe(gulp.dest('dist/lib'))
        .pipe(connect.reload());
});

/* Transform SASS files into CSS stylesheets */
gulp.task('custom-sass', function() {
    return gulp.src(paths.sassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/assets/css/'))
        .pipe(connect.reload());
});

gulp.task('custom-css', function() {
    return gulp.src(paths.styles)
        .pipe(concat('basics.min.css'))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(connect.reload());
});

gulp.task('custom-css-dist', function() {
    return gulp.src(paths.styles)
        .pipe(concat('basics.min.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/assets/css'));
});

gulp.task('custom-templates', function() {
    return gulp.src(paths.templates)
        .pipe(minifyHTML())
        .pipe(gulp.dest('dist/templates'))
        .pipe(connect.reload());
});

gulp.task('custom-json', function() {
    return gulp.src(paths.json)
        .pipe(gulp.dest('dist/assets/json'))
        .pipe(connect.reload());
});

//Correct livereload for inject
gulp.task('custom-js-default', function() {
    var target = gulp.src(paths.index);
    var sources = gulp.src(paths.scripts)
        .pipe(angularFilesort())
        .pipe(gulp.dest('./dist/scripts'));

    return target.pipe(inject(sources, {
            ignorePath: 'dist'
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
});

gulp.task('custom-js-dist', function() {
    var appStream = gulp.src(paths.scripts)
        .pipe(angularFilesort())
        .pipe(concat('basics.min.js'))
        .pipe(minifyJs())
        .pipe(gulp.dest('./dist/scripts'));

    return gulp.src(paths.index)
        .pipe(inject(appStream, {
            ignorePath: 'dist'
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('imagemin', function() {
    gulp.src(paths.img)
        .pipe(minifyImg())
        .pipe(gulp.dest('dist/assets/img'))
});

// check JS code quality
gulp.task('jshint', function() {
    return gulp.src(paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

/**
 * Live reload server
 */
gulp.task('webserver', function() {
    connect.server({
        root: 'dist',
        livereload: true,
        port: 8888
    });
});

gulp.task('custom-js', function(callback) {
    runSequence('build-custom', 'usemin', callback);
});

gulp.task('build-assets', function(callback) {
    runSequence('custom-json', 'copy-bower_fonts', 'imagemin', callback);
});

gulp.task('build-custom', function(callback) {
    runSequence('custom-js-default', 'jshint', 'custom-sass', 'custom-css', 'custom-templates', callback);
});

gulp.task('build-custom-dist', function(callback) {
    runSequence('custom-js-dist', 'jshint', 'custom-sass', 'custom-css-dist', 'custom-templates', callback);
});

gulp.task('build', function(callback) {
    runSequence('clean', 'build-assets', 'build-custom', 'usemin', callback);
});

gulp.task('build-dist', function(callback) {
    runSequence('clean', 'build-assets', 'build-custom-dist', 'usemin-dist', callback);
});

gulp.task('default', function(callback) {
    runSequence('build', 'webserver', 'watch', callback);
});

/**
 * Watch custom files
 */
gulp.task('watch', function() {
    gulp.watch([paths.json], ['custom-json']);
    gulp.watch([paths.sassFiles], ['custom-sass']);
    gulp.watch([paths.styles], ['custom-css']);
    gulp.watch([paths.scripts], ['custom-js']);
    gulp.watch([paths.templates], ['custom-templates']);
    gulp.watch([paths.index], ['usemin']);
});
