# gulp-version-append
[![npm version](https://badge.fury.io/js/gulp-version-append.svg)](http://badge.fury.io/js/gulp-version-append)
[![Dependency Status](https://david-dm.org/SkeLLLa/gulp-version-append.svg)](https://david-dm.org/SkeLLLa/gulp-version-append)

Gulp plugin to append version from package.json to static file url to avoid caching.

## Pre-requirements
Have `package.json` file in your project root folder with `version` field.

## Usage
In gulp task:
```
var versionAppend = require('gulp-version-append');

...
.pipe(versionAppend(extensionsArray[, options]))
...
```
`extensionsArray` - is an array of extensions that require version to be appended, e.g. ['html', 'js', 'css']
`options` - optional config object for custom params.
`options.versionFile` - path to json file that contains version in case you're need to use different file instead of package.json (path should be relative to application root folder)
`options.appendType` - override appending version with timestamp or short "guid" based on date (actually it's a date that counted from the beginning of current year in HEX). Possible values 'version','timestamp','guid', defaults to 'version'

In html code:
```
<script src="/js/scriptname.js?v=@version@"></script>
```
package.json:
```
{
  "name": "my-app",
  "version": "0.0.1"
}
```
result:
```
<script src="/js/scriptname.js?v=0.0.1"></script>
```


## Example
```
var gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),
	path = require('path');

gulp.task('html', function(){
    return gulp.src(path.join(__dirname, '*.html'))
		  .pipe($.versionAppend(['html', 'js', 'css']))
		  .pipe($.minifyHtml());
});
```
```
/// version.json:
{
	"version": "0.0.1"
}

/// gulpfile.js: 
var gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),
	path = require('path');

gulp.task('html', function(){
    return gulp.src(path.join(__dirname, '*.html'))
		  .pipe($.versionAppend(['html', 'js', 'css'], {appendType: 'guid', versionFile: 'version.json'}))
		  .pipe($.minifyHtml());
});
```

## Thanks
Many thanks to @bustardcelly and his gulp-rev-append (https://github.com/bustardcelly/gulp-rev-append/) plugin that was taken as an example for this plugin.

### Another plugin? Why?
* gulp-rev-append plugin is very good and in some cases even better, because it relies on file hash, so if file didn't changed between versions, the hash will remain the same so file can stay in cache. But in my case all files are concatenated to sevral files, so changing one file will cause change in big file. So in 95% cases file will change on version update. That's why I've wrote this plugin, which is slightly faster than gulp-rev-append because it not read files and not calculates their hash.
* gulp-css-urlversion and it's analogues are limited to one static file type, but I need one unified plugin that could append version everywhere: in html, js, css, etc.
* gulp-ver - very good plugin, but it rename files instead of appending query param. This is good practice in some cases, but not mine. I've tried to make my plugin simple as a pie, with minimum code modifications, renames, etc.
* also I use angular and have a lot of stuff that needs version appending in js source code, but many plugins are limited and replace only usual url, that start with e.g. 'src=/js/myjs.js?rev='. My plugin relies only on file extensions and special "template": `.<file_extension>?v=@version@`.
