const postcss = require('postcss');
const cssTree = require('css-tree');
const parser = require('./parser');
const keywordVisitor = require('./visitors/keyword');
const hexVisitor = require('./visitors/hex');
const colorFunctionVisitor = require('./visitors/color-function');

module.exports = postcss.plugin('alter-color', options => {
  if (!options || !options.from || !options.to) {
    throw new Error('Required options is missing');
  }

  const initialColor = parser(options.from);
  const finalColor = parser(options.to);

  const boundKeywordVisitor = keywordVisitor(initialColor, finalColor);
  const boundHexVisitor = hexVisitor(initialColor, finalColor);
  const boundColorFunctionVisitor = colorFunctionVisitor(initialColor, finalColor, options.preserveAlphaChannel);

  return root => {
    root.walkDecls(decl => {
      const parsedValue = cssTree.parse(decl.value, {context: 'value'});

      cssTree.walk(parsedValue, {
        visit: 'Identifier',
        enter: boundKeywordVisitor
      });

      cssTree.walk(parsedValue, {
        visit: 'HexColor',
        enter: boundHexVisitor
      });

      cssTree.walk(parsedValue, {
        visit: 'Function',
        enter: boundColorFunctionVisitor
      });

      decl.value = cssTree.generate(parsedValue);
    });
  };
});
