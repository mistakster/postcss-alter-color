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

module.exports = postcss.plugin('alter-color', options => {
	if (!options || !options.from || !options.to) {
		throw new Error('Required options is missing');
	}

	const initialColor = parseColor(options.from);
	const finalColor = parseColor(options.to);

	return (root, result) => {
		root.walkRules(rule => {
			rule.walkDecls(decl => {
				if (canContainColor(decl.prop)) {
					const parsedValue = cssTree.parse(decl.value, {context: 'value'});

					cssTree.walk(parsedValue, {
						visit: 'Identifier',
						enter(node) {
							if (node.name === initialColor.keyword) {
								node.name = finalColor.keyword;
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

							const colorGenerate = ast.children.reduce((acc, item) => {
								return acc += item.value;
							}, '');

							switch (node.name) {
								case 'rgb':
									if(colorGenerate === initialColor.rgb.toString()) {
										ast.children.map((item, index) => {

											if(index === 0) {
												item.value = finalColor.rgb[0].toString();
											}

											if(index === 2) {
												item.value = finalColor.rgb[1].toString();
											}

											if(index === 4) {
												item.value = finalColor.rgb[2].toString();
											}

											return false;
										});
									}
									break;
								case 'rgba':
									if(colorGenerate === initialColor.rgba.toString()) {
										ast.children.map((item, index) => {
											if (index === 0) {
												item.value = finalColor.rgba[0].toString();
											}

											if (index === 2) {
												item.value = finalColor.rgba[1].toString();
											}

											if (index === 4) {
												item.value = finalColor.rgba[2].toString();
											}

											if (index === 6) {
												item.value = finalColor.rgba[3].toString();
											}

											return false;
										});
									}
									break;
								case 'hsl':
									if(colorGenerate === initialColor.hsl.toString()) {
										ast.children.map((item, index) => {
											if (index === 0) {
												item.value = finalColor.hsl[0].toString();
											}

											if (index === 2) {
												item.value = finalColor.hsl[1].toString();
											}

											if (index === 4) {
												item.value = finalColor.hsl[2].toString();
											}

											return false;
										});
									}
									break;
								case 'hsla':
									if(colorGenerate === initialColor.hsla.toString()) {
										ast.children.map((item, index) => {
											if (index === 0) {
												item.value = finalColor.hsla[0].toString();
											}

											if (index === 2) {
												item.value = finalColor.hsla[1].toString();
											}

											if (index === 4) {
												item.value = finalColor.hsla[2].toString();
											}

											if (index === 6) {
												item.value = finalColor.hsla[3].toString();
											}

											return false;
										});
									}
									break;
								case 'hsv':
									if(colorGenerate === initialColor.hsv.toString()) {
										ast.children.map((item, index) => {
											if (index === 0) {
												item.value = finalColor.hsv[0].toString();
											}

											if (index === 2) {
												item.value = finalColor.hsv[1].toString();
											}

											if (index === 4) {
												item.value = finalColor.hsv[2].toString();
											}

											return false;
										});
									}
									break;
								case 'hsva':
									if(colorGenerate === initialColor.hsva.toString()) {
										ast.children.map((item, index) => {
											if (index === 0) {
												item.value = finalColor.hsva[0].toString();
											}

											if (index === 2) {
												item.value = finalColor.hsva[1].toString();
											}

											if (index === 4) {
												item.value = finalColor.hsva[2].toString();
											}

											if (index === 6) {
												item.value = finalColor.hsva[3].toString();
											}

											return false;
										});
									}
									break;
								case 'cmyk':
									if(colorGenerate === initialColor.cmyk.toString()) {
										ast.children.map((item, index) => {
											if (index === 0) {
												item.value = finalColor.cmyk[0].toString();
											}

											if (index === 2) {
												item.value = finalColor.cmyk[1].toString();
											}

											if (index === 4) {
												item.value = finalColor.cmyk[2].toString();
											}

											if (index === 6) {
												item.value = finalColor.cmyk[3].toString();
											}

											return false;
										});
									}
									break;
								case 'cmyka':
									if(colorGenerate === initialColor.cmyka.toString()) {
										ast.children.map((item, index) => {
											if (index === 0) {
												item.value = finalColor.cmyka[0].toString();
											}

											if (index === 2) {
												item.value = finalColor.cmyka[1].toString();
											}

											if (index === 4) {
												item.value = finalColor.cmyka[2].toString();
											}

											if (index === 6) {
												item.value = finalColor.cmyka[3].toString();
											}

											if (index === 8) {
												item.value = finalColor.cmyka[4].toString();
											}

											return false;
										});
									}
									break;
							}

							return cssTree.fromPlainObject(cssTree.clone(ast));
						}
					});

					decl.value = cssTree.generate(parsedValue);
				}
			});
		});
	};
});
