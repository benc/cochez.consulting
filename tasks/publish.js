'use strict';

var gulp = require('gulp');
var awspublish = require('gulp-awspublish');

gulp.task('publish', ['build'], function() {

  var publisher = awspublish.create({
    params: {
      Bucket: 'cochez.consulting'
    },
    region: 'eu-central-1'
  });

  return gulp.src('./.build/**/*')
    .pipe(awspublish.gzip())
    .pipe(publisher.publish())
    .pipe(publisher.sync())
    .pipe(awspublish.reporter());
});
