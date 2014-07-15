var autoprefixer = require('gulp-autoprefixer');
var fs = require('fs');
var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var open = require('open');
var rimraf = require('gulp-rimraf');
var theo = require('theo');

var paths = {
  variables: './variables',
  generated: './generated',
  sass: './src/sass',
  output: './www'
};

gulp.task('clean-all', function () {
  gulp.src([paths.generated, paths.output, './node_modules'], {read: false}).pipe(rimraf());
});

gulp.task('init', function () {
  if (!fs.existsSync(paths.generated)) {
    fs.mkdirSync(paths.generated);
  }

  if (!fs.existsSync(paths.output)) {
    fs.mkdirSync(paths.output);
  }
});

gulp.task('variables', function () {
  theo.batch(['Sass', 'HTML'], paths.variables, paths.generated);
});

gulp.task('styles', function () {
  gulp.src(paths.sass + '/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.output));
});

gulp.task('html', function () {

  fs.createReadStream('src/index.html').pipe(fs.createWriteStream(paths.output + '/index.html'));
  fs.createReadStream('generated/example.html').pipe(fs.createWriteStream(paths.output + '/example.html'));

  gulp.src('src/assets/**')
    .pipe(gulp.dest(paths.output + '/assets'));
});

gulp.task('watch', function () {
  var lr = livereload();

  gulp.watch(['src/**/*.scss'])
    .on('change', function () {
      gulp.start('styles');
    });

  gulp.watch(['variables/**/*.json'])
    .on('change', function () {
      gulp.start('variables', 'styles');
    });

  gulp.watch(['src/**/*.html', 'generated/**/*.html'], ['html']);

  gulp.watch([paths.output + '/**/*.css', paths.output + '/**/*.js', paths.output + '/**/*.html']).on('change', function (file) {
    lr.changed(file.path);
  });
});

gulp.task('default', function () {
  gulp.start('init', 'variables', 'styles', 'html');
});

gulp.task('dev', ['default'], function () {
  require('./server');
  gulp.start('watch');
});