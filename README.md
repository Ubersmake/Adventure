# Adventure

A Markdown-driven, Choose Your Own Adventure engine. The successor to [Lysithea](https://github.com/ubersmake/lysithea).

## Format

Adventure treats Markdown as Markdown, with these key differences:

* Sections are defined as all content between H1s, or the last H1 in a file and the end of a file. Sections are effectively pages, and define all text that can be displayed to the reader at a given moment.

* With the exception of the first H1, H1s are not displayed. The first H1 is displayed as the title of the first page.

* H1s are used internally as section names.

* There are special links used in Adventure, with the format: `[Chapter One](choice:ChapterOne)` Here, `choice:` is picked up by Adventure, and creates a "link" named "Chapter One" to a section titled `ChapterOne`. Clicking on this link loads the content of the section titled `ChapterOne`.

## To Do

### Implementation

* Credits for jQuery and markdown-js.

* Story validator.

* Tests.

### Features

* Track choices and display text based on prior choices.

* Allow choices to set and modify variables, which can be used to show or hide text.
