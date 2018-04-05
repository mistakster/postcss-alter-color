const postcss = require('postcss');
const alterColorPlugin = require('../index');

describe('Alter Color plugin', () => {

	test('should alter cmyka colors', () => {
		return postcss()
			.use(alterColorPlugin({from: 'black', to: 'red'}))
			.process(`div{color:cmyka(0,0,0,100,1)}`, {from: undefined})
			.then(result => {
				expect(result.css).toBe(`div{color:cmyka(0,100,100,0,1)}`)
			});
	});

	test('should alter cmyka color in a complex value', () => {
		return postcss()
			.use(alterColorPlugin({from: 'black', to: 'red'}))
			.process(`div{color:cmyka(0,0,0,100,1);border:1px solid cmyka(0,0,0,1,1);outline:1px solid cmyka(0,0,0,100,1)}`, {from: undefined})
			.then(result => {
				expect(result.css).toBe(`div{color:cmyka(0,100,100,0,1);border:1px solid cmyka(0,0,0,1,1);outline:1px solid cmyka(0,100,100,0,1)}`)
			});
	});

	test('should alter cmyka color and opacity in a complex value', () => {
		return postcss()
			.use(alterColorPlugin({from: 'black', to: 'red'}))
			.process(`div{color:cmyka(0,0,0,100,0.5);border:1px solid cmyka(0,0,0,1,1);outline:1px solid cmyka(0,0,0,100,1)}`, {from: undefined})
			.then(result => {
				expect(result.css).toBe(`div{color:cmyka(0,0,0,100,0.5);border:1px solid cmyka(0,0,0,1,1);outline:1px solid cmyka(0,100,100,0,1)}`)
			});
	});

});
