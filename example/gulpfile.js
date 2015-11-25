/**
 * Created by m03geek on 11/25/15.
 */
var gulp = require('../node_modules/gulp');
gVersionAppend = require('../index');

gulp.task('guid', function () {
	return gulp.src('./example.html')
		.pipe(gVersionAppend(['html', 'js', 'css'], {appendType: 'guid'}))
		.pipe(gulp.dest('./build/'));
});
gulp.task('timestamp', function () {
	return gulp.src('./example.html')
			.pipe(gVersionAppend(['html', 'js', 'css'], {appendType: 'timestamp'}))
			.pipe(gulp.dest('./build/'));
});

gulp.task('version', function () {
	return gulp.src('./example.html')
			.pipe(gVersionAppend(['html', 'js', 'css'], {appendType: 'version', versionFile: './example/version.json'}))
			.pipe(gulp.dest('./build/'));
});

gulp.task('default', function () {
	return gulp.src('./example.html')
			.pipe(gVersionAppend(['html', 'js', 'css']))
			.pipe(gulp.dest('./build/'));
});