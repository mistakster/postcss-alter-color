const setup = require('../utils/setup');
const hexVisitor = require('../../lib/visitors/hex');

jest.mock('../../lib/visitors/hex');

it('should invoke hex visitor two times exactly', () => {
  const options = {from: '#ff0', to: '#0ff'};
  const source = 'div { color: #ff0; background-color: #44d; }';
  const result = 'div { color: #0ff; background-color: #44d; }';

  const visitor = jest.fn(node => {
    if (node.value === 'ff0') {
      node.value = '0ff';
    }
  });

  hexVisitor.mockImplementation((a, b) => {
    return visitor;
  });

  return setup(source, options)
    .then(css => expect(css).toBe(result))
    .then(() => {
      expect(visitor.mock.calls).toHaveLength(2);
      expect(visitor.mock.calls[0][0]).toHaveProperty('value', '0ff');
      expect(visitor.mock.calls[1][0]).toHaveProperty('value', '44d');
    });
});
