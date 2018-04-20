const postcss = require('postcss');
const alterColorPlugin = require('../../lib/index');

/**
 * Process input css with options passed
 * @param {String} css
 * @param {Object} options
 * @return {Object}
 */
module.exports = function (css, options) {
  const lazyResult = postcss()
    .use(alterColorPlugin(options))
    .process(css, {from: undefined})
    .then(result => result.css.toString());

  lazyResult.andMatchSnapshot = function () {
    return this.then(css => expect(css).toMatchSnapshot());
  };

  return lazyResult;
};
