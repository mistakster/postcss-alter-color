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

	console.log(finalColor);

	return (root, result) => {
		root.walkRules(rule => {
			rule.walkDecls(decl => {
				if (canContainColor(decl.prop)) {
					const parsedValue = cssTree.parse(decl.value, {context: 'value'});
					const typeData = parsedValue.children.head.data.type;
					const typeName = parsedValue.children.head.data.name;
					decl.value = cssTree.generate(parsedValue);

					switch(typeData) {
						case 'Identifier':
							decl.value = options.to;
							break;
						case 'HexColor':
							decl.value = finalColor.hex;
							break;
						case 'Function':
							if(typeName === 'rgb') {
								decl.value = `rgb(${finalColor.rgb})`;
							} else if (typeName === 'rgba') {
								decl.value = `rgba(${finalColor.rgba})`;
							}
							break;
						default:
							console.log(error);
					}


					console.log('decl.value', decl.value);
					console.log('options.from', options.from);
					console.log('options.to', options.to);
					console.log('parsedValue', JSON.stringify(parsedValue));
					// console.log('finalColor', finalColor);
					console.log('========');



					if(initialColor.keyword === options.from) {
						finalColor.keyword = options.to;
					}


					// if (decl.value === options.from) {
					// 	decl.value = options.to;
					// }

				}
			});
		});
	};
});
