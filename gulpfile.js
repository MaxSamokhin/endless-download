const gulp = require('gulp');
const rename = require('gulp-rename');
const less = require('gulp-less');

const paths = {
    INDEX_HTML: 'src/index.html',
    JSON_DATA: 'src/article.json',
    DIST: 'dist',
    LESS: 'src/assets/style/main.less',
    LESS_ALL: 'src/**/*.less',
};

gulp.task('html', done => {
    gulp.src([paths.INDEX_HTML, paths.JSON_DATA])
        .pipe(rename({
            dirname: ''
        }))
        .pipe(gulp.dest(paths.DIST));
    done();
});

gulp.task('less', done => {
    gulp.src(paths.LESS)
        .pipe(less())
        .pipe(gulp.dest(paths.DIST));
    done();
});

gulp.task('static',  gulp.series ('html', 'less'));
