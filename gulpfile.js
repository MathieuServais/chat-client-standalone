var gulp = require('gulp');
var del = require('del');
var ts = require('gulp-typescript');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var historyApiFallback = require('connect-history-api-fallback')

var config = {
	tsFiles: ['src/**/*.ts'],
	htmlFiles: ['src/**/*.html'],
	sassFiles: ['src/assets/*.scss'],
	imgFiles: ['src/assets/img/**/*'],
	jsFiles: ['src/assets/js/**/*.js']
};

gulp.task('default', ['ts', 'sass', 'html', 'watch']);

gulp.task('defaultClean', ['clean'], function () {
	gulp.start('default');
});

gulp.task('clean', function () {
  return del(['dist']);
});

gulp.task('ts', function() {
  var tsProject = ts.createProject({
      "target": "es5",
      "module": "system",
      "moduleResolution": "node",
      "sourceMap": true,
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true,
      "removeComments": false,
      "noImplicitAny": false
    });
  var tsResult = gulp.src(config.tsFiles)
    .pipe(ts(tsProject));
  return tsResult.js
    .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
  gulp.src(config.sassFiles)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/assets'))
		.pipe(browserSync.stream());
});

gulp.task('html', function () {
  gulp.src(config.htmlFiles)
    .pipe(gulp.dest('dist'))
		.pipe(browserSync.stream());
});

gulp.task('watch', ['ts', 'sass', 'html'], function() {  
	gulp.watch(config.sassFiles, ['sass']);
	gulp.watch(config.htmlFiles, ['html']);
	gulp.watch(config.tsFiles, ['ts']).on('change', browserSync.reload);
});

gulp.task('serve', ['defaultClean'], function() {
  browserSync.init({
		open: false,
    server: {
      baseDir: ["./dist", "./"],
      middleware: [historyApiFallback()]
    }
  });
});