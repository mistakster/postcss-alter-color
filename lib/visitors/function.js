const createColorNode = require('../helpers/create-color-node');
const setAlphaChannel = require('../helpers/set-alpha-channel');

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

function getAlpha(nodeColor) {
  return nodeColor.length === 4 ? parseFloat(nodeColor[3].value) : 1;
}

module.exports = (initialColor, finalColor, preserveAlphaChannel) => (
  (node, item, list) => {
    const {name} = node;
    const nodeColor = node.children
      .filter(item => item.type === 'Number' || item.type === 'Percentage')
      .toArray();

    if (compareColors(nodeColor, initialColor[name], preserveAlphaChannel)) {
      list.replace(
        item,
        list.createItem(
          createColorNode(
            preserveAlphaChannel ? setAlphaChannel(finalColor, getAlpha(nodeColor)) : finalColor,
            node.loc
          )
        )
      );
    }
  }
);
