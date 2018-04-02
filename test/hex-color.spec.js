const postcss = require('postcss');
const alterColorPlugin = require('../index');

describe('Alter Color plugin', () => {

	test('should alter hex colors', () => {
		return postcss()
			.use(alterColorPlugin({from: 'black', to: 'red'}))
			.process(`div{color:#000}`, {from: undefined})
			.then(result => {
				expect(result.css).toBe(`div{color:#f00}`)
			});
	});

	test('should alter hex full colors', () => {
		return postcss()
			.use(alterColorPlugin({from: 'black', to: 'red'}))
			.process(`div{color:#000000}`, {from: undefined})
			.then(result => {
				expect(result.css).toBe(`div{color:#ff0000}`)
			});
	});
});
