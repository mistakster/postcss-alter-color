const postcss = require('postcss');
const parseColor = require('parse-color');
const cssTree = require('css-tree');

function canContainColor(prop) {
	return true;
}

function removeHashSymbol(hexValue) {
	return hexValue.substring(1);
}

// "012345" => "024"
// "123456" => "135"
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
							if(node.value.length > 3) {
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

					decl.value = cssTree.generate(parsedValue);


/*

					if (checkIdentifier(type, parsedValue, initialColor)) {
						decl.value = finalColor.keyword;
					} else if (checkHexColor(type, parsedValue, initialColor)) {
						decl.value = finalColor.hex;
					}

*/


/*
					switch(typeData) {
						case 'Identifier':
							decl.value = options.to;
							break;
						case 'HexColor':
							break;
						case 'Function':
							if(typeName === 'rgb') {
								decl.value = `rgb(${finalColor.rgb})`;
							} else if (typeName === 'rgba') {
								decl.value = `rgba(${finalColor.rgba})`;
							}
							break;
						default:
							console.log('Type of undefined');
					}

					console.log(decl.value);
*/
				}
			});
		});
	};
});
