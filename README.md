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

## Thanks
Many thanks to @bustardcelly and his gulp-rev-append (https://github.com/bustardcelly/gulp-rev-append/) plugin that was taken as an example for this plugin.
