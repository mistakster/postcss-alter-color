# postcss-alter-color

[![Build Status](https://travis-ci.org/mistakster/postcss-alter-color.svg?branch=master)](https://travis-ci.org/mistakster/postcss-alter-color)

A [PostCSS](https://github.com/postcss/postcss) plugin to replace one color with another color.

## Install

```
npm install --save postcss-alter-color
```

## Usage

```js
const postcss = require('postcss');
const alterColorPlugin = require('postcss-alter-color');

const config = {
  from: 'black',
  to: '#556832'
};

postcss()
  .use(alterColorPlugin(config))
```

Input CSS:

```css
body {
  color: white;
  background: black;
}
.quote {
  border: 1px solid #000;
}
```

Output CSS:

```css
body {
  color: white;
  background: #556832;
}
.quote {
  border: 1px solid #556832;
}
```

## License

MIT
