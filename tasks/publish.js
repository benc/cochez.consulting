var gulp = require('gulp'),
    awspublish = require('gulp-awspublish');

gulp.task('publish', function() {

  var publisher = awspublish.create({
    params: {
      Bucket: 'www.cochezconsult.be'
    },
    region: 'eu-central-1'
  });

  return gulp.src('./site/**/*')
    .pipe(awspublish.gzip())
    .pipe(publisher.publish())
    .pipe(publisher.sync())
    .pipe(awspublish.reporter());
});
