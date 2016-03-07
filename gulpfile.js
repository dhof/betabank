var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var compass = require('gulp-compass');

// **/* goes through all sub folders within src/
gulp.task('compass', function() {
	gulp.src(['public/scss/**/*.scss'])
		.pipe(compass({
			// config_file: 'config.rb',
			css: 'public/web',
			sass: 'public/scss'
		}))
		.pipe(concat('styles.css'))
		.pipe(minifyCSS())	
		.pipe(gulp.dest('public/web/css'))
})

// gulp.task('styles', function() {
// 	gulp.src(['public/css/**/*.css'])
// 		.pipe(concat('styles.css'))
// 		.pipe(tinyCSS())
// 		.pipe(gulp.dest('public/web/css'))
// });

gulp.task('scripts', function() {
	gulp.src(['public/js/**/*.js'])
		.pipe(concat('scripts.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/web/js'))
});

gulp.task('default', function() {
	
	gulp.watch('public/scss/**/*.scss', ['compass'])
	gulp.watch('public/js/**/*.js', ['scripts'])
});

