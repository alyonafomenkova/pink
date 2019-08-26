"use strict";

var gulp = require("gulp"); // сам сборщик
var sass = require("gulp-sass"); // преобразует контент из sass в css
var plumber = require("gulp-plumber"); // показывает ошибки в консоли и продолжает выполнение потока (не останавливает выполнение скрипта)
var postcss = require("gulp-postcss"); // плагин для преобразования сss
var posthtml = require("gulp-posthtml"); // парсер HTML
var autoprefixer = require("autoprefixer"); // автопрефексер, работает в потоке postcss
var server = require("browser-sync").create(); // автоматически перезагружает страницу
var del = require("del"); // плагин для удаления файлов и папок
var rename = require("gulp-rename"); // плагин для переименования файлов
var svgstore = require("gulp-svgstore"); // сборщик спрайтов
var csso = require("gulp-csso"); // минификатор css
var imagemin = require("gulp-imagemin"); // сжатие графики без потерь
var webp = require("gulp-webp"); // конвертирует графику в формат webp
var include = require("posthtml-include"); // плагин для posthtml, позволяет использовать <include> в HTML
var w3cjs = require("gulp-w3cjs"); // валидатор HTML
var htmlmin = require("gulp-htmlmin"); // минификатор HTML
var uglify = require("gulp-uglify"); // минификатор JS
var concat = require("gulp-concat"); // плагин для объединения файлов

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/*",
    "!source/img/sprite",
    "source/js/**",
    "source/*.html"
  ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("webp", function () {
  return gulp.src([
    "source/img/bg-map-*.{png,jpg}",
    "source/img/photo-*.{png,jpg}",
    "source/img/panorama-*.{png,jpg}"])
    .pipe(webp({quality: 70}))
    .pipe(gulp.dest("source/img"));
});

gulp.task("sprite", function () {
  return gulp.src([
    "source/img/sprite/icon-editor-*.svg",
    "source/img/sprite/icon-menu-*.svg",
    "source/img/sprite/logo-*.svg",
  ])
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task('w3cjs', function () {
  return gulp.src("source/*.html")
    .pipe(w3cjs())
    .pipe(w3cjs.reporter());
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include(),
    ]))
    .pipe(htmlmin({
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      removeEmptyAttributes: true
    }))
    .pipe(rename(function (path) {
      path.basename += ".min";
    }))
    .pipe(gulp.dest("build"));
});

gulp.task("js", function () {
  return gulp.src("source/js/*.js")
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(rename("main.min.js"))
    .pipe(gulp.dest("build/js"))
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "sprite",
  "w3cjs",
  "html",
  "js"
));

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/img/sprite/*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/js/*.js", gulp.series("js", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("start", gulp.series("build", "server"));

// npmx gulp images и npmx gulp webp запускать локально, чтобы не увеличивать время сборки каждый раз
