import { parseFile, generateTitlePage, generateAdventure } from './index';

const source = './src/dinnerfortwo.md';

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

describe('Generate Title Page', () => {
  test('Output from valid file', () => {
    // TODO: Use data provider.
    const data = parseFile(source);

    const output = generateTitlePage(data[0]);

    expect(output).toBe('');
  });
});

describe('Generate Adventure', () => {
  test('Works', () => {
    const output = generateAdventure(source);

    expect(output).toBe('');
  })
});
