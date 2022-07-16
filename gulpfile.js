const { src, dest, series, parallel, watch } = require('gulp');
const browserSync = require('browser-sync');
const del = require('del');
// для html
const htmlmin = require('gulp-htmlmin');
// для scss
const sass = require('gulp-sass')(require('sass'));
const autoPrefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');
// для js
const webpackStream = require('webpack-stream');
// для картинок
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');
const gulpIf = require('gulp-if');

// проверка режима разработка/продакшн
const isDev = !process.argv.includes('--build');
const isBuild = process.argv.includes('--build');


function html() {
	return src('src/**.html')
		.pipe(htmlmin({ collapseWhitespace: true, removeComments: true, }))
		.pipe(dest('dist'));
};

function scss() {
	return src('src/**.scss')
		.pipe(sass())
		.pipe(gulpIf(isBuild, autoPrefixer({ grid: true })))
		.pipe(gulpIf(isBuild,
			cleanCss({ level: { 2: { specialComments: 0 } } })))
		.pipe(concat('style.css'))
		.pipe(dest('dist'));
};

function js() {
	return src('src/**.js')
		.pipe(webpackStream({
			mode: isBuild ? 'production' : 'development',
			output: { filename: 'app.min.js' }
		}))
		.pipe(dest('dist'))
};

function images() {
	return src('src/img/*')
		.pipe(newer('dist/img'))
		.pipe(gulpIf(isBuild, imagemin({ optimizationLevel: 3 })))
		.pipe(dest('dist/img'))
};

function JSON() {
	return src('src/*.json')
	.pipe(dest('dist'))
}

function reset() {
	return del('dist');
};

function serve() {
	browserSync.init({
		server: './dist',
		notify: false,
	});

	watch('src/**.html', series(html)).on('change', browserSync.reload);
	watch('src/**.scss', series(scss)).on('change', browserSync.reload);
	watch('src/**.js', series(js)).on('change', browserSync.reload);
};


const mainTasks = parallel(html, scss, js, images, JSON);
exports.dev = series(reset, mainTasks, serve);
exports.build = series(reset, mainTasks);

