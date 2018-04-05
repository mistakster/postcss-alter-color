const postcss = require('postcss');
const alterColorPlugin = require('../index');

describe('Alter Color plugin', () => {

	test('should alter hsv colors', () => {
		return postcss()
			.use(alterColorPlugin({from: 'black', to: 'red'}))
			.process(`div{color:hsv(0,0,0)}`, {from: undefined})
			.then(result => {
				expect(result.css).toBe(`div{color:hsv(0,100,100)}`)
			});
	});

	test('should alter hsv color in a complex value', () => {
		return postcss()
			.use(alterColorPlugin({from: 'black', to: 'red'}))
			.process(`div{color:hsv(0,0,0);border:1px solid hsv(255,255,255);outline:1px solid hsv(0,0,0)}`, {from: undefined})
			.then(result => {
				expect(result.css).toBe(`div{color:hsv(0,100,100);border:1px solid hsv(255,255,255);outline:1px solid hsv(0,100,100)}`)
			});
	});

});
