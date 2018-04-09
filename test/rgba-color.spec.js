const postcss = require('postcss');
const alterColorPlugin = require('../index');

describe('Alter Color plugin', () => {

	test('should alter rgba colors', () => {
		return postcss()
			.use(alterColorPlugin({from: 'black', to: 'red'}))
			.process(`div{color:rgba(0,0,0,1)}`, {from: undefined})
			.then(result => {
				expect(result.css).toBe(`div{color:rgba(255,0,0,1)}`)
			});
	});

	test('should alter rgba color in a complex value', () => {
		return postcss()
			.use(alterColorPlugin({from: 'black', to: 'red'}))
			.process(`div{color:rgba(0,0,0,1);border:1px solid rgba(255,255,255,1);outline:1px solid rgba(0,0,0,1)}`, {from: undefined})
			.then(result => {
				expect(result.css).toBe(`div{color:rgba(255,0,0,1);border:1px solid rgba(255,255,255,1);outline:1px solid rgba(255,0,0,1)}`)
			});
	});

	test('should alter rgba color and opacity in a complex value', () => {
		return postcss()
			.use(alterColorPlugin({from: 'black', to: 'red'}))
			.process(`div{color:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,1);outline:1px solid rgba(0,0,0,1)}`, {from: undefined})
			.then(result => {
				expect(result.css).toBe(`div{color:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,1);outline:1px solid rgba(255,0,0,1)}`)
			});
	});

});
