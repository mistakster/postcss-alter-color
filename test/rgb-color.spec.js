const process = require('./utils/process');

it('should alter rgb colors', () => {
  const source = `
div {
  color: rgb(0,0,0);
}
`;

  return process(source, {from: 'black', to: 'red'})
    .andMatchSnapshot();
});

it('should alter rgb color in a complex value', () => {
  const source = `
div {
  color: rgb(0,0,0);
  border: 1px solid rgb(255,255,255);
  outline: 1px solid rgb(0,0,0);
}
`;

  return process(source, {from: 'black', to: 'red'})
    .andMatchSnapshot();
});
