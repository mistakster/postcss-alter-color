const postcss = require('postcss');
const alterColorPlugin = require('../lib/index');

describe('Alter Color plugin', () => {

  test('should alter simple color alpha channel in a single property', () => {
    return postcss()
      .use(alterColorPlugin({from: 'black', to: 'red', alphaChannel: true}))
      .process(`div{color:rgba(0,0,0,0.5)}`, {from: undefined})
      .then(result => {
        expect(result.css).toBe(`div{color:rgba(255,0,0,0.5)}`)
      });
  });

  test('should alter simple color without alpha channel in a single property', () => {
    return postcss()
      .use(alterColorPlugin({from: 'black', to: 'red'}))
      .process(`div{color:rgba(0,0,0,0.5)}`, {from: undefined})
      .then(result => {
        expect(result.css).toBe(`div{color:rgba(0,0,0,0.5)}`)
      });
  });

  test('should alter simple color alpha channel in a single property', () => {
    return postcss()
      .use(alterColorPlugin({from: 'black', to: 'red', alphaChannel: true}))
      .process(`div{color:rgba(0,0,0,0.5);outline:1px solid hsla(0,0%,0%,0.9);border:solid 1px rgb(0,0,0)}`, {from: undefined})
      .then(result => {
        expect(result.css).toBe(`div{color:rgba(255,0,0,0.5);outline:1px solid hsla(0,100%,50%,0.9);border:solid 1px rgb(255,0,0)}`)
      });
  });
});
