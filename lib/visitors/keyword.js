const createColorNode = require('../helpers/create-color-node');

function isKeyword(color, node) {
  return color.keyword && color.keyword === node.name;
}

module.exports = (initialColor, finalColor) => (
  (node, item, list) => {
    if (isKeyword(initialColor, node)) {
      list.replace(
        item,
        list.createItem(
          createColorNode(finalColor, node.loc)
        )
      );
    }
  }
);
