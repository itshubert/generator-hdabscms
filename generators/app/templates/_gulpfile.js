"use-strict";
var env = process.env.ENV_STR || 'production';

var gulp = require("gulp"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    del = require("del"),
    plumber = require("gulp-plumber"),
    runSequence = require("run-sequence"),
    ifElse = require('gulp-if-else'),
    htmlmin = require('gulp-htmlmin'),
    debug = require('gulp-debug'),
    ngHtml2Js = require('gulp-ng-html2js'),
    sass = require('gulp-sass'),
    compass = require('gulp-compass'),
    watch = require('gulp-watch'),
    autoprefix = require('gulp-autoprefixer');

var webroot = "./";
var bowerPath = "./bower_components/"
var assets = "./assets/build/";
var assetsCms = "./assetsCms/build/";
var assetSrc = "./assets/src/";
var assetCmsSrc = "./assetsCms/src/";

var paths = {
    src: {
        libJs: [
            bowerPath + "jquery/dist/jquery.min.js",
            bowerPath + "bootstrap/dist/js/bootstrap.min.js",
            bowerPath + "underscore/underscore.js"
        ],
        js: assetSrc + "js/theme/**/*.js",
        angLibJs: [
            bowerPath + "angular/angular.js",
            bowerPath + "angular-route/angular-route.js",
            bowerPath + "textAngular/dist/textAngular-sanitize.min.js",
            bowerPath + "angular-resource/angular-resource.js",
            bowerPath + "angular-ui-router/release/angular-ui-router.js",
            bowerPath + "angular-animate/angular-animate.js",
            bowerPath + "angular-messages/angular-messages.js",
            bowerPath + "angular-aria/angular-aria.js",
            bowerPath + "textAngular/dist/textAngular-rangy.min.js",
            bowerPath + "textAngular/dist/textAngularSetup.js",
            bowerPath + "textAngular/dist/textAngular.min.js"
        ],
        appJs: assetSrc + "js/app/**/*.js",
        appTemplates: assetSrc + "js/app/templates/**/*.html",
        sass: assetSrc + "sass",
        css: assetSrc + "css/**/*.css",
        libCss: [
            bowerPath + "bootstrap/dist/css/bootstrap.min.css",
            bowerPath + "font-awesome/css/font-awesome.css",
            bowerPath + "textAngular/dist/textAngular.css"
        ],
        images: [
			assetSrc + 'images/**/*.jpg',
            assetSrc + 'images/**/*.gif',
			assetSrc + 'images/**/*.png',
            assetSrc + 'images/**/*.svg'
        ],
        fonts: [
			assetSrc + 'fonts/**/*.*',
            bowerPath + 'font-awesome/fonts/**/*.*'
        ],
    },
    dest: {
        libJs: assets + "js/libs.min.js",
        js: assets + "js/scripts.min.js",
        angLibJs: assets + "js/anglib.min.js",
        appJs: assets + "js/app.min.js",
        appTemplates: assets + "js",
        sass: assetSrc + "css",
        libCss: assets + "css/libs.min.css",
        css: assets + "css/styles.min.css",
        images: assets + "images/",
        fonts: assets + "fonts/"
    },
    srcCms: {
        libJs: [
            bowerPath + "jquery/dist/jquery.min.js",
            bowerPath + "bootstrap/dist/js/bootstrap.min.js",
            bowerPath + "underscore/underscore.js"
        ],
        js: assetSrc + "js/theme/**/*.js",
        angLibJs: [
            bowerPath + "angular/angular.js",
            bowerPath + "angular-route/angular-route.js",
            bowerPath + "textAngular/dist/textAngular-sanitize.min.js",
            bowerPath + "angular-resource/angular-resource.js",
            bowerPath + "angular-ui-router/release/angular-ui-router.js",
            bowerPath + "angular-animate/angular-animate.js",
            bowerPath + "angular-messages/angular-messages.js",
            bowerPath + "angular-aria/angular-aria.js",
            bowerPath + "textAngular/dist/textAngular-rangy.min.js",
            bowerPath + "textAngular/dist/textAngularSetup.js",
            bowerPath + "textAngular/dist/textAngular.min.js"
        ],
        appJs: assetCmsSrc + "js/app/**/*.js",
        appTemplates: assetCmsSrc + "js/app/templates/**/*.html",
        sass: assetCmsSrc + "sass",
        css: assetCmsSrc + "css/**/*.css",
        libCss: [
            bowerPath + "bootstrap/dist/css/bootstrap.min.css",
            bowerPath + "font-awesome/css/font-awesome.css",
            bowerPath + "textAngular/dist/textAngular.css"
        ],
        images: [
			assetCmsSrc + 'images/**/*.jpg',
            assetCmsSrc + 'images/**/*.gif',
			assetCmsSrc + 'images/**/*.png',
            assetCmsSrc + 'images/**/*.svg'
        ],
        fonts: [
			assetCmsSrc + 'fonts/**/*.*',
            bowerPath + 'font-awesome/fonts/**/*.*'
        ],
    },
    destCms: {
        libJs: assetsCms + "js/libs.min.js",
        js: assetsCms + "js/scripts.min.js",
        angLibJs: assetsCms + "js/anglib.min.js",
        appJs: assetsCms + "js/app.min.js",
        appTemplates: assetsCms + "js",
        sass: assetCmsSrc + "css",
        libCss: assetsCms + "css/libs.min.css",
        css: assetsCms + "css/styles.min.css",
        images: assetsCms + "images/",
        fonts: assetsCms + "fonts/"
    }
};

/*** FRONTEND ***/
gulp.task('fonts', function (cb) {
    gulp.src(paths.src.fonts)
	.pipe(gulp.dest(paths.dest.fonts));
    cb();
});

gulp.task("images", function (cb) {
    gulp.src(paths.src.images)
    .pipe(gulp.dest(paths.dest.images));
    cb();
});

gulp.task("libJs", function () {
    gulp.src(paths.src.libJs)
    .pipe(plumber())
    .pipe(concat(paths.dest.libJs))
    .pipe(ifElse(env === 'production', uglify))
    .pipe(gulp.dest("."));
});

gulp.task("js", function () {
    gulp.src(paths.src.js)
    .pipe(plumber())
    .pipe(concat(paths.dest.js))
    .pipe(ifElse(env === 'production', uglify))
    .pipe(gulp.dest("."));
});

gulp.task("angLibJs", function () {
    gulp.src(paths.src.angLibJs)
    .pipe(plumber())
    .pipe(concat(paths.dest.angLibJs))
    .pipe(ifElse(env === 'production', uglify))
    .pipe(gulp.dest("."));
});

gulp.task("appJs", function () {
    gulp.src(paths.src.appJs)
    .pipe(plumber())
    .pipe(concat(paths.dest.appJs))
    .pipe(ifElse(env === 'production', uglify))
    .pipe(gulp.dest("."));
});

gulp.task("appTemplates", function () {
    gulp.src(paths.src.appTemplates)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(ngHtml2Js({ moduleName: 'appTemplates' }))
    .pipe(concat("appTemplates.min.js"))
    //.pipe(debug());
    .pipe(gulp.dest(paths.dest.appTemplates));
    //.pipe(ifElse(env === 'production', htmlmin))
});

gulp.task("libCss", function () {
    gulp.src(paths.src.libCss)
    .pipe(plumber())
    .pipe(ifElse(env === 'production', cssmin))
    .pipe(concat(paths.dest.libCss))
    .pipe(gulp.dest("."));
});

gulp.task('sass', function (cb) {
    gulp.src(paths.src.sass)
    .pipe(compass({
        config_file: './config.rb',
        css: paths.dest.sass,
        sass: paths.src.sass,
        showStack: true
    }))
    .on('error', function (error) {
        // Would like to catch the error here
        console.log(error);
        this.emit('end');
    });
    //.pipe(gulp.dest(paths.dest.cmsSass));
    cb();
});

gulp.task("css", function () {
    console.log('env == ' + env);
    gulp.src(paths.src.css)
    .pipe(plumber())
    .pipe(ifElse(env === 'production', cssmin))
    .pipe(concat(paths.dest.css))
    .pipe(gulp.dest("."));
});

gulp.task('watch', function () {
    console.log("Watching for changes...");

    watch(paths.src.sass + '/**/*.scss', function () {
        runSequence(["sass", "css"]);
    });
    watch(paths.src.libCss, function () {
        gulp.start("libCss");
    });
    watch(paths.src.css, function () {
        gulp.start("css");
    });
    watch(paths.src.libJs, function () {
        gulp.start("libJs");
    });
    watch(paths.src.js, function () {
        gulp.start("js");
    });
    watch(paths.src.appJs, function () {
        gulp.start("appJs");
    });
    watch(paths.src.images, function () {
        gulp.start("images");
    });
    watch(paths.src.fonts, function () {
        gulp.start("fonts");
    });
    watch(paths.src.appTemplates, function () {
        gulp.start("appTemplates");
    });

});

/*** CMS ***/
gulp.task('fontsCms', function (cb) {
    gulp.src(paths.srcCms.fonts)
	.pipe(gulp.dest(paths.destCms.fonts));
    cb();
});

gulp.task("imagesCms", function (cb) {
    gulp.src(paths.srcCms.images)
    .pipe(gulp.dest(paths.destCms.images));
    cb();
});


gulp.task("libJsCms", function () {
    gulp.src(paths.srcCms.libJs)
    .pipe(plumber())
    .pipe(concat(paths.destCms.libJs))
    .pipe(ifElse(env === 'production', uglify))
    .pipe(gulp.dest("."));
});

gulp.task("jsCms", function () {
    gulp.src(paths.srcCms.js)
    .pipe(plumber())
    .pipe(concat(paths.destCms.js))
    .pipe(ifElse(env === 'production', uglify))
    .pipe(gulp.dest("."));
});

gulp.task("angLibJsCms", function () {
    gulp.src(paths.srcCms.angLibJs)
    .pipe(plumber())
    .pipe(concat(paths.destCms.angLibJs))
    .pipe(ifElse(env === 'production', uglify))
    .pipe(gulp.dest("."));
});

gulp.task("appJsCms", function () {
    gulp.src(paths.srcCms.appJs)
    .pipe(plumber())
    .pipe(concat(paths.destCms.appJs))
    .pipe(ifElse(env === 'production', uglify))
    .pipe(gulp.dest("."));
});

gulp.task("appTemplatesCms", function () {
    gulp.src(paths.srcCms.appTemplates)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(ngHtml2Js({ moduleName: 'appTemplates' }))
    .pipe(concat("appTemplates.min.js"))
    //.pipe(debug());
    .pipe(gulp.dest(paths.destCms.appTemplates));
    //.pipe(ifElse(env === 'production', htmlmin))
});

gulp.task("libCssCms", function () {
    gulp.src(paths.srcCms.libCss)
    .pipe(plumber())
    .pipe(ifElse(env === 'production', cssmin))
    .pipe(concat(paths.destCms.libCss))
    .pipe(gulp.dest("."));
});

gulp.task('sassCms', function (cb) {
    gulp.src(paths.srcCms.sass)
    .pipe(compass({
        config_file: './config.rb',
        css: paths.destCms.sass,
        sass: paths.srcCms.sass,
        showStack: true
    }))
    .on('error', function (error) {
        // Would like to catch the error here
        console.log(error);
        this.emit('end');
    });
    //.pipe(gulp.dest(paths.destCms.cmsSass));
    cb();
});

gulp.task("cssCms", function () {
    console.log('env == ' + env);
    gulp.src(paths.srcCms.css)
    .pipe(plumber())
    .pipe(ifElse(env === 'production', cssmin))
    .pipe(concat(paths.destCms.css))
    .pipe(gulp.dest("."));
});

gulp.task('watchCms', function () {
    console.log("Watching for changes...");

    watch(paths.srcCms.sass + '/**/*.scss', function () {
        runSequence(["sassCms"]);
    });
    watch(paths.srcCms.libCss, function () {
        gulp.start("libCssCms");
    });
    watch(paths.srcCms.css, function () {
        gulp.start("cssCms");
    });
    watch(paths.srcCms.libJs, function () {
        gulp.start("libJsCms");
    });
    watch(paths.srcCms.js, function () {
        gulp.start("jsCms");
    });
    watch(paths.srcCms.appJs, function () {
        gulp.start("appJsCms");
    });
    watch(paths.srcCms.images, function () {
        gulp.start("imagesCms");
    });
    watch(paths.srcCms.fonts, function () {
        gulp.start("fontsCms");
    });
    watch(paths.srcCms.appTemplates, function () {
        gulp.start("appTemplatesCms");
    });

});



gulp.task("clean", function () {
    return del([
        assets + "js/**/*",
        assetSrc + "css/**/*",
        paths.dest.css,
        paths.dest.libCss,
        paths.dest.libJs,
        paths.dest.images,
        paths.dest.fonts
    ]);
});


//var build = ["fonts", "sass", "libCss", "css", "libJs", "js", "angLibJs", "appJs", "appTemplates"];

var build = ["images", "fonts", "sass", "libCss", "css", "libJs", "js", "angLibJs", "appJs", "appTemplates"];
gulp.task("dev", function () {
    env = "development";
    runSequence(build);
    //runSequence("watch");
    gulp.start("watch");
});

var buildCms = ["imagesCms", "fontsCms", "sassCms", "libCssCms", "cssCms", "libJsCms", "jsCms", "angLibJsCms", "appJsCms", "appTemplatesCms"];
gulp.task("devcms", function () {
    env = "development";
    runSequence(buildCms);
    //runSequence("watch");
    gulp.start("watchCms");
});

gulp.task("default", function () {
    env = "development";
    runSequence(build);
    //runSequence("watch");
    gulp.start("watch");
});