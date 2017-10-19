# babel-plugin-minify-template-strings

Removes whitespace (indentation and newline characters) from multiline template strings. Works with both tabs and spaces.

## Installation

```
$ npm install babel babel-plugin-minify-template-strings
$ babel --plugins minify-template-strings script.js
```

### Babel v6

v2.x.x of this plugin is required. Older versions are not compatible with Babel v6.

## Usage

Leading/Trailing whitespace and newlines characters will be removed from all strings tagged with `html` tag (you can also use `html` as a function, if you need to use your own tag).

```js
expect(html`Line #1
	Line #2
	Line #3`).to.equal('Line #1Line #2Line #3');

// Escaped characters are ignored.
expect(
	html`
	\tLine #1
	\tLine #2
	\tLine #3
	`
).to.equal('Line #1Line #2Line #3');
```
