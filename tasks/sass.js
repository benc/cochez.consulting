'use strict'

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    notify = require('gulp-notify');

var errorHandler = notify.onError(function (error) {
    gutil.log(error.plugin + ' ERROR ' + error);
    return error.plugin + ' ' + error.name;
});

gulp.task('sass', function () {
  var sassOpts = {
      errLogToConsole: true
  };
  return gulp.src('./src/**/*.sass')
    .pipe(sass(sassOpts).on('error', errorHandler))
    .pipe(gulp.dest('./.build/'));
});
