const postcss = require('postcss');
const alterColorPlugin = require('../../lib/index');

/**
 * Initialize the plugin
 * @param {String} css
 * @param {Object} options
 * @return {postcss.LazyResult}
 */
module.exports = function (css, options) {
  return postcss()
    .use(alterColorPlugin(options))
    .process(css, {from: undefined})
    .then(result => result.css.toString());
};
