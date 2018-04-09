const postcss = require('postcss');
const cssTree = require('css-tree');
const parser = require('./parser');

/**
 * Compare colors by components
 * @param {Array} nodeColor
 * @param {Array} targetColor
 * @return {boolean}
 */
function compareColors(nodeColor, targetColor) {
  return nodeColor
    .every((c, i) => parseFloat(c.value) === targetColor[i]);
}

function applyColorFunction(node, initialColor, finalColor) {
  const {name} = node;
  const nodeColor = node.children
    .filter(item => item.type === 'Number' || item.type === 'Percentage')
    .toArray();

  if (compareColors(nodeColor, initialColor[name])) {
    nodeColor.forEach((c, i) => c.value = finalColor[name][i]);
  }
}

module.exports = postcss.plugin('alter-color', options => {
  if (!options || !options.from || !options.to) {
    throw new Error('Required options is missing');
  }

  const initialColor = parser(options.from);
  const finalColor = parser(options.to);

  return (root) => {
    root.walkRules(rule => {
      rule.walkDecls(decl => {
        const parsedValue = cssTree.parse(decl.value, {context: 'value'});

        cssTree.walk(parsedValue, {
          visit: 'Identifier',
          enter: function (node, item, list) {
            if (initialColor.keyword && initialColor.keyword === node.name) {
              if (finalColor.keyword) {
                node.name = finalColor.keyword;
              } else {
                list.replace(
                  item,
                  list.createItem({
                    type: 'HexColor',
                    value: finalColor.shortHex || finalColor.hex,
                    loc: node.loc
                  })
                );
              }
            }
          }
        });

        cssTree.walk(parsedValue, {
          visit: 'HexColor',
          enter(node) {
            if (node.value === initialColor.hex) {
              node.value = finalColor.hex;
            } else if (node.value === initialColor.shortHex) {
              node.value = finalColor.shortHex || finalColor.hex;
            }
          }
        });

        cssTree.walk(parsedValue, {
          visit: 'Function',
          enter(node) {
            applyColorFunction(node, initialColor, finalColor);
          }
        });

        decl.value = cssTree.generate(parsedValue);
      });
    });
  };
});
