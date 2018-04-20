const setup = require('./utils/setup');

it('should alter simple color in a single property', () => {
  const source = `
div {
  color: black
}
`;

  return setup(source, {from: 'black', to: 'red'})
    .then(css => expect(css).toMatchSnapshot());
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

  return setup(source, {from: 'black', to: 'red'})
    .then(css => expect(css).toMatchSnapshot());
});

it('should alter color in a complex value', () => {
  const source = `
div {
  color: black;
  border: 1px solid white;
  outline: 1px solid black
}
`;

  return setup(source, {from: 'black', to: 'red'})
    .then(css => expect(css).toMatchSnapshot());
});

it('should alter simple color in multiple properties', () => {
  const source = `
div {
  color: black;
  background: white
}
`;

  return setup(source, {from: 'black', to: 'red'})
    .then(css => expect(css).toMatchSnapshot());
});

it('should alter simple color to hex color a single property', () => {
  const source =`
div {
  color: black
}
`;

  return setup(source, {from: 'black', to: '#fffeee'})
    .then(css => expect(css).toMatchSnapshot());
});

it('should alter simple color to short hex color a single property', () => {
  const source = `
div {
  color: black
}
`;

  return setup(source, {from: 'black', to: '#79b'})
    .then(css => expect(css).toMatchSnapshot());
});
