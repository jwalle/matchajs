const gulp = require('gulp');

const plugins = require('gulp-load-plugins')({
  'config': require('./package.json'),
  'pattern': ['*'],
  'scope': ['devDependencies']
});

gulp.task('default', (cb) => {
  gulp.src('./src/styles/*.*')
    .pipe(gulp.dest('./public/styles/'));

  gulp.src('./src/index.html')
    .pipe(gulp.dest('./public/'));

  return gulp.src(plugins.mainBowerFiles(), {
    'base': 'bower_components'
  }).pipe(gulp.dest('./public/vendors/'));
});
