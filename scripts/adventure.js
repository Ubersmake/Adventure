// Stories have Sections, which are defined by H1s.
// Trees have Branches, which are populated with Bundles.
// Tree-related terminology is only used when processing text.

var title;
var sections;

$(document).ready(function() {
    var storyPath = "./stories/";
    var story = "";

    story = getURLParam("story");

    if (!story) {
        story = "adventure";
    }

    storyPath = storyPath + story + ".md";

    $.get(storyPath, function(data) {
        var branches;

        branches = parseStory(data);
        title = branches[0][1][2];
        sections = parseBranches(branches);

        document.title = title;

        displaySection(title);
    });
});

$(document).on("click", 'a', function(event) {
    var href = this.href;
    if (href.substring(0, 7) === "choice:") {
        var choice = href.substring(7);
        displaySection(choice);
    }
});

function displaySection(name) {
    var htmlTree = markdown.toHTMLTree(getSection(name));
    var html = markdown.renderJsonML(htmlTree);

    // Remove H1 if not title
    if (name !== title) {
        html = html.replace(/<h1>.+<\/h1>/, "");
    }

    $("#content").html(html);
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

function getURLParam(param) {
    var pageURL = window.location.search.substring(1);
    var pageURLParams = pageURL.split('&');

    for (var i = 0; i < pageURLParams.length; i++) {
        var paramName = pageURLParams[i].split('=');
        if (paramName[0] == param) {
            return paramName[1];
        }
    }
}
