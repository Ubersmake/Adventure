import { readFileSync } from 'fs';
import * as MarkdownIt from 'markdown-it';

export function parseFile(file: string): MarkdownIt.Token[] {
  const md = MarkdownIt();

  const content = readFileSync(file).toString();

  const tokens = md.parse(content, {});

  tokens.forEach((token) => {
    console.log(token);
  });

  return tokens;
}
