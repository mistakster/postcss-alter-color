module.exports = (initialColor, finalColor) => (
  (node, item, list) => {
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
);
