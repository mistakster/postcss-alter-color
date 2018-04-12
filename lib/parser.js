const parseColor = require('parse-color');

function removeHashSymbol(hex) {
  return hex.substring(1);
}

function convertToShortHex(hexValue) {
  const [r, rLow, g, gLow, b, bLow] = hexValue;

  if (r !== rLow || g !== gLow || b !== bLow) {
    return undefined;
  }

  return `${r}${g}${b}`;
}

module.exports = function parser(color) {
  const {rgb, rgba, hsl, hsla, hex, keyword} = parseColor(color);
  const hexValue = removeHashSymbol(hex);
  const shortHexValue = convertToShortHex(hexValue);

  return {
    rgb,
    rgba,
    hsl,
    hsla,
    keyword,
    hex: hexValue,
    shortHex: shortHexValue
  };
};
