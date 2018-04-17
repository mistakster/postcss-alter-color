module.exports = (initialColor, finalColor) => (
  (node) => {
    if (node.value === initialColor.hex) {
      node.value = finalColor.hex;
    } else if (node.value === initialColor.shortHex) {
      node.value = finalColor.shortHex || finalColor.hex;
    }
  }
);
