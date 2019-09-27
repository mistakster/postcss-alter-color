const process = require('./utils/process');

const source = `
.i-work {
  background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.5), transparent);
}

.i-dont-work {
  background-image: linear-gradient(180deg, transparent 0, transparent);
}

.i-dont-work-either {
  background-image: linear-gradient(90deg, #009ac1, #42d9ff 37.5%, #009ac1 75%);
}

.i-work-now {
  background-image: linear-gradient(180deg, transparent 0, transparent 0);
}

.i-work-now-too {
  background-image: linear-gradient(
    90deg,
    #009ac1 0,
    #42d9ff 37.5%,
    #009ac1 75%
  );
}
`;

it('should process linear gradients', () => {
  const options = {
    from: '#009ac1',
    to: 'lightgreen',
    preserveAlphaChannel: true
  };

  return process(source, options)
    .andMatchSnapshot();
});
