const postcss = require('postcss');
const alterColorPlugin = require('../lib/index');

it('should alter simple color in a single property', () => {
  return postcss()
    .use(alterColorPlugin({from: 'black', to: 'red'}))
    .process(`div{color:black}`, {from: undefined})
    .then(result => {
      expect(result.css).toBe(`div{color:red}`)
    });
});

it('should alter simple color in a single property and don’t touch others', () => {
  return postcss()
    .use(alterColorPlugin({from: 'black', to: 'red'}))
    .process(`div{color:black;border:none;width:100%;height:50px}`, {from: undefined})
    .then(result => {
      expect(result.css).toBe(`div{color:red;border:none;width:100%;height:50px}`)
    });
});

it('should alter color in a complex value', () => {
  return postcss()
    .use(alterColorPlugin({from: 'black', to: 'red'}))
    .process(`div{color:black;border:1px solid white;outline:1px solid black}`, {from: undefined})
    .then(result => {
      expect(result.css).toBe(`div{color:red;border:1px solid white;outline:1px solid red}`)
    });
});

it('should alter simple color in multiple properties', () => {
  return postcss()
    .use(alterColorPlugin({from: 'black', to: 'red'}))
    .process(`div{color:black;background:white}`, {from: undefined})
    .then(result => {
      expect(result.css).toBe(`div{color:red;background:white}`)
    });
});

it('should alter simple color to hex color a single property', () => {
  return postcss()
    .use(alterColorPlugin({from: 'black', to: '#fffeee'}))
    .process(`div{color:black}`, {from: undefined})
    .then(result => {
      expect(result.css).toBe(`div{color:#fffeee}`)
    });
});

it('should alter simple color to short hex color a single property', () => {
  return postcss()
    .use(alterColorPlugin({from: 'black', to: '#79b'}))
    .process(`div{color:black}`, {from: undefined})
    .then(result => {
      expect(result.css).toBe(`div{color:#79b}`)
    });
});
