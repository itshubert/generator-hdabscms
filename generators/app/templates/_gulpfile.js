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
var assetSrc = "./assets/src/";
var cmsAssetSrc = "./assets/cmssrc/"

var paths = {
    srcFE: {
        libJs: [
            bowerPath + "jquery/dist/jquery.min.js",
            bowerPath + "bootstrap/dist/js/bootstrap.min.js",
            bowerPath + "underscore/underscore.js"
        ],
        js: assetSrc + "js/theme/**/*.js",
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
        ]
    },
    srcCMS: {
        libJs: [
            bowerPath + "jquery/dist/jquery.min.js",
            bowerPath + "bootstrap/dist/js/bootstrap.min.js",
            bowerPath + "underscore/underscore.js"
        ],
        js: cmsAssetSrc + "js/theme/**/*.js",
        appJs: cmsAssetSrc + "js/app/**/*.js",
        appTemplates: cmsAssetSrc + "js/app/templates/**/*.html",
        sass: cmsAssetSrc + "sass",
        css: cmsAssetSrc + "css/**/*.css",
        libCss: [
            bowerPath + "bootstrap/dist/css/bootstrap.min.css",
            bowerPath + "font-awesome/css/font-awesome.css",
            bowerPath + "textAngular/dist/textAngular.css"
        ],
        images: [
			cmsAssetSrc + 'images/**/*.jpg',
            cmsAssetSrc + 'images/**/*.gif',
			cmsAssetSrc + 'images/**/*.png',
            cmsAssetSrc + 'images/**/*.svg'
        ],
        fonts: [
			cmsAssetSrc + 'fonts/**/*.*'
        ]
    },
    angLibJs: [
        bowerPath + "angular/angular.js",
        bowerPath + "angular-route/angular-route.js",
        bowerPath + "textAngular/dist/textAngular-sanitize.min.js",
        //bowerPath + "angular-sanitize/angular-sanitize.js",
        bowerPath + "angular-resource/angular-resource.js",
        bowerPath + "angular-ui-router/release/angular-ui-router.js",
        bowerPath + "angular-animate/angular-animate.js",
        bowerPath + "angular-messages/angular-messages.js",
        bowerPath + "angular-aria/angular-aria.js",
        bowerPath + "textAngular/dist/textAngular-rangy.min.js",
        bowerPath + "textAngular/dist/textAngularSetup.js",
        bowerPath + "textAngular/dist/textAngular.min.js"
    ],
    dest: {
        angLibJs: assets + "js/anglib.min.js",
    },
    destFE: {
        libJs: assets + "js/libs.min.js",
        js: assets + "js/fe.min.js",
        appJs: assets + "js/app.min.js",
        appTemplates: assets + "js",
        sass: assetSrc + "css",
        libCss: assets + "css/libs.min.css",
        css: assets + "css/styles.min.css",
        images: assets + "images/",
        fonts: assets + "fonts/"
    },
    destCMS: {
        libJs: assets + "js/cmslibs.min.js",
        js: assets + "js/cms.min.js",
        appJs: assets + "js/cmsapp.min.js",
        appTemplates: assets + "js",
        sass: assetSrc + "cmscss",
        libCss: assets + "css/cmslibs.min.css",
        css: assets + "css/cmsstyles.min.css",
        images: assets + "images/",
        fonts: assets + "fonts/"
    }
};

gulp.task('feFonts', function (cb) {
    gulp.src(paths.srcFE.fonts)
	.pipe(gulp.dest(paths.destFE.fonts));
    cb();
});

/***** FE ******/
gulp.task("feImages", function (cb) {
    gulp.src(paths.srcFE.images)
    .pipe(gulp.dest(paths.destFE.images));
    cb();
});

gulp.task("feLibJs", function () {
    gulp.src(paths.srcFE.libJs)
    .pipe(plumber())
    .pipe(concat(paths.destFE.libJs))
    .pipe(ifElse(env === 'production', uglify))
    .pipe(gulp.dest("."));
});

gulp.task("feJs", function () {
    gulp.src(paths.srcFE.js)
    .pipe(plumber())
    .pipe(concat(paths.destFE.js))
    .pipe(ifElse(env === 'production', uglify))
    .pipe(gulp.dest("."));
});

gulp.task("angLibJs", function () {
    gulp.src(paths.angLibJs)
    .pipe(plumber())
    .pipe(concat(paths.dest.angLibJs))
    .pipe(ifElse(env === 'production', uglify))
    .pipe(gulp.dest("."));
});

gulp.task("feAppJs", function () {
    gulp.src(paths.srcFE.appJs)
    .pipe(plumber())
    .pipe(concat(paths.destFE.appJs))
    .pipe(ifElse(env === 'production', uglify))
    .pipe(gulp.dest("."));
});

