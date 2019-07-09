"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var posthtml = require("gulp-posthtml");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var del = require("del");
var rename = require("gulp-rename");
var svgstore = require("gulp-svgstore");
var csso = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var htmlmin = require("gulp-htmlmin");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/*",
    //"!source/img/sprite",
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
    "source/img/map*.jpg",
    "source/img/photo*.jpg",
    "source/img/triple*.jpg",
    "source/img/video*.jpg"
  ])
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("source/img"));
});

/*gulp.task("sprite", function () {
  return gulp.src([
    "source/img/sprite/search-icon.svg",
    "source/img/sprite/basket-icon.svg",
    "source/img/sprite/interior-icon.svg",
    "source/img/sprite/toys-icon.svg",
    "source/img/sprite/icon-left-arrow.svg",
    "source/img/sprite/icon-right-arrow.svg",
    "source/img/sprite/logo-footer.svg",
    "source/img/sprite/icon-instagram.svg",
    "source/img/sprite/icon-fb.svg",
    "source/img/sprite/icon-twitter.svg",
    "source/img/sprite/htmlacademy.svg",
    "source/img/sprite/icon-phone.svg",
    "source/img/sprite/icon-mail.svg"
  ])
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});*/

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
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
  //"sprite",
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
  //gulp.watch("source/img/sprite/*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/js/*.js", gulp.series("js", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("start", gulp.series("build", "server"));
