const process = require('./utils/process');

const source = `
body {
  color: white;
  background: black;
}

#article {
  color: #cccccc;
  border: solid 1px rgba(0, 0, 0, 0.4);
}

.p {
  color: #ccc;
  border: solid 1px #000;
  background: rgb(0, 50, 0) 0 0 no-repeat;
}

circle {
  fill: #000000;
}

@media screen and (min-width: 480px) {
  body {
    color: yellow;
    background-color: hsla(0, 0%, 0%, 0.5);
    border: solid #000 1px;
  }
}
`;

describe('Alter Color plugin', () => {
  it('should process a complex file correctly', () => {
    const options = {
      from: 'black',
      to: '#556832',
      preserveAlphaChannel: false
    };

    return process(source, options)
      .andMatchSnapshot();
  });

  it.skip('should process a complex file correctly while preserving alpha channel', () => {
    const options = {
      from: 'black',
      to: '#556832',
      preserveAlphaChannel: true
    };

    return process(source, options)
      .andMatchSnapshot();
  });
});
