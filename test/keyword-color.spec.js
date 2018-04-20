const process = require('./utils/process');

it('should alter a color keyword in a single property', () => {
  const source = `
div {
  color: black
}
`;

  return process(source, {from: 'black', to: 'red'})
    .andMatchSnapshot();
});

it('should replace a color keyword with hex color', () => {
  const source =`
div {
  color: black
}
`;

  return process(source, {from: 'black', to: '#fffeee'})
    .andMatchSnapshot();
});

it('should replace a color keyword with short hex color', () => {
  const source = `
div {
  color: black
}
`;

  return process(source, {from: 'black', to: '#79b'})
    .andMatchSnapshot();
});

it('should replace a color keyword with rgb() function', () => {
  const source = `
div {
  color: black;
}
`;

  return process(source, {from: 'black', to: 'rgb(55,55,55)'})
    .andMatchSnapshot();
});

it('should replace a color keyword with hsl() function', () => {
  const source = `
div {
  color: black;
}
`;

  return process(source, {from: 'black', to: 'hsl(30,67%,17%)'})
    .andMatchSnapshot();
});

it('should alter a color keyword in a single property and don’t touch others', () => {
  const source = `
div {
  color: black;
  border: none;
  width: 100%;
  height: 50px;
}
`;

  return process(source, {from: 'black', to: 'red'})
    .andMatchSnapshot();
});

it('should alter a color keyword in the complex values', () => {
  const source = `
div {
  color: black;
  border: 1px solid white;
  outline: 1px solid black
}
`;

  return process(source, {from: 'black', to: 'red'})
    .andMatchSnapshot();
});
