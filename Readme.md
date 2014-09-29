# CSSComb cut-media-query plugin

Plugin for csscomb core for cutting out media queries. (Special for Vasia)

Enable this plugin in a way standart for csscomb (see csscomb-with-media-cut-example.js) and configure it
with a string of css conditions (comma-separated) in media queries, which you would like to be cutted out of resulting/processed css.

Rules inside of each corresponding media query would be fully cutted out.

# Example

Processor
```javascript
var CuttingCssComb = require('./csscomb-with-media-cut-example');
var cssComb = new CuttingCssComb({ 'cut-media-queries': 'min-width:100px,min-height:100px' });

cssComb.processDirectory('test');

```

Pre-css
```css
@media (min-width:100px) and (min-height:100px) {
	.t {
		top:0;
		content: "@test";
	}
}

@media (min-width:700px) {
	.t {
		top:0;
		content: "@test";
	}
}

.z {
	display: table-row-group;
}
```

Post-css
```css
@media (min-width:700px) {
	.t {
		top:0;
		content: "@test";
	}
}

.z {
	display: table-row-group;
}
```
