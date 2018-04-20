const process = require('./utils/process');

it('should alter short hex colors', () => {
  const source = `
div {
  color: #000;
}
`;

  return process(source, {from: 'black', to: '#f00'})
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

  return process(source, {from: 'black', to: '#f00'})
    .andMatchSnapshot();
});

it('should alter full hex colors', () => {
  const source = `
div {
  color: #000000;
}
`;

  return process(source, {from: 'black', to: '#ff3fe0'})
    .andMatchSnapshot();
});

it('should alter full hex color in a complex value', () => {
  const source = `
div {
  color: #000000;
  border: 1px solid #ffffff;
  outline: 1px solid #000000;
}`;

  return process(source, {from: 'black', to: '#ff3fe0'})
    .andMatchSnapshot();
});

it('should use shorter value if it’s possible', () => {
  const source = `
div {
  color: #000000;
}
`;

  return process(source, {from: 'black', to: '#ff0000'})
    .andMatchSnapshot();
});

it('should alter a hex color to rgb() function', () => {
  const source = `
div {
  color: #000;
}
`;

  return process(source, {from: 'black', to: 'rgb(55,55,55)'})
    .andMatchSnapshot();
});

it('should alter a hex color to hsl() function', () => {
  const source = `
div {
  color: #000;
}
`;

  return process(source, {from: 'black', to: 'hsl(30,67%,17%)'})
    .andMatchSnapshot();
});
