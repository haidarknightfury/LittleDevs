//https://css-tricks.com/gulp-for-beginners/

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
// useref : concatenation of javascript
var useref = require('gulp-useref');

var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');

// 'gulp hello' to run the task with name hello
gulp.task('hello', () => {
  console.log('hello haidar');
});

// 'gulp sass'
gulp.task('sass', function () {
  return gulp.src('app/scss/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'));
});

//globe: add wildcard 
gulp.task('sass-globe', function () {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

//watch for changes
// browserSync must be completed before watch is to be run
// also run sass-globe before watch - compile all before start
gulp.task('watch', ['browserSync', 'sass-globe'], () => {
  // apply the sass-globe to the watch
  gulp.watch('app/scss/**/*.scss', ['sass-globe']);

  //watch html and js files
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);

});

// browser sync task auto refresh
gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  })
});

//Gulp will take run through the 3 script tags and concatenate them into dist/js/main.min.js
// Go to index.html <!-- build:<type> <path> -->
gulp.task('useref', function () {
  return gulp.src('app/*html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'));
});

