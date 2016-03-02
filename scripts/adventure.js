// Stories have Sections, which are defined by H1s.
// Trees have Branches, which are populated with Bundles.
// Tree-related terminology is only used when processing text.

var story = "../adventure.md";
var title;
var sections;

$(document).ready(function() {
    $.get(story, function(data) {
        var branches;

        branches = parseStory(data);
        title = branches[0][1][2];
        sections = parseBranches(branches);

        displaySection(title);
    });
});

function displaySection(name) {
    $("#content").html(markdown.renderJsonML(markdown.toHTMLTree(getSection(name))));
}

function getSection(name) {
    return sections[name];
}

function parseBranches(branches) {
    var sections = [];

    for (var i = 0; i < branches.length; i++) {
        var name = branches[i][1][2];
        sections[name] = branches[i];
    }

    return sections;
}

function parseStory(data) {
    var tree = markdown.parse(data);
    var branches = [];

    var bundle = [];
    // For markdown-js' renderer
    bundle.push("markdown");

    var titleHeader = true;
    var createNewBundle = false;

    // tree[0] = "markdown"
    for (var i = 1; i < tree.length; i++) {
        var branch = tree[i];

        if (branch[0] === "header" && branch[1].level === 1 && !titleHeader) {
            createNewBundle = true;
        } else {
            titleHeader = false;
        }

        if (createNewBundle === true) {
            branches.push(bundle);

            bundle = [];
            bundle.push("markdown");
            createNewBundle = false;
        }

        bundle.push(branch);
    }

    // Last bundle
    branches.push(bundle);

    return branches;
}
