const process = require('./utils/process');

it('should alter a color and leave alpha channel untouched', () => {
  const options = {from: 'black', to: 'red', preserveAlphaChannel: true};
  const source = `
div {
  color: rgba(0,0,0,0.5);
}
`;

  return process(source, options)
    .andMatchSnapshot();
});

it('should not alter a color with different alpha channel', () => {
  const options = {from: 'black', to: 'red'};
  const source = `
div {
  color: rgba(0,0,0,0.5);
}
`;

  return process(source, options)
    .andMatchSnapshot();
});

it('should alter both rgb(), rgba(), hsl() and hsla() colors', () => {
  const options = {from: 'black', to: 'red', preserveAlphaChannel: true};
  const source = `
div {
  border: solid 1px rgb(0,0,0);
  color: rgba(0,0,0,0.5);
  background-color: hsl(0,0%,0%);
  outline: 1px solid hsla(0,0%,0%,0.9);
}
`;

  return process(source, options)
    .andMatchSnapshot();
});
