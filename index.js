var gutil = require('gulp-util'),
	appRoot = require('app-root-path'),
	PluginError = gutil.PluginError,
	map = require('event-stream').map;


var defaults = {
	versionRegex: function(extensions) {
		var exts = extensions.join('|'),
			regexString = "(\\.(" + exts + ")\\?v=)(\\@[^\\s>\"\']+?\\@)([\' | \"])";
		return new RegExp(regexString, "ig");
	}
};

var appendVersionPlugin = function(extensions){
	return map(function (file, cb) {
		if (!file) {
			throw new PluginError('gulp-rev-append', 'Missing file option for gulp-rev-append.');
		}
		if (!file.contents) {
			throw new PluginError('gulp-rev-append', 'Missing file.contents required for modifying files using gulp-rev-append.');
		}
		var pJson = appRoot.require('package.json'),
			version = pJson && pJson.version;

		file.contents = file.contents.replace(defaults.versionRegex(extensions), version);
		cb(null, file);
	});
};

module.exports = appendVersionPlugin;

