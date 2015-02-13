var fs = require('fs');
var path = require('path');

var runSequence = require('run-sequence');
var rimraf = require('rimraf');

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');

var theo = require('theo');

////////////////////////////////////////////////////////////////////
// Paths
////////////////////////////////////////////////////////////////////

var paths = {
  designProperties: './design-properties',
  generated: './.generated',
  output: './.www',
  sass: './src/sass'
};

function getPath(p) {
  return path.resolve(__dirname, p);
}

////////////////////////////////////////////////////////////////////
// Helpers
////////////////////////////////////////////////////////////////////

function clean(p) {
  return function(done) {
    rimraf.sync(getPath(p));
    done();
  }
}

////////////////////////////////////////////////////////////////////
// Tasks - Clean
////////////////////////////////////////////////////////////////////

gulp.task('clean:generated', clean(paths.generated))
gulp.task('clean:output', clean(paths.output))
gulp.task('clean', ['clean:generated', 'clean:output']);

////////////////////////////////////////////////////////////////////
// Tasks - Design Properties
////////////////////////////////////////////////////////////////////

gulp.task('design-properties', ['styleguide'], function () {
  return gulp.src('./design-properties/app.json')
    .pipe(theo.plugins.transform('web'))
    .pipe(theo.plugins.format('scss'))
    .pipe(gulp.dest(paths.generated));
});

gulp.task('styleguide', function () {
  return gulp.src('./design-properties/app.json')
    .pipe(theo.plugins.transform('web'))
    .pipe(theo.plugins.format('html'))
    .pipe(gulp.dest(paths.generated))
    .pipe(livereload());
});

////////////////////////////////////////////////////////////////////
// Tasks - Site
////////////////////////////////////////////////////////////////////

gulp.task('styles', ['design-properties'], function () {
  return gulp.src(getPath('src/styles/**/*.scss'))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.output))
    .pipe(livereload());
});

gulp.task('html', function () {
  return gulp.src(getPath('src/index.html'))
    .pipe(gulp.dest(paths.output))
    .pipe(livereload());
});

////////////////////////////////////////////////////////////////////
// Tasks - Watch
////////////////////////////////////////////////////////////////////

gulp.task('watch', function () {
  livereload.listen({
    port: 35729
  });
  gulp.watch(getPath('design-properties/**/*.json'), ['styles']);
  gulp.watch(getPath('src/**/*.scss'), ['styles']);
  gulp.watch(getPath('src/**/*.html'), ['html']);
});

gulp.task('dev', ['default'], function() {
  require('./server');
  gulp.start('watch');
});

gulp.task('default', function(done) {
  runSequence('clean', ['styleguide', 'styles', 'html'], done);
});