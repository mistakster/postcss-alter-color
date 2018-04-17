const postcss = require('postcss');
const cssTree = require('css-tree');
const parser = require('./parser');
const keywordVisitor = require('./visitors/keyword');
const hexVisitor = require('./visitors/hex');
const functionVisitor = require('./visitors/function');

module.exports = postcss.plugin('alter-color', options => {
  if (!options || !options.from || !options.to) {
    throw new Error('Required options is missing');
  }

  const initialColor = parser(options.from);
  const finalColor = parser(options.to);

  const boundKeywordVisitor = keywordVisitor(initialColor, finalColor);
  const boundHexVisitor = hexVisitor(initialColor, finalColor);
  const boundFunctionVisitor = functionVisitor(initialColor, finalColor, options.preserveAlphaChannel);

  return (root) => {
    root.walkRules(rule => {
      rule.walkDecls(decl => {
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
          enter: boundFunctionVisitor
        });

        decl.value = cssTree.generate(parsedValue);
      });
    });
  };
});
