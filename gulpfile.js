var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber'),
    prefix = require('gulp-autoprefixer');
    
// Get and render all .styl files recursively
gulp.task('stylus', function () {
    gulp.src('assets/styles/style.styl')
    .pipe(stylus())
    .pipe(prefix("last 1 version", "> 1%", "ie 9"))  
    .pipe(gulp.dest('assets/styles/'));
});

gulp.task('watch', function(){
  gulp.watch('assets/styles/**/*.styl',function(){gulp.run('stylus')})
});

gulp.task('default',['stylus','watch']);
