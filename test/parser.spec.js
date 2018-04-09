const parser = require('../lib/parser');

describe('Color parser', () => {
  it('should parse keywords', () => {
    expect(parser('lightblue')).toMatchSnapshot();
  });

  it('should parse short hex colors', () => {
    expect(parser('#789')).toMatchSnapshot();
  });

  it('should parse hex colors', () => {
    expect(parser('#9932cc')).toMatchSnapshot();
  });

  it('should parse rgb() colors', () => {
    expect(parser('rgb(220,20,60)')).toMatchSnapshot();
  });

  it('should parse rgba() colors', () => {
    expect(parser('rgba(220,20,60,0.5)')).toMatchSnapshot();
  });

  it('should parse hsl() colors', () => {
    expect(parser('hsl(210,14%,53%)')).toMatchSnapshot();
  });

  it('should parse hsla() colors', () => {
    expect(parser('hsla(280,61%,50%,0.4)')).toMatchSnapshot();
  });
});
