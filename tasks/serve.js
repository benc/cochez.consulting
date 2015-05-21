'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('browserSync', function () {
  browserSync.init(['./build/**/*.css', './build/**/*.html'], {
    server: {
      baseDir: '.build'
    },
    port: 9000,
    ui: {
      port: 9001
    },
    open: false
  });
});

gulp.task('watch', function() {
  gulp.watch('site/**/*.sass', ['sass']);
  gulp.watch('site/**/*.html', ['html']);
});

gulp.task('serve', ['build', 'browserSync', 'watch']);
