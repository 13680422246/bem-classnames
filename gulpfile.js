const gulp = require('gulp');
const terser = require('gulp-terser');
const size = require('gulp-size');
const header = require('gulp-header');
const pkg = require('./package.json');
const browserify = require('browserify');
const tsify = require('tsify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const banner = `
/**
* <%= pkg.name %> v<%= pkg.version %>
* Copyright <%= pkg.author %>
* @link https://github.com/13680422246/bem-classnames
* @license <%= pkg.license %>'
*/`.trim();

const handle = (config) => {
	const myBrowserify = browserify({
		entries: config.entry,
		debug: false,
		standalone: config.standalone,
		cache: {},
		packageCache: {},
		plugin: [tsify],
	});
	return myBrowserify
		.transform('babelify')
		.bundle()
		.pipe(source(config.output))
		.pipe(buffer())
		.pipe(header(banner, { pkg }))
		.pipe(terser())
		.pipe(size())
		.pipe(gulp.dest(config.dir));
};

exports.jsx = gulp.series(() =>
	handle({
		entry: './lib/jsx.ts',
		output: 'jsx.js',
		standalone: 'generateBemClassNames',
		dir: './dist/lib',
	})
);
exports.vue = gulp.series(() =>
	handle({
		entry: './lib/vue.ts',
		output: 'vue.js',
		standalone: 'generateBemClassNames',
		dir: './dist/lib',
	})
);
exports.bemClassNames = gulp.series(() =>
	handle({
		entry: './index.ts',
		output: `${pkg.name}.js`,
		standalone: 'bemClassNames',
		dir: './dist',
	})
);
exports.default = gulp.series(this.bemClassNames, this.jsx, this.vue);
