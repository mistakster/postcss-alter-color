const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const postcss = require('postcss');
const alterColorPlugin = require('../index');

const readFile = promisify(fs.readFile);

const comparisonFiles = (inFilePath, OutFilePath, config) => {
	const IN_FILE_PATH = path.join(__dirname, inFilePath);
	const OUT_FILE_PATH = path.join(__dirname, OutFilePath);

	return Promise
		.all([
			readFile(IN_FILE_PATH, 'utf-8'),
			readFile(OUT_FILE_PATH, 'utf-8')
		])
		.then(([inFile, outFile]) => {
			return postcss()
				.use(alterColorPlugin(config))
				.process(inFile, {from: IN_FILE_PATH, to: OUT_FILE_PATH})
				.then(result => {
					const output = result.css.toString();

					expect(output).toBe(outFile);
				})
		})

};

describe('Alter Color plugin', () => {

	test('should alter simple color in a single property', () => {
		return postcss()
			.use(alterColorPlugin({from: 'black', to: 'red'}))
			.process(`div{color:black}`, {from: undefined})
			.then(result => {
				expect(result.css).toBe(`div{color:red}`)
			});
	});

	test('should alter simple color in a single property and don’t touch others', () => {
		return postcss()
			.use(alterColorPlugin({from: 'black', to: 'red'}))
			.process(`div{color:black;border:none;width:100%;height:50px}`, {from: undefined})
			.then(result => {
				expect(result.css).toBe(`div{color:red;border:none;width:100%;height:50px}`)
			});
	});

	test('should alter color in a complex value', () => {
		return postcss()
			.use(alterColorPlugin({from: 'black', to: 'red'}))
			.process(`div{color:black;border:1px solid white;outline:1px solid black}`, {from: undefined})
			.then(result => {
				expect(result.css).toBe(`div{color:red;border:1px solid white;outline:1px solid red}`)
			});
	});

	test('should alter simple color in multiple properties', () => {
		return postcss()
			.use(alterColorPlugin({from: 'black', to: 'red'}))
			.process(`div{color:black;background:white}`, {from: undefined})
			.then(result => {
				expect(result.css).toBe(`div{color:red;background:white}`)
			});
	});

	test.skip('should alter hex colors', () => {
		return postcss()
			.use(alterColorPlugin({from: 'black', to: 'red'}))
			.process(`div{color:#000}`, {from: undefined})
			.then(result => {
				expect(result.css).toBe(`div{color:#f00}`)
			});
	});

	test.skip('should alter hex full colors', () => {
		return postcss()
			.use(alterColorPlugin({from: 'black', to: 'red'}))
			.process(`div{color:#000000}`, {from: undefined})
			.then(result => {
				expect(result.css).toBe(`div{color:#ff0000}`)
			});
	});

	test.skip('should alter rgb colors', () => {
		return postcss()
			.use(alterColorPlugin({from: 'black', to: 'red'}))
			.process(`div{color:rgb(0, 0, 0)}`, {from: undefined})
			.then(result => {
				expect(result.css).toBe(`div{color:rgb(255,0,0)}`)
			});
	});

	test.skip('should alter rgba colors', () => {
		return postcss()
			.use(alterColorPlugin({from: 'black', to: 'red'}))
			.process(`div{color:rgba(0,0,0,1)}`, {from: undefined})
			.then(result => {
				expect(result.css).toBe(`div{color:rgba(255,0,0,1)}`)
			});
	});

	test.skip('should work', () => {

		comparisonFiles('./fixtures/in.css', './fixtures/out.css', {from: 'black', to: '#556832'});

	});

});
