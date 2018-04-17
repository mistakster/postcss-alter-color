const postcss = require('postcss');
const cssTree = require('css-tree');
const parser = require('./parser');

/**
 * Compare colors by components
 * @param {Array} nodeColor
 * @param {Array} targetColor
 * @param {Boolean} preserveAlphaChannel
 * @return {Boolean}
 */
function compareColors(nodeColor, targetColor, preserveAlphaChannel) {
  const skipLastComponent = nodeColor.length === 4 && preserveAlphaChannel;

  return nodeColor
    .every((c, i) => (
      i < nodeColor.length - 1 || !skipLastComponent ? parseFloat(c.value) === targetColor[i] : true
    ));
}

/**
 * Replace color components
 * @param {Array} nodeColor
 * @param {Array} targetColor
 * @param {boolean} preserveAlphaChannel
 */
function replaceColor(nodeColor, targetColor, preserveAlphaChannel) {
  const skipLastComponent = nodeColor.length === 4 && preserveAlphaChannel;

  nodeColor
    .forEach((c, i) => {
      if (i < nodeColor.length - 1 || !skipLastComponent) {
        c.value = targetColor[i];
      }
    });
}

function applyColorFunction(node, initialColor, finalColor, preserveAlphaChannel) {
  const {name} = node;
  const nodeColor = node.children
    .filter(item => item.type === 'Number' || item.type === 'Percentage')
    .toArray();

  if (compareColors(nodeColor, initialColor[name], preserveAlphaChannel)) {
    replaceColor(nodeColor, finalColor[name], preserveAlphaChannel);
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
            applyColorFunction(node, initialColor, finalColor, options.preserveAlphaChannel);
          }
        });

        decl.value = cssTree.generate(parsedValue);
      });
    });
  };
});
