const postcss = require('postcss');
const parseColor = require('parse-color');
const cssTree = require('css-tree');

function canContainColor(prop) {
  return true;
}

function removeHashSymbol(hexValue) {
  return hexValue.substring(1);
}

function convertToShortHex(hexValue) {
  return `${hexValue[0]}${hexValue[2]}${hexValue[4]}`;
}

function isColorEqual(nodeColor, targetColor) {
  return nodeColor
    .every((c, i) => parseFloat(c.value) === targetColor[i]);
}

function applyColorFunction(node, initialColor, finalColor, alphaChannel) {
  const {name} = node;
  const nodeColor = node.children
    .filter(item => item.type === 'Number' || item.type === 'Percentage')
    .toArray();

  const cloneNodeColor = [...nodeColor];
  const sliceNodeColor = cloneNodeColor.slice(0, 3);
  const sliceInitialColor = initialColor[name].slice(0, 3);

  if (!alphaChannel && isColorEqual(nodeColor, initialColor[name])) {
    nodeColor.forEach((c, i) => c.value = finalColor[name][i]);
  } else if(alphaChannel && isColorEqual(sliceNodeColor, sliceInitialColor)) {
    nodeColor.forEach((c, i, a) => {
      if(a[a.length - 1] !== c) c.value = finalColor[name][i];
    });
  }
}

module.exports = postcss.plugin('alter-color', options => {
  if (!options || !options.from || !options.to) {
    throw new Error('Required options is missing');
  }

  const initialColor = parseColor(options.from);
  const finalColor = parseColor(options.to);
  const alphaChannel = options.alphaChannel;

  return (root) => {
    root.walkRules(rule => {
      rule.walkDecls(decl => {
        if (canContainColor(decl.prop)) {
          const parsedValue = cssTree.parse(decl.value, {context: 'value'});

          cssTree.walk(parsedValue, {
            visit: 'Identifier',
            enter: function (node) {
              if (node.name === initialColor.keyword) {
                node.name = finalColor.keyword ? finalColor.keyword : finalColor.hex;
              }
            }
          });

          cssTree.walk(parsedValue, {
            visit: 'HexColor',
            enter(node) {
              if (node.value.length > 3) {
                if (node.value === removeHashSymbol(initialColor.hex)) {
                  node.value = removeHashSymbol(finalColor.hex);
                }
              } else {
                if (options.to.length > 3) {
                  node.value = removeHashSymbol(finalColor.hex);
                } else if (node.value === convertToShortHex(removeHashSymbol(initialColor.hex))) {
                  node.value = convertToShortHex(removeHashSymbol(finalColor.hex));
                }
              }
            }
          });

          cssTree.walk(parsedValue, {
            visit: 'Function',
            enter(node) {
              applyColorFunction(node, initialColor, finalColor, alphaChannel);
            }
          });

          decl.value = cssTree.generate(parsedValue);
        }
      });
    });
  };
});
