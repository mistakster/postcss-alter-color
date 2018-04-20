const process = require('./utils/process');

it('should alter rgba colors', () => {
  const source = `
div {
  color: rgba(0,0,0,1);
}
`;

  return process(source, {from: 'black', to: 'red'})
    .andMatchSnapshot();
});

it('should alter rgba color in a complex value', () => {
  const source = `
div {
  color: rgba(0,0,0,1);
  border: 1px solid rgba(255,255,255,1);
  outline: 1px solid rgba(0,0,0,1);
}
`;

  return process(source, {from: 'black', to: 'red'})
    .andMatchSnapshot();
});

it('should alter rgba color and opacity in a complex value', () => {
  const source = `
div {
  color: rgba(0,0,0,0.5);
  border: 1px solid rgba(255,255,255,1);
  outline: 1px solid rgba(0,0,0,1);
}
`;

  return process(source, {from: 'black', to: 'red'})
    .andMatchSnapshot();
});
