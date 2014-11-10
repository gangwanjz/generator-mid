'use strict';
var gulp = require('gulp'),
    imagemin = require("gulp-imagemin"),
    minifycss = require('gulp-minify-css'),//css压缩
    htmlmin = require('gulp-htmlmin'),
    uglify = require("gulp-uglify"),//js 压缩
    jshint = require('gulp-jshint'),//js 检测
    //rename = require('gulp-rename'),//rename 引用中没有替换。。
    clean = require('gulp-clean');

var paths = {
    elementsHtml:["app/elements/**/*.html","!app/elements/**/index.html","!app/elements/**/demo.html"],
    elementsCss:["app/elements/**/*.css"],
    elementsJs:["app/elements/**/*.js"],
    buildElementsPath:"build/element",
    buildPath:'build',
    buildImagesPath:'build/images',
    images:"[app/images/**/*]"
}
//polymer 组件处理 把elements中除index.html、demo.html的html、css、js文件复制压缩后发布到新的目录中去
gulp.task('elements',function(){
    //html处理
    gulp.src(paths.elementsHtml)
        .pipe(htmlmin({collapseWhitespace: true,removeComments:true,minifyJS:true,minifyCSS:true}))
        .pipe(gulp.dest(paths.buildElementsPath));
    //css处理
    gulp.src(paths.elementsCss)
//        .pipe(rename({suffix:'.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest(paths.buildElementsPath));
    //js处理
    gulp.src(paths.elementsJs)
        .pipe(jshint('.jshintrc'))
//        .pipe(rename({suffix:'.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(paths.buildElementsPath));
});
//压缩图片
gulp.task('images',function(){
    gulp.src(paths.images)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.buildImagesPath));
});
//clean
gulp.task('clean',function(){
    gulp.src([paths.buildPath],{read:false})
        .pipe(clean());
});
//watch
gulp.task('watch',function(){
    gulp.watch(paths.elementsHtml,function(){
        gulp.run('elements');
    });
    gulp.watch(paths.elementsCss,function(){
        gulp.run('elements');
    });
    gulp.watch(paths.elementsJs,function(){
        gulp.run('elements');
    });
    gulp.watch(paths.images,function(){
        gulp.run('images');
    });
});

//运行gulp指令时默认 跑的任务
gulp.task('default',['clean'],function(){
    gulp.start('elements');
});

