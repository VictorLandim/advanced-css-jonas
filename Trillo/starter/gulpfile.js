var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var browserSync = require('browser-sync').create();

const src = {
    css: './css/**/*.css',
    sass: './sass/**/*.sass',
    html: './*.html'
};

const dst = {
    css: './css/',
    dist: './dist/css/'
};

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], () => {
    browserSync.init({
        server: {
            baseDir: ''
        }
    });

    gulp.watch(src.sass, ['sass']);
    gulp.watch(src.html).on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', () =>
    gulp
        .src(src.sass)
        .pipe(sass())
        .pipe(gulp.dest(dst.css))
        .pipe(browserSync.stream())
);

gulp.task('css', () => {
    const plugins = [autoprefixer({ browsers: ['last 5 versions'] }), cssnano()];
    return gulp
        .src(src.css)
        .pipe(postcss(plugins))
        .pipe(gulp.dest(dst.dist));
});

gulp.task('default', ['serve']);
