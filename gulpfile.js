var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var babelify = require('babelify');
var browserify = require('browserify');
var vinylSourceStream = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');

// Load all gulp plugins into the plugins object.
var plugins = require('gulp-load-plugins')();

var paths = {
    scripts: {
        all: 'src/scripts/**/*.js',
        app: 'src/scripts/app.js'
    },
    styles: 'src/assets/css/*.css',
    sass: ['src/assets/sass/*.scss', 'src/scripts/**/*.scss'],
    css: 'src/assets/css/',
    templates: 'src/scripts/**/*.html',
    index: 'src/index.html',
    img: 'src/assets/img/*',
    icons: 'src/assets/favicon/*',
    fonts: 'node_modules/bootstrap/dist/fonts/*.{ttf,woff,eof,svg,woff2}'
};

var build = 'dist/';

var out = {
    lib: build + 'lib/',
    scripts: {
        file: 'app.min.js',
        folder: build + 'scripts/'
    },
    css: {
        file: 'app.min.css',
        folder: build + 'assets/css/'
    },
    templates: build + 'templates/',
    img: build + 'assets/img/',
    fonts: 'fonts',
    index: build + 'index.html'
};

/* The jshint task runs jshint with ES6 support. */
gulp.task('jshint', function () {
    return gulp.src(paths.scripts.all)
        .pipe(plugins.jshint({
            esnext: true // Enable ES6 support
        }))
        .pipe(plugins.jshint.reporter('jshint-stylish'));
});

/* Compile all script files into one output minified JS file. */
gulp.task('scripts', ['jshint'], function () {

    var sources = browserify({
        entries: paths.scripts.app,
        debug: true // Build source maps
    })
        .transform(babelify.configure({
            // You can configure babel here!
            // https://babeljs.io/docs/usage/options/
            presets: ["es2015"]
        }));

    return sources.bundle()
        .pipe(vinylSourceStream(out.scripts.file))
        .pipe(vinylBuffer())
        .pipe(plugins.sourcemaps.init({
            loadMaps: true // Load the sourcemaps browserify already generated
        }))
        .pipe(plugins.ngAnnotate())
        .pipe(plugins.uglify())
        .pipe(plugins.sourcemaps.write('./', {
            includeContent: true
        }))
        .pipe(gulp.dest(out.scripts.folder))
        .pipe(plugins.connect.reload());

});

gulp.task('serve', ['build'], function () {
    plugins.connect.server({
        root: build,
        port: 4242,
        livereload: true,
        fallback: out.index
    });
});

gulp.task('clean', function () {
    return del([
        build
    ]);
});

gulp.task('copy-fonts', function () {
    return gulp.src(paths.fonts)
        .pipe(plugins.rename({
            dirname: out.fonts
        }))
        .pipe(gulp.dest(out.lib))
        .pipe(plugins.connect.reload());
});

/* Transform SASS files into CSS stylesheets */
gulp.task('sass', function () {
    return gulp.src(paths.sass)
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(gulp.dest(paths.css))
        .pipe(plugins.connect.reload());
});

gulp.task('css', function () {
    return gulp.src(paths.styles)
        .pipe(plugins.concat(out.css.file))
        .pipe(gulp.dest(out.css.folder))
        .pipe(plugins.connect.reload());
});

gulp.task('templates', function () {
    return gulp.src(paths.templates)
        .pipe(gulp.dest(out.templates))
        .pipe(plugins.connect.reload());
});

gulp.task('index', function() {
    return gulp.src(paths.index)
        .pipe(plugins.usemin({
            jslib: [plugins.uglify(), 'concat'],
            css: [plugins.cleanCss({
                keepSpecialComments: 0
            }), 'concat']
        }))
        .pipe(gulp.dest(build));
});

gulp.task('imagemin', function () {
    gulp.src(paths.img)
        .pipe(plugins.imagemin())
        .pipe(gulp.dest(out.img))
});

gulp.task('copy-icons', function () {
    gulp.src(paths.icons)
        .pipe(gulp.dest(build))
});

gulp.task('build-dist', function (callback) {
    runSequence('clean', 'sass', 'css', 'imagemin', 'copy-fonts', 'scripts', 'templates', 'index', callback);
});

gulp.task('build', function (callback) {
    runSequence('clean', 'sass', 'css', 'imagemin', 'copy-fonts', 'scripts', 'templates', 'index', 'watcher', callback);
});

gulp.task('default', ['serve']);


/**
 * Watch custom files
 */
gulp.task('watcher', function () {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.styles, ['css']);
    gulp.watch(paths.scripts.all, ['scripts']);
    gulp.watch(paths.templates, ['templates']);
});
