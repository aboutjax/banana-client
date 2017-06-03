const gulp        = require('gulp');
const sass        = require('gulp-sass');
const autoprefixer      = require('gulp-autoprefixer');

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src('src/sass/index.scss')
        .pipe(sass({
            includePaths: ['src/sass', 'node_modules'],
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('src'))
});

gulp.task('watch', function() {
  gulp.watch('src/sass/**/*.scss', ['sass']);
})

gulp.task('default', ['sass', 'watch'])
