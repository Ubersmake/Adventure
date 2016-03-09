# Adventure

A Markdown-driven, Choose Your Own Adventure-inspired, interactive story engine. The successor to [Lysithea](https://github.com/ubersmake/lysithea).

## Format

Adventure treats Markdown as Markdown. However, it requires the following changes in order to create interactive stories:

* Sections are defined as all content between H1s, or the last H1 in a file and the end of a file. Sections are effectively pages, and define all text that can be displayed to the reader at a given moment.

* With the exception of the first H1, H1s are not displayed. The first H1 is displayed as the title of the first page.

* H1s are used internally as section names.

* Choices are implemented like Markdown links, with the format: `[II](choice:Chapter Two)` Here, "choice:" is picked up by Adventure, which displays a link labeled "II". Interacting with this link loads the content of the section titled "Chapter Two". Destinations are case (and space) sensitive.

## To Do

* A better "Hello World" example.

* Create How To documentation.

### Core

* Display text based on previous choices.

### Editor

* Deal with H1s. Either lock section names, or figure out how to make them mutable without breaking things.

* Deal with images. Maybe add a delay before refresh.

* Deal with extremely long, Aeneid-length sources.

* Export current source to text file.

* Publish current source to packaged file, including HTML and all necessary JS.

### Validator

* Verify at least one section exists.

* All sections are reachable.
