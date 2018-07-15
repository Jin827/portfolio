const gulp = require('gulp');
// Minification dependencies
const htmlmin = require('gulp-htmlmin');
const csso = require('gulp-csso');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const imageminPngquant = require('imagemin-pngquant');
// svgSprite = require('gulp-svg-sprites');

// Other dependencies
// filter = require('gulp-filter');
// svg2png = require('gulp-svg2png');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const pump = require('pump');
const size = require('gulp-size');
// const browserSync = require('browser-sync').create();
const livereload = require('gulp-livereload');
const babel = require('gulp-babel');
const del = require('del');


// File path
const paths = {
    devHTML: 'src/server/**/*.html',
    devCSS: 'src/client/resources/css/**/*.css',
    devJS: 'src/client/resources/js/**/*js',
    devIMG: 'src/client/resources/assets/img/**/*.{png,jpeg,jpg,gif}',
    devSVG: 'src/client/resources/assets/svg/**/*.svg',
    devServerjs: 'src/server/**/*.js',
    dist: 'production/',
    distHTML: 'production/server',
    distCSS: 'production/client/resources/css/',
    distJS: 'production/client/resources/js',
    distIMG: 'production/client/resources/assets/img',
    distSVG: 'production/client/resources/assets/svg',
    distServerjs: 'production/server'
};

gulp.task('images', (cb) => {
    pump([
        gulp.src(paths.devIMG),
        imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.jpegtran(),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin([
                imagemin.svgo({
                    plugins: [
                        { removeViewBox: true },
                        { cleanupIDs: false }
                    ]
                })
            ]),
            imageminJpegRecompress(),
            imageminPngquant()
        ], {
                verbose: true
            }),
        gulp.dest(paths.distIMG),
    ], cb);
});


gulp.task('svg', (cb) => {
    pump([
        gulp.src(paths.devSVG),
        imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.jpegtran(),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin([
                imagemin.svgo({
                    plugins: [
                        { removeViewBox: true },
                        { cleanupIDs: false }
                    ]
                })
            ]),
            imageminJpegRecompress(),
            imageminPngquant()
        ], {
                verbose: true
            }),
        gulp.dest(paths.distSVG),
    ], cb);
});

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
    };

    pump([
        gulp.src(paths.devHTML),
        htmlmin(htmlConfig),
        gulp.dest(paths.distHTML),
    ], cb);
});

gulp.task('css', (cb) => {
    const cssConfig = {
        restructure: false,
        sourceMap: true,
        debug: true
    };

    pump([
        gulp.src(paths.devCSS),
        sourcemaps.init(),
        autoprefixer('last 2 versions'),
        csso(cssConfig),
        sourcemaps.write('./maps'),
        gulp.dest(paths.distCSS),
    ], cb);
});

gulp.task('javascript', (cb) => {

    pump([
        gulp.src(
            paths.devJS
        ),
        sourcemaps.init(),
        babel({ presets: ['env'] }),
        uglify(),
        sourcemaps.write('./maps'),
        gulp.dest(paths.distJS),
    ],
        cb
    );
});


gulp.task('serverJs', (cb) => {

    pump([
        gulp.src(
            paths.devServerjs
        ),
        sourcemaps.init(),
        babel({ presets: ['env'] }),
        uglify(),
        sourcemaps.write('./maps'),
        gulp.dest(paths.distServerjs),
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
        gulp.src(paths.dist + '**/*'),
        s,
        gulp.dest(paths.dist)
    ], cb);
});

gulp.task('clean', () => {
    return del([paths.dist]);
});

gulp.task('default', gulp.series('clean', gulp.parallel('images', 'svg', 'html', 'css', 'javascript', 'serverJs'), 'size'));

gulp.task('reload', (cb) => {
    pump([
        // dummy stream as pump requires two streams and also livereload is a stream
        gulp.src(paths.devHTML),
        livereload()
    ], cb)
})

// You don't need just-watch script anymore
// because you don't have to build each time for production as it is unnecessary
gulp.task('watch', () => {
    livereload.listen();
    gulp.watch([paths.devIMG, paths.devSVG,
    paths.devHTML,
    paths.devCSS,
    paths.devJS], gulp.series("reload"))
});
