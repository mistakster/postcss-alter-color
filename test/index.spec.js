const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const postcss = require('postcss');
const alterColorPlugin = require('../index');

const readFile = promisify(fs.readFile);

describe('Alter Color plugin', () => {

	test('should alter simple colors', () => {
		return postcss()
			.use(alterColorPlugin({from: 'black', to: 'red'}))
			.process(`div{color:black}`, {from: undefined})
			.then(result => {
				expect(result.css).toBe(`div{color:red}`)
			});
	});

	test('should alter hex colors', () => {
		return postcss()
			.use(alterColorPlugin({from: 'black', to: 'red'}))
			.process(`div{color:#000}`, {from: undefined})
			.then(result => {
				expect(result.css).toBe(`div{color:#f00}`)
			});
	});

	test.skip('should work', () => {
		const IN_FILE_PATH = path.join(__dirname, './fixtures/in.css');
		const OUT_FILE_PATH = path.join(__dirname, './fixtures/out.css');

		return Promise
			.all([
				readFile(IN_FILE_PATH, 'utf-8'),
				readFile(OUT_FILE_PATH, 'utf-8')
			])
			.then(([inFile, outFile]) => {
				return postcss()
					.use(alterColorPlugin({from: 'black', to: '#556832'}))
					.process(inFile, {from: IN_FILE_PATH, to: OUT_FILE_PATH})
					.then(result => {
						const output = result.css.toString();

						expect(output).toBe(outFile);
					});
			});
	});

});
