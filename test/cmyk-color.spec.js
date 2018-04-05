const postcss = require('postcss');
const alterColorPlugin = require('../index');

describe('Alter Color plugin', () => {

	test('should alter cmyk colors', () => {
		return postcss()
			.use(alterColorPlugin({from: 'black', to: 'red'}))
			.process(`div{color:cmyk(0,0,0,100)}`, {from: undefined})
			.then(result => {
				expect(result.css).toBe(`div{color:cmyk(0,100,100,0)}`)
			});
	});

	test('should alter cmyk color in a complex value', () => {
		return postcss()
			.use(alterColorPlugin({from: 'black', to: 'red'}))
			.process(`div{color:cmyk(0,0,0,100);border:1px solid cmyk(0,0,0,1);outline:1px solid cmyk(0,0,0,100)}`, {from: undefined})
			.then(result => {
				expect(result.css).toBe(`div{color:cmyk(0,100,100,0);border:1px solid cmyk(0,0,0,1);outline:1px solid cmyk(0,100,100,0)}`)
			});
	});

});
