var gulp = require('gulp'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css')
    clean = require('gulp-clean'),
    imagemin = require('gulp-imagemin'),
    imageminJpegtran = require('imagemin-jpegtran'),
	ngAnnotate = require('gulp-ng-annotate'),
    browserSync = require('browser-sync').create(),
    php = require('gulp-connect-php'),
    less = require('gulp-less');

var paths = {
    htmlToWatch: 'app/*.html',
    cssToWatch: 'app/css/main.css',
    lessToWatch: 'app/less/main.less'
};

//SERVER

gulp.task('serve', ['php-serve', 'watch'], function () {
    browserSync.init({
        proxy: '127.0.0.1:9000',
        port: 9090,
        open: true,
        notify: false,
    });
});

gulp.task('php-serve', function() {
    php.server({
        base: 'app',
        port: 9000,
        keepalive: true
    });
});

//BUILD

gulp.task('build', ['templates', 'imagemin'], function() {
    var assets = useref.assets();

    return gulp.src(['app/index.html', 'app/data.json'])
    .pipe(assets)
    .pipe(gulpif('*.js', ngAnnotate()))
    //.pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('dist'));
});

gulp.task('templates', function() {
    return gulp.src('app/angular/views/*')
        .pipe(gulp.dest('dist/angular/views'));
});

gulp.task('imagemin', function() {
    return gulp.src('app/img/**/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('clean', function() {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

//LESS

gulp.task('less', function () {
    return gulp.src(paths.lessToWatch)
        .pipe(less())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
});

//WATCHER

gulp.task('watch', function() {
    gulp.watch(paths.lessToWatch, ['less']);
    gulp.watch(paths.htmlToWatch).on('change', browserSync.reload);;
});