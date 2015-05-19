'use strict';

var gulp = require('gulp'),
    connect = require('gulp-connect');

gulp.task('connect', function () {
  return connect.server({
    root: [
      'site'
    ],
    port: 9000
  });
});

gulp.task('serve', ['connect']);
