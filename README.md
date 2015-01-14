# gulp-version-append
Gulp plugin to append version from package.json to static file url to avoid caching.

## Pre-requirements
Have `package.json` file in your project root folder with `version` field.

## Usage
In gulp task:
```
...
.pipe(versionAppend(options))
...
```
`options` - is an array of extensions that require version to be appended, e.g. ['html', 'js', 'css']

In html code:
```
<script src="/js/scriptname.js?v=@version@"></script>
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

