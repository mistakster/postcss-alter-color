const process = require('./utils/process');

it('should alter short hex colors', () => {
  const source = `
div {
  color: #000;
}
`;

  return process(source, {from: 'black', to: 'red'})
    .andMatchSnapshot();
});

it('should alter short hex to full hex colors', () => {
  const source = `
div {
  color: #000;
}
`;

  return process(source, {from: 'black', to: '#ff3fe0'})
    .andMatchSnapshot();
});

it('should alter short hex color in a complex value', () => {
  const source = `
div {
  color: #000;
  border: 1px solid #fff;
  outline: 1px solid #000
}
`;

  return process(source, {from: 'black', to: 'red'})
    .andMatchSnapshot();
});

it('should alter full hex colors', () => {
  const source = `
div {
  color: #000000;
}
`;

  return process(source, {from: 'black', to: 'red'})
    .andMatchSnapshot();
});

it('should alter full hex color in a complex value', () => {
  const source = `
div {
  color: #000000;
  border: 1px solid #ffffff;
  outline: 1px solid #000000;
}`;

  return process(source, {from: 'black', to: 'red'})
    .andMatchSnapshot();
});
