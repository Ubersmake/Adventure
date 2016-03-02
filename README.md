# Adventure

A Markdown-driven, Choose Your Own Adventure engine. The successor to [Lysithea](https://github.com/ubersmake/lysithea).

## Format

Adventure treats Markdown as Markdown, with these key differences.

* Sections are defined as all content between H1s, or the last H1 in a file and the end of a file. Sections are effectively pages, and define all text that can be displayed at any given moment.

* With the exception of the first H1, H1s are not displayed.

* H1s are used internally as section names.

* There are special links used in Adventure, with the format: `[Chapter One](choice:ChapterOne)` Here, `choice:` is picked up by Adventure, and creates a "link" named "Chapter One" to a section titled `ChapterOne`.

* The first H1 is displayed as the title of the first page.

## To Do

### Implementation

* Use CDN jQuery.

* Use minified markdown-js.

### Features

* Track choices and display text based on prior choices.
