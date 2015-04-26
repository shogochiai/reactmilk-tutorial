var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
  gulp.src('')
  .pipe(webserver({
    livereload: false,
    directoryListing: false,
    open: false
  }));
});

gulp.task("default",["webserver"]);
