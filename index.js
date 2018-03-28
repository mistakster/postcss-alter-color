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

	// console.log(initialColor);
	// console.log(finalColor);

	return (root, result) => {
		root.walkRules(rule => {
			rule.walkDecls(decl => {
				if (canContainColor(decl.prop)) {
					// const parsedValue = cssTree.parse(decl.value, {context: 'value'});
					// console.log(JSON.stringify(parsedValue));
					// decl.value = cssTree.generate(parsedValue);

					if (decl.value === options.from) {
						decl.value = options.to;
					}

				}
			});
		});
	};
});
