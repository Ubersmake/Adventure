import { hello, parseFile } from './index';

const source = './src/dinnerfortwo.md';

test('Hello, world!', () => {
  expect(hello('world')).toBe('Hello, world!');
});

describe('Parse File', () => {
  test('File exists', () => {
    const output = parseFile(source);

    expect(output).toBeTruthy();
  });

  test('File does not exist', () => {
    const no = () => {
      parseFile('no');
    };

    expect(no).toThrow();
  });
});
