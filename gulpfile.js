var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber');


// Get and render all .styl files recursively
gulp.task('stylus', function () {
    gulp.src('assets/styles/**/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest('assets/styles/'));
});

gulp.task('watch', function(){
    gulp.src('assets/styles/**/*.styl')
    .pipe(watch())
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest('assets/styles/'));
});

gulp.task('default',function(){
});
