const postcss = require('postcss');
const alterColorPlugin = require('../index');

describe('Alter Color plugin', () => {

	test('should alter hsva colors', () => {
		return postcss()
			.use(alterColorPlugin({from: 'black', to: 'red'}))
			.process(`div{color:hsva(0,0,0,1)}`, {from: undefined})
			.then(result => {
				expect(result.css).toBe(`div{color:hsva(0,100,100,1)}`)
			});
	});

	test('should alter hsva color in a complex value', () => {
		return postcss()
			.use(alterColorPlugin({from: 'black', to: 'red'}))
			.process(`div{color:hsva(0,0,0,1);border:1px solid hsva(255,255,255,1);outline:1px solid hsva(0,0,0,1)}`, {from: undefined})
			.then(result => {
				expect(result.css).toBe(`div{color:hsva(0,100,100,1);border:1px solid hsva(255,255,255,1);outline:1px solid hsva(0,100,100,1)}`)
			});
	});

	test('should alter hsva color and opacity in a complex value', () => {
		return postcss()
			.use(alterColorPlugin({from: 'black', to: 'red'}))
			.process(`div{color:hsva(0,0,0,0.5);border:1px solid hsva(255,255,255,1);outline:1px solid hsva(0,0,0,1)}`, {from: undefined})
			.then(result => {
				expect(result.css).toBe(`div{color:hsva(0,0,0,0.5);border:1px solid hsva(255,255,255,1);outline:1px solid hsva(0,100,100,1)}`)
			});
	});

});
