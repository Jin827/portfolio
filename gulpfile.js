const gulp = require('gulp'),
// Minification dependencies
      htmlmin = require('gulp-htmlmin'),
      csso = require('gulp-csso'),
      uglify = require('gulp-uglify'),
      imagemin = require('gulp-imagemin'),
      // svgSprite = require('gulp-svg-sprites'),
// Other dependencies
      // filter = require('gulp-filter'),
      // svg2png = require('gulp-svg2png'),
      sourcemaps = require('gulp-sourcemaps'),
      autoprefixer = require('gulp-autoprefixer'),
      pump = require('pump'),
      size = require('gulp-size'),
      notify = require('gulp-notify'),
      browserSync = require('browser-sync').create(),
      livereload = require('gulp-livereload'),
      babel = require('gulp-babel');

      paths = {
        dev: 'development/**/*',
        devHTML: 'development/client/*.html',
        devCSS: {
          srcCSS: 'development/client/resources/css/*.css',
          venCSS: 'development/client/vendors/css/*.css',
        },
        devJS: {
          srcJS: 'development/client/resources/js/*.js',
          venJS: 'development/client/vendors/js/*.js',
          serverJS: 'development/server/*.js'
        },
        devIMG: 'development/client/resources/assets/**/*.{jpeg,JPEG,svg,SVG}'
      };
      dist = 'production/';

gulp.task('images', (cb) => {
  pump([
    gulp.src(paths.devIMG),
    imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin([
        imagemin.svgo({
          plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
          ]
        })
      ])
    ], {
      verbose: true
    }),
    gulp.dest(dist),
    livereload()
  ], cb)
})

// gulp.task('svg', () => {
  // const svgConfig = {
  //   mode: {
  //     symbol: true
  //   },
  //   svg : {
  //     xmlDeclaration: false,
  //     doctypeDeclaration: false,
  //     namespaceIDs: false,
  //     namespaceClassnames: false
  //   }
  // }
  // .pipe(svgSprite(svgConfig))
  // .pipe(gulp.dest(dist + 'images'))
  // .pipe(filter('**/*.svg'))
  // .pipe(svg2png())
  // .pipe(gulp.dest(dist + 'images'))
// })

gulp.task('html', (cb) => {
  const htmlConfig = {
    collapseWhitespace: true,
    minifyJS: true,
    removeComments: true
  }

  pump([
    gulp.src(paths.devHTML),
    htmlmin(htmlConfig),
    gulp.dest(dist),
    livereload()
  ], cb)
});

gulp.task('css', (cb) => {
  const cssConfig = {
    restructure: false,
    sourceMap: true,
    debug: true
  }

  pump([
    gulp.src(paths.devCSS.venCSS),
    gulp.dest(dist + 'css'),
    livereload()
  ], cb)

  pump([
    gulp.src(paths.devCSS.srcCSS),
    sourcemaps.init(),
    autoprefixer('last 2 versions'),
    csso(cssConfig),
    sourcemaps.write('./maps'),
    gulp.dest(dist + 'css'),
    livereload()
  ], cb)
})

gulp.task('javascript', (cb) => {
  pump([
    gulp.src([
      paths.devJS.srcJS,
      paths.devJS.serverJS
    ]),
    sourcemaps.init(),
    babel({presets: ['env']}),
    uglify(),
    sourcemaps.write('./maps'),
    gulp.dest(dist + 'js'),
    livereload()
    ],
    cb
  );

  pump([
    gulp.src(paths.devJS.venJS),
    gulp.dest(dist + 'js'),
    livereload()
    ],
    cb
  );
});

gulp.task('size', (cb) => {
  const s = size({
    showFiles: true,
    pretty: true
  });

  pump([
    gulp.src(dist + '/**/*'),
    s,
    gulp.dest(dist),
    notify({
      onLast: true,
      message: () => `Total size ${s.prettySize}`
    })
  ], cb)
});

/*
'watch is not starting...'
The following tasks did not complete: default, size
Did you forget to signal async completion?
*/
gulp.task('default', gulp.series(gulp.parallel('images', 'html', 'css', 'javascript'), 'size'), () => {});

gulp.task('watch', gulp.series('default'), () => {
  /*  Error: Cannot find module './production/server/index.js' */
  require('./development/server/index.js');
  livereload.listen();
  gulp.watch(paths.devIMG, gulp.series('images'));
  gulp.watch(paths.devHTML, gulp.series('html'));
  gulp.watch([paths.devCSS.srcCSS, paths.devCSS.venCSS], gulp.series('css'));
  gulp.watch([paths.devJS.srcJS, paths.devJS.venJS, paths.devJS.serverJS], gulp.series('javascript'));
});

// browserSync.init({
  //   server: dist
// });
