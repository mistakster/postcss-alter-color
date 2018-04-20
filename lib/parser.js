const parseColor = require('parse-color');

function removeHashSymbol(hex) {
  return hex ? hex.substring(1) : undefined;
}

function convertToShortHex(hexValue) {
  if (!hexValue) {
    return undefined;
  }

  const [r, rLow, g, gLow, b, bLow] = hexValue;

  if (r !== rLow || g !== gLow || b !== bLow) {
    return undefined;
  }

  return `${r}${g}${b}`;
}

function getColorFormat(color) {
  if (color.indexOf('rgb(') === 0) {
    return 'rgb';
  } else if (color.indexOf('rgba(') === 0) {
    return 'rgba';
  } else if (color.indexOf('hsl(') === 0) {
    return 'hsl';
  } else if (color.indexOf('hsla(') === 0) {
    return 'hsla';
  } else if (color.indexOf('#') === 0) {
    return 'hex';
  } else {
    return 'keyword';
  }
}

module.exports = function parser(color) {
  const {rgb, rgba, hsl, hsla, hex, keyword} = parseColor(color);
  const hexValue = removeHashSymbol(hex);
  const shortHexValue = convertToShortHex(hexValue);
  const colorFormat = getColorFormat(color);

  return {
    rgb,
    rgba,
    hsl,
    hsla,
    keyword,
    hex: hexValue,
    shortHex: shortHexValue,
    colorFormat
  };
};
