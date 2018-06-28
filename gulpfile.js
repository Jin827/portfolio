const gulp = require('gulp');

// Minification dependencies
const minifyHTML = require('gulp-minify-html');
const csso = require('gulp-csso');
const uglify = require('gulp-uglify-es');
// const composer = require('gulp-uglify/composer');
// const uglify = composer(uglifyes, console);
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');

// Other dependencies
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const pump = require('pump');

source = 'client/';
dist = 'production/';

gulp.task('html', function() {
  gulp.src(source + '*.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest(dist + 'client'));
});

gulp.task('css', function() {
  gulp.src(source + 'resources/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(csso({
      restructure: false,
      sourceMap: true,
      debug: true
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dist + 'client/resources/css'))
})

gulp.task('javascript', function (cb) {
  pump([
    gulp.src(source + 'resources/js/*.js'),
    uglify(),
    gulp.dest(dist + 'client/resources/js')
    ],
    cb
  ); 
  // return gulp.src(source + 'resources/js/*.js')
  //   .pipe(uglify())
  //   .pipe(gulp.dest(dist + 'client/resources/js'))
});

// gulp.task('serve', function() {
//   browserSync.init({
//     server: {
//       baseDir: './client'
//     },
//   })
//   // gulp.watch("client/*.html", [html]).on('change', browserSync.reload);
//   // gulp.watch("client/resources/css/*.css", [css]);
//   // gulp.watch('client/resources/js/*.js', [javascript])
  
// })

// gulp.task('default', ['html']);
