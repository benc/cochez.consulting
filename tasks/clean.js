'use strict';

var gulp = require('gulp'),
    del = require('del');

gulp.task('clean:build', function(cb) {
  return del(['.build'], cb);
});

gulp.task('clean', ['clean:build']);
