const postcss = require('postcss');
const alterColorPlugin = require('../lib/index');
const readFile = require('./utils/readFile');

describe('Alter Color plugin', () => {
  test('should process a complex file correctly', () => {
    const filePath = './fixtures/in.css';
    const config = {
      from: 'black',
      to: '#556832'
    };

    return readFile(filePath)
      .then(data => postcss()
        .use(alterColorPlugin(config))
        .process(data, {from: filePath})
      )
      .then(result => {
        const output = result.css.toString();

        expect(output).toMatchSnapshot();
      });
  });
});
