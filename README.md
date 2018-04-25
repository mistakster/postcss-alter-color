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
  from: 'darkslategray',
  to: '#556832'
};

postcss()
  .use(alterColorPlugin(config))
```

Input CSS:

```css
body {
  background: white;
  color: darkslategray;
}
p {
  color: #2f4f4f;
}
.quote {
  border-left: 1px solid rgb(47, 79, 79);
  border-right: solid hsl(180, 25%, 25%) 1px;
}
```

Output CSS:

```css
body {
  background: white;
  color: #556832;
}
p {
  color: #556832;
}
.quote {
  border-left: 1px solid #556832;
  border-right: solid #556832 1px;
}
```

## License

MIT
