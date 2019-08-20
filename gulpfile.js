"use strict";
var gulp = require("gulp"),
  plumber = require("gulp-plumber"),
  sourcemap = require("gulp-sourcemaps"),
  sass = require("gulp-sass"),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  cssDeclarationSorter = require('css-declaration-sorter'),
  server = require("browser-sync").create(),
  csso = require("gulp-csso"),
  rename = require("gulp-rename"),
  imagemin = require("gulp-imagemin"),
  webp = require("gulp-webp"),
  svgostore = require("gulp-svgstore"),
  posthtml = require("gulp-posthtml"),
  include = require("posthtml-include"),
  del = require("del"),
  htmlmin = require("gulp-htmlmin"),
  uglify = require("gulp-uglify");
/**
 * Для начальной разработки
 */
gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});
gulp.task("server", function () {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/*.html").on("change", server.reload);
});
gulp.task("start", gulp.series("css", "server"));

/**
 * Для конечной обработки
 */
// gulp.task("clean", function () {
//   return del("build/")
// })
// gulp.task("copy", function () {
//   return gulp.src([
//     "source/fonts/**/*.{woff,woff2}",
//     "source/img/**",
//     "source/js/**",
//     "source/*.ico"], {
//       base: "source/"
//     })
//     .pipe(gulp.dest("build/"));
// });
// gulp.task("images", function () {
//   return gulp.src("build/img/**/*.{png,jpg,svg}")
//     .pipe(imagemin([
//       imagemin.optipng({ optimizationLevel: 3 }),
//       imagemin.jpegtran({ progressive: true }),
//       imagemin.svgo()
//     ]))
//     .pipe(gulp.dest("build/img/"));
// });
// gulp.task("webp", function () {
//   return gulp.src("build/img/**/*.{png,jpg}")
//     .pipe(webp({ quality: 90 }))
//     .pipe(gulp.dest("build/img/"));
// });
// gulp.task("css", function () {
//   return gulp.src("source/sass/style.scss")
//     .pipe(plumber())
//     .pipe(sourcemap.init())
//     .pipe(sass())
//     .pipe(postcss([
//       autoprefixer(),
//       cssDeclarationSorter({ order: 'concentric-css' })
//     ]))
//     .pipe(csso())
//     .pipe(rename("style.min.css"))
//     .pipe(sourcemap.write("."))
//     .pipe(gulp.dest("build/css"))
//     .pipe(server.stream());
// });
// gulp.task("sprite", function () {
//   return gulp.src("build/img/icon-*.svg")
//     .pipe(svgostore({
//       inlineSvg: true
//     }))
//     .pipe(rename("sprite.svg"))
//     .pipe(gulp.dest("build/img/"));
// });
// gulp.task("html", function () {
//   return gulp.src("source/*.html")
//     .pipe(posthtml([
//       include()]))
//     .pipe(htmlmin({
//       collapseWhitespace: true
//     }))
//     .pipe((gulp.dest("build/")));
// });
// gulp.task("jsmin", function () {
//   return gulp.src("build/js/**/*.js")
//     .pipe(uglify())
//     .pipe(rename(function (path) {
//       path.basename += ".min";
//     }))
//     .pipe(gulp.dest("build/js"))
// })
// gulp.task("reload", function (done) {
//   server.reload();
//   done();
// })
// gulp.task("server", function () {
//   server.init({
//     server: "build/",
//     notify: false,
//     open: true,
//     cors: true,
//     ui: false
//   });
//   gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
//   gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html", "reload"));
//   gulp.watch("source/*.html").on("change", server.reload);
// });
// gulp.task("build", gulp.series(
//   "clean",
//   "copy",
//   "images",
//   "webp",
//   "css",
//   "sprite",
//   "html",
//   "jsmin"
//   )
// );
// gulp.task("start", gulp.series("build", "server"));
