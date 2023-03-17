const { watch, series, src, dest } = require('gulp')
const browserSync = require('browser-sync').create()
const postcss = require('gulp-postcss')
const imagemin = require('gulp-imagemin')

// Task for compiling our CSS files using PostCSS
function cssTask(cb) {
  return src('./src/*.css')
    .pipe(postcss())
    .pipe(dest('./assets/css'))
    .pipe(browserSync.stream())
  cb()
}

// Task for minifying images
function imageminTask(cb) {
  return src('./images/*').pipe(imagemin()).pipe(dest('./images'))
  cb()
}

// Serve from browserSync server
function browsersyncServer(cb) {
  browserSync.init({
    server: {
      baseDir: './',
    },
  })
  cb()
}

function browsersyncReload(cb) {
  browserSync.reload()
  cb()
}

// Watch Files & Reload browser after tasks
function watchTask() {
  watch(['./src/*.css', './index.html'], series(cssTask, browsersyncReload))
}

// Default Gulp Task
exports.default = series(cssTask, browsersyncServer, watchTask)
exports.css = cssTask
exports.images = imageminTask