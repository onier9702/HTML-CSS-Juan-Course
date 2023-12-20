const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
// import * as imagemin from "gulp-imagemin";
const webp = require('gulp-webp');


function css(done) {

    // Compile SASS
    src('src/scss/app.scss')
        // .pipe(sass({outputStyle: 'compressed'}))
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(dest('build/css'));

    done();
}

function imgs() {
    return src('src/img/**/*', imgs)
        .pipe(imagemin({optimizationLevel: 3}))
        .pipe(dest('build/img'));
}

function versionWebp() {
    return src('src/img/**/*.{jpg,png}')
        .pipe(webp())
        .pipe(dest('build/img'));
}

function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imgs);
}

exports.css = css;
exports.dev = dev;
exports.versionWebp = versionWebp;
exports.imgs = imgs;
exports.default = series( imgs, versionWebp, css, dev );
