const postcss = require('postcss');
const alterColorPlugin = require('../lib/index');

it('should alter hsla colors', () => {
  return postcss()
    .use(alterColorPlugin({from: 'black', to: 'red'}))
    .process(`div{color:hsla(0,0%,0%,1)}`, {from: undefined})
    .then(result => {
      expect(result.css).toBe(`div{color:hsla(0,100%,50%,1)}`)
    });
});

it('should alter hsla color in a complex value', () => {
  return postcss()
    .use(alterColorPlugin({from: 'black', to: 'red'}))
    .process(`div{color:hsla(0,0%,0%,1);border:1px solid hsla(0,0%,100%,1);outline:1px solid hsla(0,0%,0%,1)}`, {from: undefined})
    .then(result => {
      expect(result.css).toBe(`div{color:hsla(0,100%,50%,1);border:1px solid hsla(0,0%,100%,1);outline:1px solid hsla(0,100%,50%,1)}`)
    });
});

it('should alter hsla color and opacity in a complex value', () => {
  return postcss()
    .use(alterColorPlugin({from: 'black', to: 'red'}))
    .process(`div{color:hsla(0,0%,0%,0.5);border:1px solid hsla(0,0%,100%,1);outline:1px solid hsla(0,0%,0%,1)}`, {from: undefined})
    .then(result => {
      expect(result.css).toBe(`div{color:hsla(0,0%,0%,0.5);border:1px solid hsla(0,0%,100%,1);outline:1px solid hsla(0,100%,50%,1)}`)
    });
});
