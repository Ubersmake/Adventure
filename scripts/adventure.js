// Stories have Sections, which are defined by H1s.
// Trees have Branches, which are populated with Bundles.
// Tree-related terminology is only used when processing text.

var title;
var choices = [];
var sections;
var style = "serif";
var theme = "light";

$(document).ready(function() {
    $("#style").change(function() {
        style = $("#style option:selected").val();
        changeStyle();
    });

    $("#theme").change(function() {
        theme = $("#theme option:selected").val();
        changeTheme();
    });

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
    var choice = $(this).attr("choice");
    if (choice) {
        choices.push(choice);
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

    changeStyle();
    changeTheme();
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

        // Find choices implemented as links.
        for (var j = 0; j < branch.length; j++) {
            if (branch[j].length > 0 && branch[j][0] === "link") {
                var attributes = branch[j][1];
                if (attributes["href"].substring(0, 7) === "choice:") {
                    var choice = attributes["href"].substring(7);
                    branch[j][1]["href"] = "#";
                    branch[j][1]["choice"] = choice;
                } else {
                    branch[j][1]["target"] = "_blank";
                }
            }
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

function changeStyle() {
    if (style === "serif") {
        $("#content").css("font-family", "Garamond, Palatino, Times, serif");
    } else if (style === "sans") {
        $("#content").css("font-family", "Arial, Helvetica, sans-serif");
    }
}

function changeTheme() {
    if (theme === "light") {
        $("body").css("background-color", "#EEEEEE");

        $("#content").css("color", "#424242");
        $("#content a").css("color", "#212121");

        $("#footer").css("background-color", "#9E9E9E");
    } else if (theme === "dark") {
        $("body").css("background-color", "#212121");

        $("#content").css("color", "#BDBDBD");
        $("#content a").css("color", "#FAFAFA");

        $("#footer").css("background-color", "#9E9E9E");
    }
}

function getURLParam(param) {
    var pageURL = window.location.search.substring(1);
    var pageURLParams = pageURL.split('&');

    for (var i = 0; i < pageURLParams.length; i++) {
        var paramName = pageURLParams[i].split('=');
        if (paramName[0] == param) {
            var story = paramName[1];
            if (/[\/\.]/.test(story) === false) {
                return story;
            }
        }
    }
}
