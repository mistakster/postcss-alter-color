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

it('should replace a short hex with full hex color', () => {
  const source = `
div {
  color: #000;
}
`;

  return process(source, {from: 'black', to: '#ff3fe0'})
    .andMatchSnapshot();
});

it('should replace a short hex color in a complex value', () => {
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

it('should alter a full hex color in a complex value', () => {
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

it('should replace a hex color with rgb() function', () => {
  const source = `
div {
  color: #000;
}
`;

  return process(source, {from: 'black', to: 'rgb(55,55,55)'})
    .andMatchSnapshot();
});

it('should replace a hex color with hsl() function', () => {
  const source = `
div {
  color: #000;
}
`;

  return process(source, {from: 'black', to: 'hsl(30,67%,17%)'})
    .andMatchSnapshot();
});

it('should replace a hex color with a keyword', () => {
  const source = `
div {
  color: #000;
}
`;

  return process(source, {from: 'black', to: 'red'})
    .andMatchSnapshot();
});
