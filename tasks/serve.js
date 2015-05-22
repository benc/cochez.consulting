'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('browserSync', function () {
  browserSync.init(['./.build/**/*'], {
    server: {
      baseDir: '.build'
    },
    port: 9000,
    ui: {
      port: 9001
    },
    open: false
  });

  gulp.watch('src/**/*.sass', ['sass']);
  gulp.watch('src/**/*.html', ['html']);
});

gulp.task('serve', ['build', 'browserSync']);
