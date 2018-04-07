const postcss = require('postcss');
const parseColor = require('parse-color');
const cssTree = require('css-tree');

function canContainColor(prop) {
	return true;
}

function removeHashSymbol(hexValue) {
	return hexValue.substring(1);
}

function convertToShortHex(hexValue) {
	return `${hexValue[0]}${hexValue[2]}${hexValue[4]}`;
}

function changingColorFunction(color, checkedColor, initialColor, finalColor) {
	if (checkedColor === initialColor.toString()) {
		color.children
			.filter(item => item.type === 'Number')
			.forEach((item, index) => item.value = finalColor[index]);
	}
}

module.exports = postcss.plugin('alter-color', options => {
	if (!options || !options.from || !options.to) {
		throw new Error('Required options is missing');
	}

	const initialColor = parseColor(options.from);
	const finalColor = parseColor(options.to);

	return (root) => {
		root.walkRules(rule => {
			rule.walkDecls(decl => {
				if (canContainColor(decl.prop)) {
					const parsedValue = cssTree.parse(decl.value, {context: 'value'});

					cssTree.walk(parsedValue, {
						visit: 'Identifier',
						enter(node) {
							if (node.name === initialColor.keyword) {
								if (finalColor.keyword === undefined) {
									node.name = finalColor.hex;
								} else {
									node.name = finalColor.keyword;
								}
							}
						}
					});

					cssTree.walk(parsedValue, {
						visit: 'HexColor',
						enter(node) {
							if (node.value.length > 3) {
								if (node.value === removeHashSymbol(initialColor.hex)) {
									node.value = removeHashSymbol(finalColor.hex);
								}
							} else {
								if (node.value === convertToShortHex(removeHashSymbol(initialColor.hex))) {
									node.value = convertToShortHex(removeHashSymbol(finalColor.hex));
								}
							}
						}
					});

					cssTree.walk(parsedValue, {
						visit: 'Function',
						enter(node) {

							const ast = cssTree.toPlainObject(node);

							const checkedColor = ast.children.reduce((color, item) => {
								return color += item.value;
							}, '');

							switch (node.name) {
								case 'rgb':
									changingColorFunction(ast, checkedColor, initialColor.rgb, finalColor.rgb);
									break;
								case 'rgba':
									changingColorFunction(ast, checkedColor, initialColor.rgba, finalColor.rgba);
									break;
								case 'hsl':
									changingColorFunction(ast, checkedColor, initialColor.hsl, finalColor.hsl);
									break;
								case 'hsla':
									changingColorFunction(ast, checkedColor, initialColor.hsla, finalColor.hsla);
									break;
								case 'hsv':
									changingColorFunction(ast, checkedColor, initialColor.hsv, finalColor.hsv);
									break;
								case 'hsva':
									changingColorFunction(ast, checkedColor, initialColor.hsva, finalColor.hsva);
									break;
								case 'cmyk':
									changingColorFunction(ast, checkedColor, initialColor.cmyk, finalColor.cmyk);
									break;
								case 'cmyka':
									changingColorFunction(ast, checkedColor, initialColor.cmyka, finalColor.cmyka);
									break;
							}
						}
					});

					decl.value = cssTree.generate(parsedValue);
				}
			});
		});
	};
});
