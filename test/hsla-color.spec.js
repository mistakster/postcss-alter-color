const process = require('./utils/process');

it('should alter hsla colors', () => {
  const source = `
div {
  color: hsla(0,0%,0%,1);
}
`;

  return process(source, {from: 'black', to: 'red'})
    .andMatchSnapshot();
});

it('should alter hsla color in a complex value', () => {
  const source = `
div {
  color: hsla(0,0%,0%,1);
  border: 1px solid hsla(0,0%,100%,1);
  outline: 1px solid hsla(0,0%,0%,1);
}
`;

  return process(source, {from: 'black', to: 'red'})
    .andMatchSnapshot();
});

it('should alter hsla color and opacity in a complex value', () => {
  const source = `
div {
  color: hsla(0,0%,0%,0.5);
  border: 1px solid hsla(0,0%,100%,1);
  outline: 1px solid hsla(0,0%,0%,1);
}
`;

  return process(source, {from: 'black', to: 'red'})
    .andMatchSnapshot();
});
