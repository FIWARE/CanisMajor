import gulp from 'gulp';
import process from 'process';
import truncateTables from './tests/helpers/truncate-tables';
import migrateTables from './tests/helpers/migrations';
import loadFixtures from './tests/helpers/load-fixtures';

gulp.task('initialize-fixtures', () => {
  return truncateTables()
    .then(() => {
      return loadFixtures();
    })
    .catch(err => {
      console.log('ERROR: ', err);
    });
});

gulp.task('truncate-database', () => {
  return truncateTables();
});

gulp.task('load-fixtures', function() {
  return loadFixtures();
});

gulp.on('stop', () => {
  process.exit(0);
});
