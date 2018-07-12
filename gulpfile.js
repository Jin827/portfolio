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
	devHTML: 'development/client/*.html',
	devCSS: 'development/client/resources/css/*.css',
	devJS: 'development/**/*js',
	devIMG: 'production/client/resources/assets/**/*.{png,jpeg,jpg,svg,gif}',
	devSVG: 'production/client/resources/assets/svg/**/*.{svg}',

	dist: 'production/',
	distHTML: 'production/client/',
	distCSS: 'production/client/resources/css/',
	distJS: 'production/',
	distIMG: 'production/client/resources/assets/img/',
	distSVG: 'production/client/resources/assets/svg/'
};

gulp.task('images', (cb) => {
	pump([
		gulp.src(paths.devIMG),
		imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.jpegtran(),
			imagemin.optipng({optimizationLevel: 5}),
			imagemin([
				imagemin.svgo({
					plugins: [
						{removeViewBox: true},
						{cleanupIDs: false}
					]
				})
			]),
			imageminJpegRecompress(),
			imageminPngquant()
		], {
			verbose: true
		}),
		gulp.dest('production/img'),
		livereload()
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
		livereload()
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
		livereload()
	], cb);
});

gulp.task('javascript', (cb) => {

	pump([
		gulp.src(
			paths.devJS
		),
		sourcemaps.init(),
		babel({presets: ['env']}),
		uglify(),
		sourcemaps.write('./maps'),
		gulp.dest(paths.distJS),
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
		gulp.src(paths.dist + '**/*'),
		s,
		gulp.dest(paths.dist)
	], cb);
});

gulp.task('clean', () => {
	return del([ paths.dist ]);
});

gulp.task('default', gulp.series('clean', gulp.parallel('images', 'html', 'css', 'javascript'), 'size'));

gulp.task('just-watch',() => {
	livereload.listen();
	gulp.watch([paths.devIMG, paths.devSVG], gulp.series('images'));
	gulp.watch(paths.devHTML, gulp.series('html'));
	gulp.watch(paths.devCSS.srcCSS, gulp.series('css'));
	gulp.watch(paths.devJS, gulp.series('javascript'));
});

gulp.task('watch', gulp.series('default', 'just-watch'));

