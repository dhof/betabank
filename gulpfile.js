var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var tinyCSS = require('gulp-minify-css');

// **/* goes through all sub folders within src/
gulp.task('styles', function() {
	gulp.src(['css/**/*.css'])
		.pipe(concat('styles.css'))
		.pipe(tinyCSS())
		.pipe(gulp.dest('public/web/css'))
});

gulp.task('scripts', function() {
	gulp.src(['js/**/*.js'])
		.pipe(concat('scripts.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/web/js'))
});

gulp.task('default', function() {
	
	gulp.watch('css/**/*.css', ['styles'])
	gulp.watch('js/**/*.js', ['scripts'])
});

