import { parseFile, generateTitlePage, generateAdventure } from './index';

const source = './src/parse.test.md';
const sourcePages = [
  [
    {
      tag: "h1",
      content: "Title",
    },
    {
      tag: "h2",
      content: "Author",
    },
    {
      tag: "p",
      content: "Paragraph one.",
    },
    {
      tag: "p",
      content: "Paragraph two.",
    },
  ],
  [
    {
      tag: "h1",
      content: "Section One",
    },
    {
      tag: "p",
      content: "Section one, paragraph one.",
    },
    {
      tag: "p",
      content: "Section two, paragraph two.",
    },
  ],
];
const sourceTitleHTML = "<h1>Title</h1>\n<h2>By Author</h2>\n<p>Paragraph one.</p>\n<p>Paragraph two.</p>\n";

describe('Parse File', () => {
  test('File exists', () => {
    const output = parseFile(source);

    expect(output).toStrictEqual(sourcePages);
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
    const pages = parseFile(source);
    const output = generateTitlePage(pages[0]);

    expect(output).toStrictEqual(sourceTitleHTML);
  });
});

describe('Generate Adventure', () => {
  test('Works', () => {
    const output = generateAdventure(source);

    expect(output).toBeTruthy();
  })
});
