const createColorNode = require('../helpers/create-color-node');

function isShortHex(color, node) {
  return color.shortHex && node.value === color.shortHex;
}

function isHex(color, node) {
  return color.hex && node.value === color.hex;
}

module.exports = (initialColor, finalColor) => (
  (node, item, list) => {
    if (isHex(initialColor, node) || isShortHex(initialColor, node)) {
      list.replace(
        item,
        list.createItem(
          createColorNode(finalColor, node.loc)
        )
      );
    }
  }
);
