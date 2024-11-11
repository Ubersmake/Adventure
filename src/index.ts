import { readFileSync } from 'fs';
import * as MarkdownIt from 'markdown-it';

/**
 * Parses a file.
 *
 * TODO: Validation.
 * 
 * @param {string} file Path to a file.
 * @returns {MarkdownIt.Token[][]} An array of MarkdownIt.Token[]. The top-level array separates groups of MarkdownIt.Token[] by the H1 element.
 */
export function parseFile(file: string): MarkdownIt.Token[][] {
  const md = MarkdownIt();

  const content = readFileSync(file).toString();

  const tokens = md.parse(content, {});
  const sections: MarkdownIt.Token[][] = [];

  // Separate sections by H1
  let section: MarkdownIt.Token[] = [];
  tokens.forEach((token) => {
    if (token.type === 'heading_open' && token.tag === 'h1' && section.length !== 0) {
      sections.push(section);
      section = [];
    }

    section.push(token);
  });

  return sections;
}

/**
 * Outputs HTML for the title page.
 * 
 * TODO: Definte title page elements as front matter.
 *
 * @param {MarkdownIt.Token[]} data Data parsed from a file.
 * @returns {string} The title page in HTML.
 */
export function generateTitlePage(data: MarkdownIt.Token[]): string {
  let title = '';
  let author = '';
  let content = '';

  data.forEach((token) => {
    console.log(token);
  });

  return '';
}

/**
 * Compiles an Adventure from a source Markdown file into static HTML.
 *
 * @param {string} file 
 * @returns {string}
 */
export function generateAdventure(file: string): string {
  const data = parseFile(file);
  const output = generateTitlePage(data[0]);

  return output;
}
