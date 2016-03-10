# Adventure

A Markdown-driven, Choose Your Own Adventure-inspired, interactive story engine. The successor to [Lysithea](https://github.com/ubersmake/lysithea).

## Format

Adventure treats Markdown as Markdown. However, it requires the following changes in order to create interactive stories:

* Sections are defined as all content between H1s, or the last H1 in a file and the end of a file. Sections are effectively pages, and define all text that can be displayed to the reader at a given moment.

* With the exception of the first H1, H1s are not displayed. The first H1 is displayed as the title of the first page.

* H1s are used internally as section names.

* Choices are implemented like Markdown links, with the format: `[II](choice:Chapter Two)`. Here, "choice:" is picked up by Adventure, which displays a link labeled "II". Interacting with this link loads the content of the section titled "Chapter Two". Destinations are case (and space) sensitive.

* Choices are tracked using the names of the sections visited, including the section currently displayed.

* Text can be displayed based on previous choices. This is also implemented like the standard Markdown link. The format here is `[The text you want to appear.](decisions:plum,conservatory,candlestick)`. Here, "decisions:" is picked up by Adventure. "The text you want to appear." only shows up if *all* choices in a comma separated list of choices - in this case "plum", "conservatory", and "candlestick" - were previously chosen. Note that *all* of these choices must have been made. If 'decisions:' specifies "plum", "conservatory", and "candlestick", and the reader's previous choices included "plum", "conservatory", and "pipe", this text will not show up.

## To Do

* A better "Hello World" example.

* Create How To documentation.

### Editor

* Deal with H1s. Either lock section names, or figure out how to make them mutable without breaking things.

* Deal with extremely long, Aeneid-length sources.

* Publish current source to packaged file, including HTML and all necessary JS.

### Validator

* Verify at least one section exists.

* All sections are reachable.
