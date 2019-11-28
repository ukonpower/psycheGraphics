const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const cssmin = require('gulp-cssmin');
const del = require('del');
const minimist = require('minimist');

const options = minimist(process.argv.slice(2), {
    default: {
        dev: '1',
        P: false,
    }
});

const srcDir = './src/' + options.dev + '/';
const distDir = './docs/' + options.dev  +'/';

gulp.task('webpack',function(){
    let conf = webpackConfig;
    conf.entry.main = srcDir + 'ts/main.ts';
    conf.output.filename = 'script.js';

    if(options.P){
        conf.mode = 'production';
    }

    return webpackStream(conf, webpack).on('error', function (e) {
            this.emit('end');
        })
        .pipe(gulp.dest( distDir + 'js/'))
        .unpipe(browserSync.reload());
});

gulp.task('sass',function(c){
    return gulp.src(srcDir + 'scss/style.scss')
        .pipe(plumber())
        .pipe(autoprefixer())
        .pipe(sass())
        .pipe(cssmin())
        .pipe(gulp.dest( distDir + 'css/'))
        .pipe(browserSync.stream());
});

gulp.task('copy', function(c){
    gulp.src(['./src/html/**/*']).pipe(gulp.dest( './docs/' ));
    gulp.src(['./src/assets/**/*']).pipe(gulp.dest( './assets/' ));
    gulp.src([srcDir + 'html/**/*']).pipe(gulp.dest( distDir + ''));
    gulp.src([srcDir + 'assets/**/*']).pipe(gulp.dest( distDir + 'assets/'));
    browserSync.reload();
    c();
});

gulp.task('browser-sync',function(){
    browserSync.init({
        server: {
            baseDir: 'docs/' + options.dev,
            index: 'index.html'
        },
        notify: false,
        open: true
    });
});

gulp.task('reload',function(){
    browserSync.reload();
})

gulp.task('clean', function(c){
    del([  distDir + '' ], c() );
});

gulp.task('watch',function(){
    gulp.watch(srcDir + 'ts/**/*', gulp.series('webpack'));
    gulp.watch(srcDir + 'scss/*.scss', gulp.task('sass'));
    gulp.watch(srcDir + '/html/**/*', gulp.task('copy'));
    gulp.watch(srcDir + '/assets/**/*', gulp.task('copy'));
    gulp.watch('./src/html/**/*', gulp.task('copy'));
    gulp.watch('./src/assets/**/*', gulp.task('copy'));
});

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel(
        'webpack', 'sass'
    ),
    'copy',
    gulp.parallel('browser-sync', 'watch'),
))