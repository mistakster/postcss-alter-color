const process = require('./utils/process');

it('should alter rgb colors', () => {
  const source = `
div {
  color: rgb(0,0,0);
}
`;

  return process(source, {from: 'black', to: 'rgb(255,0,0)'})
    .andMatchSnapshot();
});

it('should replace an rgb color with the keyword', () => {
  const source = `
div {
  color: rgb(0,0,0);
}
`;

  return process(source, {from: 'black', to: 'red'})
    .andMatchSnapshot();
});

it('should replace an rgb color with the short hex color', () => {
  const source = `
div {
  color: rgb(0,0,0);
}
`;

  return process(source, {from: 'black', to: '#f00'})
    .andMatchSnapshot();
});

it('should replace an rgb color with the full hex color', () => {
  const source = `
div {
  color: rgb(0,0,0);
}
`;

  return process(source, {from: 'black', to: '#ff3fe0'})
    .andMatchSnapshot();
});

it('should replace an rgb color with the hsl color', () => {
  const source = `
div {
  color: rgb(0,0,0);
}
`;

  return process(source, {from: 'black', to: 'hsl(0,100%,50%)'})
    .andMatchSnapshot();
});
