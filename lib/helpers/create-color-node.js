const cssTree = require('css-tree');

function createNode(color) {
  switch (color.colorFormat) {
    case 'hex':
      return {
        type: 'HexColor',
        value: color.shortHex || color.hex
      };
    case 'rgb':
      return {
        type: 'Function',
        name: 'rgb',
        children: [
          {type: 'Number', value: color.rgb[0]},
          {type: 'Operator', 'value': ','},
          {type: 'Number', value: color.rgb[1]},
          {type: 'Operator', 'value': ','},
          {type: 'Number', value: color.rgb[2]}
        ]
      };
    case 'rgba':
      return {
        type: 'Function',
        name: 'rgba',
        children: [
          {type: 'Number', value: color.rgba[0]},
          {type: 'Operator', 'value': ','},
          {type: 'Number', value: color.rgba[1]},
          {type: 'Operator', 'value': ','},
          {type: 'Number', value: color.rgba[2]},
          {type: 'Operator', 'value': ','},
          {type: 'Number', value: color.rgba[3]}
        ]
      };
    case 'hsl':
      return {
        type: 'Function',
        name: 'hsl',
        children: [
          {type: 'Number', value: color.hsl[0]},
          {type: 'Operator', 'value': ','},
          {type: 'Percentage', value: color.hsl[1]},
          {type: 'Operator', 'value': ','},
          {type: 'Percentage', value: color.hsl[2]}
        ]
      };
    case 'hsla':
      return {
        type: 'Function',
        name: 'hsla',
        children: [
          {type: 'Number', value: color.hsla[0]},
          {type: 'Operator', 'value': ','},
          {type: 'Percentage', value: color.hsla[1]},
          {type: 'Operator', 'value': ','},
          {type: 'Percentage', value: color.hsla[2]},
          {type: 'Operator', 'value': ','},
          {type: 'Number', value: color.hsla[3]}
        ]
      };
    default:
      return {
        type: 'Identifier',
        name: color.keyword,
      };
  }
}

module.exports = function (color, loc) {
  return cssTree.fromPlainObject(
    Object.assign({loc}, createNode(color))
  );
};
