var gutil = require('gulp-util'),
	appRoot = require('app-root-path'),
	Buffer = require('buffer').Buffer,
	PluginError = gutil.PluginError,
	map = require('event-stream').map,

	defaults = {
		versionRegex: function (extensions) {
			var exts = extensions.join('|'),
				regexString = "(\\.(?:" + exts + ")\\?v=)(\\@version\\@)";
			return new RegExp(regexString, 'ig');
		}
	},
	/**
	 * @class ShortId
	 * @classdesc Short unique id generator
	 * @constructor
	 */
	ShortId = function () {
		var lastTime,
			_self = this;
		/**
		 * Get new pseudo-unique id
		 * @alias next
		 * @returns {string} Unique ID
		 */
		_self.next = function () {
			var d = new Date(),
				date = (d.getTime() - Date.UTC(d.getUTCFullYear(), 0, 1)) * 1000;
			while (lastTime >= date) {
				date++;
			}
			lastTime = date;
			return date.toString(16);
		}
	},
	appendVersionPlugin = function (extensions, options) {
		return map(function (file, cb) {
			var pJson, version, shortId;
			if (!file) {
				throw new PluginError('gulp-rev-append', 'Missing file option for gulp-version-append.');
			}
			if (!file.contents) {
				throw new PluginError('gulp-rev-append', 'Missing file.contents required for modifying files using gulp-rev-append.');
			}

			if (options) {
				if (options.appendType === 'timestamp') {
					version = (new Date()).getTime();
				} else if (options.appendType === 'guid') {
					shortId = new ShortId();
					version = shortId.next();
				}
				else {
					if (options.versionFile) {
						pJson = appRoot.require(options.versionFile)
					} else {
						pJson = appRoot.require('package.json')
					}
					version = pJson && pJson.version;

				}
			} else {
				pJson = appRoot.require('package.json');
				version = pJson && pJson.version;
			}
			file.contents = new Buffer(file.contents.toString().replace(defaults.versionRegex(extensions), '$1' + version));
			cb(null, file);
		});
	};

module.exports = appendVersionPlugin;
