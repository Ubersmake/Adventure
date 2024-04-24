const { hello } = require('./index');

test('Hello, world!', () => {
  expect(hello('world')).toBe('Hello, world!');
});
