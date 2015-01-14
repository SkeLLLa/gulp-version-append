var gutil = require('gulp-util'),
	appRoot = require('app-root-path'),
	Buffer = require('buffer').Buffer,
	PluginError = gutil.PluginError,
	map = require('event-stream').map;

var defaults = {
	versionRegex: function (extensions) {
		var exts = extensions.join('|'),
			regexString = "(\\.(?:" + exts + ")\\?v=)(\\@version\\@)([\' | \"])";
		return new RegExp(regexString, "ig");
	}
};

var appendVersionPlugin = function (extensions) {
	return map(function (file, cb) {
		if (!file) {
			throw new PluginError('gulp-rev-append', 'Missing file option for gulp-version-append.');
		}
		if (!file.contents) {
			throw new PluginError('gulp-rev-append', 'Missing file.contents required for modifying files using gulp-rev-append.');
		}
		var pJson = appRoot.require('package.json'),
			version = pJson && pJson.version;
		file.contents = new Buffer(file.contents.toString().replace(defaults.versionRegex(extensions), "$1" + version + "$3"));
		cb(null, file);
	});
};

module.exports = appendVersionPlugin;

