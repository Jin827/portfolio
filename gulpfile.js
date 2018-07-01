const gulp = require('gulp');

// Minification dependencies
const minifyHTML = require('gulp-minify-html');
      csso = require('gulp-csso');
      uglify = require('gulp-uglify-es').default;
      concat = require('gulp-concat');
      imagemin = require('gulp-imagemin');

// Other dependencies
const browserSync = require('browser-sync').create();
      sourcemaps = require('gulp-sourcemaps');
      autoprefixer = require('gulp-autoprefixer');
      pump = require('pump');
      jshint = require('gulp-jshint');
      stylish = require('jshint-stylish');
      size = require('gulp-size');
      notify = require('gulp-notify');
      stripDebug = require('gulp-strip-debug');
      watch = require('gulp-watch');

source = 'development/';
dist = 'production/';

gulp.task('images', () => {
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

  // pump([
  //   gulp.src('client/vendors/js/*.js'),
  //   stripDebug(),
  //   uglify({}),
  //   gulp.dest(dist + 'client/vendors/js')
  //   ],
  //   cb
  // ); 

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

gulp.task('re-load', (done) => {
  browserSync.reload();
  done();
});

gulp.task('watch', () => {
  gulp.watch('client/resources/assets/**/*', gulp.parallel('images', 're-load'));

  gulp
    .watch('client/*.html', gulp.series('html', 're-load'))
    .on('change', (event) => {
      console.log(`File ${event.path} was ${event.type}, running tasks....`);
    });

  gulp.watch("client/resources/css/*.css", gulp.series('css')).on('change', browserSync.reload);

  gulp
    .watch(['client/resources/js/*.js', 'server/*.js'], gulp.series('javascript'))
    .on('change', (event) => {
      console.log(`File ${event.path} was ${event.type}, running tasks....`);
      browserSync.reload();
    });
});

gulp.task('browser-sync', () => {
    browserSync.init({
      server: {
        baseDir: './production'
      }
      // proxy: {
      //   target: 'localhost:8080'
      // }
    })
});

// // Default task (runs at initiation: gulp --verbose)
gulp.task('serve', gulp.series('browser-sync', 'watch'));
gulp.task('default', gulp.series('serve'));
