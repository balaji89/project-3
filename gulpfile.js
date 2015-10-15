'use strict';
var gulp = require('gulp'); 
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('scss', function (){
gulp.src('./scss/**/*.scss')
.pipe(sass().on('error', sass.logError))
.pipe(gulp.dest('./css'));
});

gulp.task('default', function () {
    return gulp.src('src/app.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('browser-sync', function() {
browserSync.init({
	   server: {
        baseDir: "./"
        }
    });
gulp.watch('./scss/**/*.scss', ['scss']);
gulp.watch(["index.html","css/*.css","js/*.js"]).on('change', browserSync.reload);
});





