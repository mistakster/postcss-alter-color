const postcss = require('postcss');
const parseColor = require('parse-color');
const cssTree = require('css-tree');

function canContainColor(prop) {
	return true;
}

module.exports = postcss.plugin('alter-color', options => {
	if (!options || !options.from || !options.to) {
		throw new Error('Required options is missing');
	}

	const initialColor = parseColor(options.from);
	const finalColor = parseColor(options.to);

	// console.log(finalColor);

	return (root, result) => {
		root.walkRules(rule => {
			rule.walkDecls(decl => {
				if (canContainColor(decl.prop)) {
					const parsedValue = cssTree.parse(decl.value, {context: 'value'});
					const typeData = parsedValue.children.head.data.type;
					const typeName = parsedValue.children.head.data.name;
					const typeValue = parsedValue.children.head.data.value;


					console.log(parsedValue.children.tail.data.value);
					console.log(JSON.stringify(parsedValue.children));
					console.log(options.from);
					console.log(options.to);
					console.log(decl.value);

					switch(typeData) {
						case 'Identifier':
							decl.value = options.to;
							break;
						case 'HexColor':
							if(typeValue.length < 4) {
								const minHex = function a(b, c) {
									return ++c ? (('0x' + b) / 17 + .5 | 0).toString(16) : b.replace(/../g, a);
								};
								const outColor = finalColor.hex.slice(1);

								decl.value = `#${minHex(outColor)}`;
							} else {
								decl.value = finalColor.hex;
							}
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
				}
			});
		});
	};
});
