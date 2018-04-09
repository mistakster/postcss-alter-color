const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const postcss = require('postcss');
const alterColorPlugin = require('../index');

const readFile = promisify(fs.readFile);

function compareFiles(inFilePath, OutFilePath, config) {
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

}

describe('Alter Color plugin', () => {

	test.skip('should process a complex file correctly', () => {
		compareFiles(
			'./fixtures/in.css',
			'./fixtures/out.css',
			{from: 'black', to: '#556832'}
		);
	});

});
