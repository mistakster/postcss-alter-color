const postcss = require('postcss');
const alterColorPlugin = require('../index');

describe('Alter Color plugin', () => {

	test('should alter short hex colors', () => {
		return postcss()
			.use(alterColorPlugin({from: 'black', to: 'red'}))
			.process(`div{color:#000}`, {from: undefined})
			.then(result => {
				expect(result.css).toBe(`div{color:#f00}`)
			});
	});

	test('should alter short hex to full hex colors', () => {
		return postcss()
			.use(alterColorPlugin({from: 'black', to: '#ff3fe0'}))
			.process(`div{color:#000}`, {from: undefined})
			.then(result => {
				expect(result.css).toBe(`div{color:#ff3fe0}`)
			});
	});

	test('should alter short hex color in a complex value', () => {
		return postcss()
			.use(alterColorPlugin({from: 'black', to: 'red'}))
			.process(`div{color:#000;border:1px solid #fff;outline:1px solid #000}`, {from: undefined})
			.then(result => {
				expect(result.css).toBe(`div{color:#f00;border:1px solid #fff;outline:1px solid #f00}`)
			});
	});

	test('should alter full hex colors', () => {
		return postcss()
			.use(alterColorPlugin({from: 'black', to: 'red'}))
			.process(`div{color:#000000}`, {from: undefined})
			.then(result => {
				expect(result.css).toBe(`div{color:#ff0000}`)
			});
	});

	test('should alter full hex color in a complex value', () => {
		return postcss()
			.use(alterColorPlugin({from: 'black', to: 'red'}))
			.process(`div{color:#000000;border:1px solid #ffffff;outline:1px solid #000000}`, {from: undefined})
			.then(result => {
				expect(result.css).toBe(`div{color:#ff0000;border:1px solid #ffffff;outline:1px solid #ff0000}`)
			});
	});

});
