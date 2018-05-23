import gulp from 'gulp'
import babel from 'gulp-babel'

gulp.task('build', () => {
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist'))
})

gulp.task('watch', ['build'], () => {
    gulp.watch('src/**/*.js', ['build'])
})

gulp.task('default', ['build'])
