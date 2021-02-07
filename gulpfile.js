const gulp = require("gulp");
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const size = require("gulp-size");
const header = require('gulp-header');
const pkg = require('./package.json')

var banner = `
/**
* <%= pkg.name %> v<%= pkg.version %>
* Copyright <%= pkg.author %>
* @link https://github.com/13680422246/bem-classnames
* @license <%= pkg.license %>'
*/`.trim();

exports.default = gulp.series(() => {
  return gulp
    .src("./index.ts")
    .pipe(babel())
    .pipe(header(banner, { pkg: pkg }))
    .pipe(terser())
    .pipe(size())
    .pipe(gulp.dest("./dist"));
});
