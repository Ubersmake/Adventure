import { readFileSync } from 'fs';
import * as MarkdownIt from 'markdown-it';

interface Element {
  tag: string;
  content: string;
}

/**
 * Parses a file. Tokenizes data from a Markdown file.
 * Then converts those tokens into more easily digestible Elements.
 * Then separates those Elements into groups of "pages."
 *
 * TODO: Validation.
 *
 * @param {string} file Path to a file.
 * @returns {Element[][]} An array of Element[]. The top-level array separates
 *                        groups of Element[] into "pages" by the H1 tag.
 */
export function parseFile(file: string): Element[][] {
  const md = MarkdownIt();
  const fileContent = readFileSync(file).toString();
  const tokens = md.parse(fileContent, {});

  // Convert MarkdownIt.Token[] to Element[]
  const elements: Element[] = [];

  let tag = '';
  let content = '';

  tokens.forEach((token) => {
    if (token.type !== 'inline') {
      tag = token.tag;
    } else {
      content = token.content;
    }

    if (tag && content) {
      elements.push({ tag, content });
      tag = '';
      content = '';
    }
  });

  // Separate Element[] into Element[][] "pages" by H1
  const pages: Element[][] = [];

  let page: Element[] = [];

  elements.forEach((element) => {
    if (page.length !== 0 && element.tag === 'h1') {
      pages.push(page);
      page = [];
    }

    page.push(element);
  });

  // TODO: Simplify the final case.
  pages.push(page);

  return pages;
}

/**
 * Outputs HTML for the title page.
 *
 * TODO: Define title page elements as front matter.
 *
 * @param {Element[]} page Data parsed from a file.
 * @returns {string} The title page in HTML.
 */
export function generateTitlePage(page: Element[]): string {
  let title = '';
  let author = '';
  const content: string[] = [];

  page.forEach((element) => {
    if (element.tag === 'h1') {
      title = element.content;
    } else if (element.tag === 'h2') {
      author = element.content;
    } else content.push(element.content);
  });

  let output = '';

  output += `# ${title}\n`;
  output += `## By ${author}\n`;

  content.forEach((paragraph) => {
    output += `${paragraph}\n\n`;
  });

  const md = MarkdownIt();
  return md.render(output);
}

/**
 * Compiles an Adventure from a source Markdown file into static HTML.
 *
 * @param {string} file
 * @returns {string}
 */
export function generateAdventure(file: string): string {
  const pages = parseFile(file);
  const output = generateTitlePage(pages[0]);

  return output;
}
