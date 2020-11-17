const {src,dest,watch,series} = require('gulp');
const htmlclean = require('gulp-htmlclean');
const cleancss = require('gulp-clean-css');
const stripDebug = require('gulp-strip-debug');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
function html(){
  return src('*.html')
  .pipe(htmlclean())
  .pipe(dest('dist/'));

};
function js(){
  return src('js/*')
  .pipe(stripDebug())
  .pipe(uglify())
  .pipe(dest('dist/js/'));
};
function css(){
  return src('*.css')
  .pipe(cleancss())
  .pipe(dest('dist/'));
};
function image(){
  return src('images/*')
  .pipe(imagemin())
  .pipe(dest('dist/images/'))

};

exports.default = series(html,css,js,image)
