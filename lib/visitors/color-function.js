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
      i >= nodeColor.length - 1 && skipLastComponent ? true : c === targetColor[i]
    ));
}

function getFinalColor(nodeColor, finalColor, preserveAlphaChannel) {
  if (!preserveAlphaChannel) {
    return finalColor;
  }

  return setAlphaChannel(
    finalColor,
    nodeColor.length === 4 ? nodeColor[3] : 1
  );
}

function hasSupport(name) {
  return name === 'rgb' || name === 'rgba' || name === 'hsl' || name === 'hsla';
}

module.exports = (initialColor, finalColor, preserveAlphaChannel) => (
  (node, item, list) => {
    const {name} = node;

    if (!hasSupport(name)) {
      return;
    }

    const nodeColor = node.children
      .filter(item => item.type === 'Number' || item.type === 'Percentage')
      .map(item => parseFloat(item.value))
      .toArray();

    if (compareColors(nodeColor, initialColor[name], preserveAlphaChannel)) {
      list.replace(
        item,
        list.createItem(
          createColorNode(
            getFinalColor(nodeColor, finalColor, preserveAlphaChannel),
            node.loc
          )
        )
      );
    }
  }
);
