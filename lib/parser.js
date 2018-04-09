const parseColor = require('parse-color');

function removeHashSymbol(hex) {
  return hex.substring(1);
}

function convertToShortHex(hexValue) {
  return `${hexValue[0]}${hexValue[2]}${hexValue[4]}`;
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
