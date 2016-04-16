# Help!
## A Guide to AdventureJS

Don't panic.

You've arrived at the beginning of a story written to help people who need help with AdventureJS. Or who want to know more about AdventureJS. Or who arrived after clicking on a link somewhere on the Internet, and are now breathing a sigh of relief that they weren't transported to one of the more terrible, sketchier locales out there.

AdventureJS is a framework/engine/thing for writing Choose Your Own Adventure-styled stories.

[Would you like to know more?](choice:Choose Your Own Adventure)
[I'd like to get started right away.](choice:Markdown)

# Choose Your Own Adventure

Back in grade school, the school library stocked, well, what libraries tend to stock. Books. And the books that were consistently always checked out, that had a long list of dates written in pen on a revolving set of cards, were books from the [Choose Your Own Adventure](https://en.wikipedia.org/wiki/Choose_Your_Own_Adventure) series.

Choose Your Own Adventure books presented a story with narrative choices. Upon arriving at a choice, the reader would turn to one page, or another page, in order to continue the story with that decision.

The formula has endured. Decades later, people created things like [Twine](https://twinery.org/), and [Choice of Games](https://www.choiceofgames.com/) has developed [ChoiceScript](https://www.choiceofgames.com/make-your-own-games/choicescript-intro/) for writers looking to create stories driven by decisions.

AdventureJS is similar. It allows for a story to be written, and for choices to be woven into the narrative. Where it differs is in how stories are written. AdventureJS uses [Markdown](choice:Markdown).

# Markdown

[Author's note: A previous version of AdventureJS used XML. From a technical perspective, XML is easy to parse. There are so many tools that do it, and do it well. But I was already using Markdown for my own writing. Why not use it for AdventureJS?](decisions:Choose Your Own Adventure)

[Markdown](https://daringfireball.net/projects/markdown/) was developed by John Gruber. Practically speaking, it allows for an easy transformation of plain text to HTML. But on a much higher level, it gives plain text some structure and much-needed formatting.

Coupled with the right text editor, it makes writing in plain text downright wonderful.

AdventureJS uses Markdown because Markdown makes sense when writing prose. There is no need to format things for choices. There is no need to learn something completely new in order to write text. [But AdventureJS makes some modifications to Markdown's syntax in order to present choices and the consequences of decisions to the reader](choice:Editing).

# Editing

Before we get any further, if you're on a laptop or desktop, or perhaps a very large tablet, go ahead and click on the Edit link in the header. If you're on a phone, or even a large phablet, you could still click on that, but there are no guarantees on what will happen.

Once you do, you should see this story on the right side of the display. But you'll see all of it in plain text. This way, you can follow along and [see how AdventureJS uses Markdown to present stories](choice:AdventureJS Markdown).

# AdventureJS Markdown

AdventureJS has some particular formatting rules. The first is that the first H1 will always be displayed. This is used for the title page, the first page to be shown when a reader loads a story.

After this, H1s are not displayed. They are instead used as "anchors" for choices. When a choice is presented, that choice will take a reader to a section, where sections are defined by and named with H1s.

AdventureJS makes use of Markdown's [links](https://daringfireball.net/projects/markdown/syntax#link) to provide choices and to show their consequences. It does this by parsing out the URL provided for links. AdventureJS watches out for URLs that start with `choice:` or `decisions:`, as opposed to `http:` or `https:`, and [uses these for Choices and Decisions, respectively](choice:Choices and Decisions).

# Choices and Decisions

## Choices

Choices are formatted similar to links:

`[This is a choice.](choice:A good choice.)`
`[This is another choice.](choice:A not so good choice.)`

When the reader is presented with this, they are given a link. Clicking on either link will take them to the section named after `choice:`. It's important to remember that the name must match, cases, spaces, punctuations, and all.

## Decisions

Decisions are formatted similar to Choices, which are formatted similar to links.

`[You made a good decision.](decisions:A good choice.)`
`[You made a questionable decision.](decisions:A not so good choice.)`

Decisions show up based on which **sections** a reader has visited, and by extension, which choices a reader has made. But decisions aren't just limited to a single choice.

`[Choices were made](decisions:Choice A,Choice B,Choice C)`

Here, the text "Choices were made" will only show up if the reader has done something to visit the sections for Choice A, Choice B, **and** Choice C. If any one of those was not visited, this text will not show up. Also note the lack of spacing between commas.

## One More Thing

You've made it this far. [There's just one thing left](choice:In Conclusion).

# In Conclusion

Hopefully, this has been enough to get you started with writing your own Choose Your Own Adventure-styled interactive stories.

For more information, visit the [GitHub page for AdventureJS](https://github.com/Ubersmake/Adventure).

You've made it to the end. Congratulations!