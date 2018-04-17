const postcss = require('postcss');
const alterColorPlugin = require('../lib/index');

it('should alter hsl colors', () => {
  return postcss()
    .use(alterColorPlugin({from: 'black', to: 'red'}))
    .process(`div{color:hsl(0,0%,0%)}`, {from: undefined})
    .then(result => {
      expect(result.css).toBe(`div{color:hsl(0,100%,50%)}`)
    });
});

it('should alter hsl color in a complex value', () => {
  return postcss()
    .use(alterColorPlugin({from: 'black', to: 'red'}))
    .process(`div{color:hsl(0,0%,0%);border:1px solid hsl(0,0%,100%);outline:1px solid hsl(0,0%,0%)}`, {from: undefined})
    .then(result => {
      expect(result.css).toBe(`div{color:hsl(0,100%,50%);border:1px solid hsl(0,0%,100%);outline:1px solid hsl(0,100%,50%)}`)
    });
});
