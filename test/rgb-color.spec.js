const postcss = require('postcss');
const alterColorPlugin = require('../lib/index');

it('should alter rgb colors', () => {
  return postcss()
    .use(alterColorPlugin({from: 'black', to: 'red'}))
    .process(`div{color:rgb(0,0,0)}`, {from: undefined})
    .then(result => {
      expect(result.css).toBe(`div{color:rgb(255,0,0)}`)
    });
});

it('should alter rgb color in a complex value', () => {
  return postcss()
    .use(alterColorPlugin({from: 'black', to: 'red'}))
    .process(`div{color:rgb(0,0,0);border:1px solid rgb(255,255,255);outline:1px solid rgb(0,0,0)}`, {from: undefined})
    .then(result => {
      expect(result.css).toBe(`div{color:rgb(255,0,0);border:1px solid rgb(255,255,255);outline:1px solid rgb(255,0,0)}`)
    });
});
