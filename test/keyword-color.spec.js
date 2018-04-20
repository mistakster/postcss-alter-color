const process = require('./utils/process');

it('should alter simple color in a single property', () => {
  const source = `
div {
  color: black
}
`;

  return process(source, {from: 'black', to: 'red'})
    .andMatchSnapshot();
});

it('should alter simple color in a single property and don’t touch others', () => {
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

it('should alter color in a complex value', () => {
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

it('should alter simple color in multiple properties', () => {
  const source = `
div {
  color: black;
  background: white
}
`;

  return process(source, {from: 'black', to: 'red'})
    .andMatchSnapshot();
});

it('should alter simple color to hex color a single property', () => {
  const source =`
div {
  color: black
}
`;

  return process(source, {from: 'black', to: '#fffeee'})
    .andMatchSnapshot();
});

it('should alter simple color to short hex color a single property', () => {
  const source = `
div {
  color: black
}
`;

  return process(source, {from: 'black', to: '#79b'})
    .andMatchSnapshot();
});

it('should alter simple color to rgb() function', () => {
  const source = `
div {
  color: black;
}
`;

  return process(source, {from: 'black', to: 'rgb(55,55,55)'})
    .andMatchSnapshot();
});

it('should alter simple color to hsl() function', () => {
  const source = `
div {
  color: black;
}
`;

  return process(source, {from: 'black', to: 'hsl(30,67%,17%)'})
    .andMatchSnapshot();
});
