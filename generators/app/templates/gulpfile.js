'use strict';

var gulp = require('gulp');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var webpack = require('webpack-stream');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var jsxhint = require('jshint-jsx');
var stylish = require('jshint-stylish');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var argv = require('yargs').argv;
var preprocess = require('gulp-preprocess');

var path = {
  scripts: ['src/scripts/**/*.js', 'src/scripts/**/*.jsx'],
  styles: ['src/styles/**/*.scss'],
  entry: ['src/index.html'],
  dist: 'dist',
  webpackConfig: './webpack.config.js'
}

gulp.task('lint', function() {
  return gulp.src(path.scripts)
    .pipe(jshint({
      linter: jsxhint.JSXHINT,
      esnext: true
    }))
    .pipe(jshint.reporter(stylish));
});

gulp.task('scripts', ['lint'], function() {
  return gulp.src(path.scripts)
    .pipe(sourcemaps.init())
      .pipe(webpack(require(path.webpackConfig)))
      .pipe(gulpif(argv.production, uglify()))
    .pipe(sourcemaps.write('.'))
    .pipe(preprocess({context: {ENV: argv.production ? 'production' : 'development'}}))
    .pipe(gulp.dest(path.dist));
});

function sassError(e) {
  sass.logError(e);
  this.emit('end');
}

gulp.task('styles', function() {
  return gulp.src(path.styles)
    .pipe(sourcemaps.init())
      .pipe(sass().on('error', sassError))
      .pipe(gulpif(argv.production, minifyCss()))
    .pipe(sourcemaps.write('.'))
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(path.dist));
});

gulp.task('html', function() {
  return gulp.src(path.entry).pipe(gulp.dest(path.dist));
});

gulp.task('build', ['html', 'scripts', 'styles']);

gulp.task('clean', function(cb) {
  del(['dist/**/*'], cb);
});

gulp.task('refresh-scripts', ['scripts'], browserSync.reload);
gulp.task('refresh-styles', ['styles'], browserSync.reload);
gulp.task('refresh-html', ['html'], browserSync.reload);

gulp.task('serve', ['build'], function() {
    browserSync.init({
        notify: false,
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch(path.scripts, ['refresh-scripts']);
    gulp.watch(path.styles, ['refresh-styles']);
    gulp.watch(path.entry, ['refresh-html']);
});

gulp.task('default', ['serve']);
