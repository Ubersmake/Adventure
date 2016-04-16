# Help!
## A Guide to Adventure

Don't panic.

This is a story written for people who'd like some help with Adventure. Or who simply want to know more about Adventure. Or who arrived here after clicking on a link, and are now breathing a sigh of relief that they weren't transported to one of the more terrible places on the Internet.

Adventure is a framework/engine/thing for writing Choose Your Own Adventure-styled stories.

[> Would you like to know more?](choice:Choose Your Own Adventure)

[> I'd like to get started right away.](choice:Markdown)

# Choose Your Own Adventure

Back in grade school, my school library stocked, well, what libraries tend to stock. Books. And the books that were consistently always checked out, that you'd eventually find on a shelf with some luck, which flaunted a long list of dates written in pen on a revolving set of checkout cards, were books from the [Choose Your Own Adventure](https://en.wikipedia.org/wiki/Choose_Your_Own_Adventure) series.

Choose Your Own Adventure books present a story with narrative choices. Upon arriving at a choice, the reader is asked to turn to one page or another in order to continue the story. A well written story would make those decisions meaningful.

The formula has endured. Decades later, people created wonderful things like [Twine](https://twinery.org/). [Choice of Games](https://www.choiceofgames.com/), a developer and publisher of interactive stories, has released [ChoiceScript](https://www.choiceofgames.com/make-your-own-games/choicescript-intro/) to writers looking to create similar decision-driven narratives.

Adventure is similar to these. It was created to make interactive stories easy to write. Where it differs from Twine and ChoiceScript is in how stories are written.

[> Adventure uses Markdown](choice:Markdown).

# Markdown

[Markdown](https://daringfireball.net/projects/markdown/) was developed by John Gruber. Its most practical application is allowing for the easy transformation of plain text to HTML. But on a much higher level, it gives plain text structure and much-needed formatting.

Coupled with the right text editor, it makes writing in plain text downright wonderful.

Adventure uses Markdown because Markdown makes sense when writing prose. There is no need to remember the particulars of formatting for choices. There is no need to learn something completely new in order to write stories.

[> However, Adventure makes some modifications to Markdown's syntax in order to present choices and the consequences of decisions to the reader](choice:Editing).

# Editing

Before we get any further, if you're on a laptop or desktop, or perhaps a very large tablet, go ahead and click on the Edit link in the header. If you're on a phone, or even a large phablet, there are no guarantees on what will happen.

Once you do, you should see this story on the right side of the page, but you'll see all of it in plain text. This is this particular story's source in Markdown-formatted plain text.

[> With this open, you can follow along and see how Adventure uses Markdown to present stories](choice:Adventure Markdown).

# Adventure Markdown

Adventure has some particular syntax rules.

## Sections

The first H1 will always be displayed. This is used for the title page, the first page shown when a reader loads a story.

After the first H1, H1s are **not** displayed. They are instead used as "anchors" for choices. They can be considered as something akin to chapter titles. Adventure calls these "Sections." They are names for each single page that can be shown to the reader. When a choice is presented, that choice will take a reader to a section.

While there are no restrictions on section names, they *shouldn't* have commas, if only to prevent issues with Decisions.

## Choices and Decisions

Adventure makes use of Markdown's [links](https://daringfireball.net/projects/markdown/syntax#link) to provide choices and to show their consequences. It does this by parsing out the URL provided for links. Adventure watches out for URLs that start with `choice:` or `decisions:`, as opposed to `http:` or `https:`, and uses these for Choices and Decisions, respectively.

### Choices

Choices are formatted similar to links:

`[This is a choice.](choice:A good choice)`


`[This is another choice.](choice:A not so good choice)`

When the reader is presented with a choice, they are given a link. Going through either link will take them to the section named after `choice:`. It's important to remember that the name must match, cases, spaces, punctuations, and all.

### Decisions

Decisions are formatted similar to Choices, which are formatted similar to links.

`[You made a good decision.](decisions:A good choice)`


`[You made a questionable decision.](decisions:A not so good choice)`

Decisions show up based on which **Sections** a reader has visited, and by extension, which choices a reader has made. But decisions aren't limited to a single choice.

`[Choices were made](decisions:Choice A,Choice B,Choice C)`

Here, the text "Choices were made" will only show up if the reader has done something to visit the Sections titled "Choice A", "Choice B", **and** "Choice C". If any one of these was **not** visited, this text will not show up. Do note the lack of spacing between commas.

If you chose "Would you like to know more?" at the very beginning of this story, there will be some text below. This is an example of how decisions are implemented.

[As an aside, the predecessor to Adventure used XML. From a technical perspective, XML is easy to use. There are so many tools that parse it, and parse it well. But I was already using Markdown for my own writing. Why not use it for Adventure?](decisions:Choose Your Own Adventure)

## One More Thing

[> You've made it this far. There's just one thing left](choice:In Conclusion).

# In Conclusion

Hopefully, this has been enough to get you started with writing your own Choose Your Own Adventure-styled interactive stories.

Here are some suggestions for creating great (interactive) stories:

* It *may* help to make choices apparent. This story has many links to other pages scattered throughout. Choices always appear at the bottom of each page for this reason. They also appear with a ">" to further distinguish them from other links. It's up to you as a writer to decide how to best present choices.

* Remember that interactive stories make choice matter. There are very legitimate reasons to make the consequences of choices moot. But even in this scenario, choices still matter. They are never arbitrary.

* "Choice" can be used as a way to control the pace of a story's presentation, as the reader will only be shown the text for a single section at any time.

* While Adventure was created for interactive stories, it can be just as easily  used to create non-interactive stories.

For more information, visit the [GitHub page for Adventure](https://github.com/Ubersmake/Adventure).

You've made it to the end. Congratulations! However you choose to write, and whatever you choose to write about, I wish you the best.
