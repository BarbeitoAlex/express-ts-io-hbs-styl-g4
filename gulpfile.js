var gulp = require("gulp");
var nodemon = require("gulp-nodemon");
var ts = require("gulp-typescript");
var sourcemaps = require('gulp-sourcemaps');

// Prepare Typescript configuration
var tsProject = ts.createProject('tsconfig.json');

// Compile Typescript
gulp.task('build', function () {
    return tsProject.src()
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(tsProject()).js
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("dist"));
});

// Build task and Start Nodemon
gulp.task('start', gulp.series('build', function () {
    return nodemon({
        script: 'dist/index.js',
        watch: 'dist'
    });
}));

// Start task and Watch changes for Typescript files and compile
gulp.task('watch', gulp.series('start', function () {
    gulp.watch('src/*.ts')
    .on('change', gulp.series('build'))
    .on('unlink', gulp.series('build'));
}));

// Default
gulp.task('default', gulp.series('watch'));

