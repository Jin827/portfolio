const gulp = require('gulp'),
// Minification dependencies
      htmlmin = require('gulp-htmlmin'),
      csso = require('gulp-csso'),
      uglify = require('gulp-uglify-es').default,
      imagemin = require('gulp-imagemin'),
      svgSprite = require('gulp-svg-sprites'),
// Other dependencies
      filter = require('gulp-filter'),
      svg2png = require('gulp-svg2png'),
      sourcemaps = require('gulp-sourcemaps'),
      autoprefixer = require('gulp-autoprefixer'),
      pump = require('pump'),
      jshint = require('gulp-jshint'),
      stylish = require('jshint-stylish'),
      size = require('gulp-size'),
      notify = require('gulp-notify'),
      stripDebug = require('gulp-strip-debug'),
      watch = require('gulp-watch'),
      browserSync = require('browser-sync').create(),
      reload = browserSync.reload,
      rev = require('gulp-rev'),
      revReplace = require('gulp-rev-replace'),
      revDel = require('rev-del'),
      
      limbo = 'limbo/',
      source = 'development/',
      dest = 'production/';

function errorLog(error) {
  console.error.bind(error);
  this.emit('end');
}

gulp.task('images', () => {
  const svgConfig = { 
    mode: {
      symbol: true
    },
    svg : {
      xmlDeclaration: false,
      doctypeDeclaration: false,
      namespaceIDs: false,
      namespaceClassnames: false
    }
  }
  gulp.src(source + 'client/resources/assets/img/*.{jpeg,JPEG}')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
    ], {
      verbose: true
    }))
    .pipe(gulp.dest(dest))

  gulp.src(source + 'client/resources/assets/svg/**/*.svg')
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
    // .pipe(svgSprite(svgConfig))
    // .pipe(gulp.dest(dest))
    // .pipe(filter('**/*.svg'))
    // .pipe(svg2png())
    // .pipe(gulp.dest(dest))
})

gulp.task('html', () => {
  const htmlConfig = {
    collapseWhitespace: true,
    minifyJS: true,
    removeComments: true
  }

  gulp.src(source + 'client/*.html')
    .pipe(htmlmin(htmlConfig))
    .on('error', errorLog)
    .pipe(gulp.dest(limbo));
});

gulp.task('css', () => {
  const cssConfig = {
    restructure: false,
    sourceMap: true,
    debug: true 
  }

  gulp.src(source + 'client/resources/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(csso(cssConfig))
    .pipe(sourcemaps.write('./maps'))
    .on('error', errorLog)
    .pipe(gulp.dest(limbo))
    .pipe(reload({stream: true}))

  gulp.src(source + 'client/vendors/css/*.css')
    .pipe(autoprefixer())
    .pipe(csso({
      restructure: false,
      sourceMap: true,
      debug: true
    }))
    .pipe(gulp.dest(limbo))

})

// Scans JS files for errors
gulp.task("jshint", () => {
  return gulp.src([source + 'client/resources/js/*.js', source + 'server/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'), {beep: true});
});

gulp.task('javascript', (cb) => {
  pump([
    gulp.src(source + 'client/resources/js/*.js'),
    sourcemaps.init(),
    stripDebug(),
    uglify(),
    sourcemaps.write('./maps'),
    gulp.dest(limbo)
    ],
    cb
  ); 

  pump([
    gulp.src(source + 'server/*.js'),
    sourcemaps.init(),
    stripDebug(),
    uglify({}),
    sourcemaps.write('./maps'),
    gulp.dest(limbo)
    ],
    cb
  ); 

  pump([
    gulp.src('client/vendors/js/*.js'),
    stripDebug(),
    uglify({}),
    gulp.dest(limbo)
    ],
    cb
  ); 
});

// Rename assets based on content cache
gulp.task('revision', gulp.parallel('html','css','javascript'), () => {
  return gulp.src(limbo + '**/*.{js,css}')
  .pipe(rev())
  .pipe(gulp.dest(dest))
  .pipe(rev.manifest())
  .pipe(revDel({dest: dest}))
  .pipe(gulp.dest(dest));
});

// Replace URLs with hashed ones based on rev manifest.
// Runs immediately after revision:
gulp.task('revreplace', gulp.series('revision'), () => {
  const manifest = gulp.src(dest + 'rev-manifest.json');

  return gulp.src(limbo + '**/*.html')
  .pipe(revReplace({manifest: manifest}))
  .pipe(gulp.dest(dest));
});

gulp.task('size', () => {
  const s = size({
    showFiles: true, 
    pretty: true
  });

  gulp.src(dest + '/**/*')
    .pipe(s)
    .pipe(gulp.dest(dest))
    .pipe(notify({
      onLast: true,
      message: () => `Total size ${s.prettySize}`
    }))
});

gulp.task('watch', () => {
  gulp.watch(source + '**/*.{html, css, js}', gulp.series('revreplace'), reload)
      .on('change', (event) => {
        console.log(`File ${event.path} was ${event.type}, running tasks....`);
      });
  gulp.watch(source + 'client/resources/assets/**/*', gulp.series('images'), reload);

});

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: dest
    }
    // proxy: {
    //   target: 'localhost:8080'
    // }
  })
});

// // Default task (runs at initiation: gulp --verbose)
gulp.task('serve', gulp.parallel('images', 'revreplace', 'size', 'watch', 'browser-sync'));
gulp.task('default', gulp.series('serve'));
