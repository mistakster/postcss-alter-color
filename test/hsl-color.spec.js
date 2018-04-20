const process = require('./utils/process');

it('should alter hsl colors', () => {
  const source = `
div {
  color: hsl(0,0%,0%);
}
`;

  return process(source, {from: 'black', to: 'hsl(0,100%,50%)'})
    .andMatchSnapshot();
});

it('should alter hsl color in a complex value', () => {
  const source = `
div {
  color: hsl(0,0%,0%);
  border: 1px solid hsl(0,0%,100%);
  outline: 1px solid hsl(0,0%,0%);
}
`;

  return process(source, {from: 'black', to: 'hsl(0,100%,50%)'})
    .andMatchSnapshot();
});