gulp.task("feAppTemplates", function () {
    gulp.src(paths.srcFE.appTemplates)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(ngHtml2Js({ moduleName: 'appTemplates' }))
    .pipe(concat("appTemplates.min.js"))
    .pipe(gulp.dest(paths.destFE.appTemplates));
});

gulp.task("feLibCss", function () {
    gulp.src(paths.srcFE.libCss)
    .pipe(plumber())
    .pipe(ifElse(env === 'production', cssmin))
    .pipe(concat(paths.destFE.libCss))
    .pipe(gulp.dest("."));
});

gulp.task('feSass', function (cb) {
    gulp.src(paths.srcFE.sass)
    .pipe(compass({
        config_file: './config.rb',
        css: paths.destFE.sass,
        sass: paths.srcFE.sass,
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

gulp.task("feCss", function () {
    console.log('env == ' + env);
    gulp.src(paths.srcFE.css)
    .pipe(plumber())
    .pipe(ifElse(env === 'production', cssmin))
    .pipe(concat(paths.destFE.css))
    .pipe(gulp.dest("."));
});

/***** CMS ******/
gulp.task("cmsImages", function (cb) {
    gulp.src(paths.srcCMS.images)
    .pipe(gulp.dest(paths.destCMS.images));
    cb();
});

gulp.task("cmsLibJs", function () {
    gulp.src(paths.srcCMS.libJs)
    .pipe(plumber())
    .pipe(concat(paths.destCMS.libJs))
    .pipe(ifElse(env === 'production', uglify))
    .pipe(gulp.dest("."));
});

gulp.task("cmsJs", function () {
    gulp.src(paths.srcCMS.js)
    .pipe(plumber())
    .pipe(concat(paths.destCMS.js))
    .pipe(ifElse(env === 'production', uglify))
    .pipe(gulp.dest("."));
});

gulp.task("cmsAppJs", function () {
    gulp.src(paths.srcCMS.appJs)
    .pipe(plumber())
    .pipe(concat(paths.destCMS.appJs))
    .pipe(ifElse(env === 'production', uglify))
    .pipe(gulp.dest("."));
});

gulp.task("cmsAppTemplates", function () {
    gulp.src(paths.srcCMS.appTemplates)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(ngHtml2Js({ moduleName: 'appTemplates' }))
    .pipe(concat("cmsappTemplates.min.js"))
    .pipe(gulp.dest(paths.destCMS.appTemplates));
});

gulp.task("cmsLibCss", function () {
    gulp.src(paths.srcCMS.libCss)
    .pipe(plumber())
    .pipe(ifElse(env === 'production', cssmin))
    .pipe(concat(paths.destCMS.libCss))
    .pipe(gulp.dest("."));
});

gulp.task('cmsSass', function (cb) {
    gulp.src(paths.srcCMS.sass)
    .pipe(compass({
        config_file: './cmsconfig.rb',
        css: paths.destCMS.sass,
        sass: paths.srcCMS.sass,
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

gulp.task("cmsCss", function () {
    console.log('env == ' + env);
    gulp.src(paths.srccmssrc.css)
    .pipe(plumber())
    .pipe(ifElse(env === 'production', cssmin))
    .pipe(concat(paths.destcmssrc.css))
    .pipe(gulp.dest("."));
});


gulp.task("clean", function () {
    return del([
        assets + "js/**/*",
        assetSrc + "css/**/*",
        paths.destFE.css,
        paths.destFE.libCss,
        paths.destFE.libJs,
        paths.destFE.images,
        paths.destFE.fonts,
        paths.destCMS.css,
        paths.destCMS.libCss,
        paths.destCMS.libJs,
        paths.destCMS.images,
        paths.destCMS.fonts
    ]);
});


gulp.task('watch', function () {
    console.log("Watching for changes...");

    watch(paths.srcFE.sass + '/**/*.scss', function () {
        runSequence(["sass", "css"]);
    });
    watch(paths.srcFE.libCss, function () {
        gulp.start("libCss");
    });
    watch(paths.srcFE.css, function () {
        gulp.start("css");
    });
    watch(paths.srcFE.libJs, function () {
        gulp.start("libJs");
    });
    watch(paths.srcFE.js, function () {
        gulp.start("js");
    });
    watch(paths.srcFE.appJs, function () {
        gulp.start("appJs");
    });
    watch(paths.srcFE.images, function () {
        gulp.start("images");
    });
    watch(paths.srcFE.fonts, function () {
        gulp.start("fonts");
    });
    watch(paths.srcFE.appTemplates, function () {
        gulp.start("appTemplates");
    });

});


var buildFE = ["feImages", "feFonts", "feSass", "feLibCss", "feCss", "feLibJs", "feJs", "angLibJs", "feAppJs", "feAppTemplates"];
gulp.task("default", function () {
    env = "development";
    runSequence(build);
    //runSequence("watch");
    gulp.start("watch");
});

