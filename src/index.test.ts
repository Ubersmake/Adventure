import { hello } from './index';

test('Hello, world!', () => {
  expect(hello('world')).toBe('Hello, world!');
});
