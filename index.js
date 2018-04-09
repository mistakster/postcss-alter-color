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

function addPercent(finalColorElement) {
	return `${finalColorElement}%`;
}

function arrayEqual(a, b) {
	return !a.find(item => b.indexOf(item) === -1);
}

function changingColorFunction(color, checkedColor, initialColor, finalColor, nameFuncColor) {
	if (arrayEqual(checkedColor, initialColor)) {
		color.children
			.filter(item => item.type === 'Number' || item.type === 'Percentage')
			.forEach((item, index) => {

				if (nameFuncColor === 'hsl' || nameFuncColor === 'hsla') {

					if(index > 2 && index < 3) {
						return item.value = addPercent(finalColor[index]);
					} else {
						return item.value = finalColor[index];
					}

				} else {
					return item.value = finalColor[index];
				}

			});
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

							cssTree.toPlainObject(node);

							const checkedColor = node.children
								.filter(item => item.type === 'Number' || item.type === 'Percentage')
								.map(item => +item.value);

							switch (node.name) {
								case 'rgb':
									changingColorFunction(node, checkedColor, initialColor.rgb, finalColor.rgb);
									break;
								case 'rgba':
									changingColorFunction(node, checkedColor, initialColor.rgba, finalColor.rgba);
									break;
								case 'hsl':
									changingColorFunction(node, checkedColor, initialColor.hsl, finalColor.hsl, 'hsl');
									break;
								case 'hsla':
									changingColorFunction(node, checkedColor, initialColor.hsla, finalColor.hsla, 'hsla');
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
