const process = require('./utils/process');

const source = `
body {
  background: white;
  color: darkslategray;
}

#article {
  border: solid 1px rgba(47, 79, 79, 0.4);
}

.p {
  border: solid 1px #2f4f4f;
  background: rgb(47, 79, 79) 0 0 no-repeat;
}

circle {
  fill: #2f4f4f;
}

@media screen and (min-width: 480px) {
  body {
    color: hsla(180, 25%, 25%, 0.5);
    outline: solid hsl(180, 25%, 25%) 1px;
  }
}
`;

describe('Alter Color plugin', () => {
  it('should process a complex file correctly', () => {
    const options = {
      from: 'darkslategray',
      to: '#556832',
      preserveAlphaChannel: false
    };

    return process(source, options)
      .andMatchSnapshot();
  });

  it('should process a complex file correctly while preserving alpha channel', () => {
    const options = {
      from: 'darkslategray',
      to: '#556832',
      preserveAlphaChannel: true
    };

    return process(source, options)
      .andMatchSnapshot();
  });
});
