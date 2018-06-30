const gulp = require('gulp');

// Minification dependencies
const minifyHTML = require('gulp-minify-html');
const csso = require('gulp-csso');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');

// Other dependencies
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const pump = require('pump');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');
const size = require('gulp-size');
const notify = require('gulp-notify');
const stripDebug = require('gulp-strip-debug');

source = 'development/';
dist = 'production/';

gulp.task('imageoptim', () => {
  gulp.src('client/resources/assets/img/*.{jpeg}')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
    ], {
      verbose: true
    }))
    .pipe(gulp.dest(dist + 'client/resources/assets/img'))

  gulp.src('client/resources/assets/svg/**/*.svg')
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ], {
      verbose: true
    }))
    .pipe(gulp.dest(dist + 'client/resources/assets/svg'))
})

gulp.task('html', () => {
  gulp.src('client/*.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest(dist + 'client'));
});

gulp.task('css', () => {
  gulp.src('client/resources/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(csso({
      restructure: false,
      sourceMap: true,
      debug: true
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(dist + 'client/resources/css'))
  
  gulp.src('client/vendors/css/*.css')
    .pipe(autoprefixer())
    .pipe(csso({
      restructure: false,
      sourceMap: true,
      debug: true
    }))
    .pipe(gulp.dest(dist + 'client/vendors/css'))
})

gulp.task('javascript', (cb) => {
  pump([
    gulp.src('client/resources/js/*.js'),
    sourcemaps.init(),
    stripDebug(),
    uglify(),
    sourcemaps.write('./maps'),
    gulp.dest(dist + 'client/resources/js')
    ],
    cb
  ); 

  pump([
    gulp.src('client/vendors/js/*.js'),
    stripDebug(),
    uglify({}),
    gulp.dest(dist + 'client/vendors/js')
    ],
    cb
  ); 

  pump([
    gulp.src('server/*.js'),
    sourcemaps.init(),
    stripDebug(),
    uglify({}),
    concat('all.js'),
    sourcemaps.write('./maps'),
    gulp.dest(dist + 'server')
    ],
    cb
  ); 
});

// Scans JS files for errors
gulp.task("jshint", () => {
  return gulp.src(['client/resources/js/*.js', 'server/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'), {beep: true});
});

gulp.task('size', () => {
  const s = size({
    showFiles: true, 
    pretty: true
  });

  gulp.src(dist + '/**/*')
    .pipe(s)
    .pipe(gulp.dest(dist))
    .pipe(notify({
      onLast: true,
      message: () => `Total size ${s.prettySize}`
    }))
});

gulp.task('browsersync', () => {
  browserSync.init({
    proxy: {
      target: 'localhost:8080'
    }
  })
})
