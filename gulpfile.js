var gulp = require("gulp");
var nodemon = require("gulp-nodemon");
var ts = require("gulp-typescript");
var stylus = require("gulp-stylus");
var sourcemaps = require('gulp-sourcemaps');

// Prepare Typescript configuration
var tsProject = ts.createProject('tsconfig.json');

// Compile Typescript
gulp.task('tsc', function () {
    return tsProject.src()
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(tsProject()).js
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("dist"));
});

// Compile Stylus
gulp.task('stylus', function () {
    return gulp.src('style/main.styl')
        .pipe(stylus({
            compress: true
        }))
        .pipe(gulp.dest('public/resource/css'));
});

// Build
gulp.task('build', gulp.parallel('tsc', 'stylus'));

// Watch changes for Typescript and Stylus files and compile
gulp.task('watch', gulp.series('build', function () {
    gulp.watch('src/**/*.ts')
        .on('change', gulp.series('tsc'))
        .on('unlink', gulp.series('tsc'));
    gulp.watch('style/main.styl')
        .on('change', gulp.series('stylus'));
}));

// Build task and Start Nodemon
gulp.task('start', gulp.series('build', function () {
    return nodemon({
        script: 'dist/index.js',
        watch: ['src/*.*', 'style/main.styl'],
        tasks: 'build'
    });
}));

// Default
gulp.task('default', gulp.series('start'));