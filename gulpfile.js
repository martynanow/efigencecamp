var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var path = require('path');

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.sass')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('./public/css'))
});

gulp.watch('./sass/**/*.sass', ['sass']);

gulp.task('default', ['sass'], function() {
  // place code for your default task here
});


