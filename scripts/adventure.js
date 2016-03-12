var title;
var sections = [];
var currentSection;
var choices = [];

var source;
var filesSupported;

var type = "serif";
var theme = "light";

// Initialize Adventure.
$(document).ready(function() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        filesSupported = true;
    }

    // Do not allow hashes on first load.
    if (window.location.hash) {
        window.location.hash = "";
        document.location.reload();
    }

    // Handler for Choices.
    $(document).on("click", "#content a", function(event) {
        var choice = $(this).attr("choice");
        if (choice) {
            choices.push(choice);
            currentSection = choice;
            displaySection(choice);
        }
    });

    // Handlers for Type and Theme menus.
    $("#type").change(function() {
        type = $("#type option:selected").val();
        // Content must be refreshed to apply a new type.
        // Monospace requires removal of heading tags.
        // Non-monospace requires re-application of headings.
        displaySection(currentSection);
    });

    $("#theme").change(function() {
        theme = $("#theme option:selected").val();
        applyTheme(theme);
    });

    // Handler for edit link
    $(document).on("click", "#header #options #edit", function(event) {
        event.preventDefault();
        toggleEditor();
    });

    // Handler for load link
    if (filesSupported) {
        $("#header #options #load").show();
        $(document).on("change", "#header #options #load", function(event) {
            // event.preventDefault();
            loadStoryFromFile(event);
        });
    }

    // "Back" handlers.
    window.onbeforeunload = function() {
        handleBack();
    }

    window.onhashchange = function() {
        handleBack();
    }

    // Get and display story.
    getStory();
});

// Viewer functions.
function displaySection(name) {
    var htmlTree = markdown.toHTMLTree(sections[name]);
    var html = markdown.renderJsonML(htmlTree);

    // Remove H1 if not title.
    if (name !== title) {
        html = html.replace(/<h1>.+<\/h1>/, "");
    }

    html = displayDecisions(html);

    $("#content").html(html.trim());
    // Remove empty tags left behind from decision rendering.
    $("#content :empty").remove();
    applyType(type);
    applyTheme(theme);
}

function displayDecisions(html) {
    // Change html based on previous decisions.
    var htmlNodes = $($.parseHTML(html));

    var decisions = $(".decisions", htmlNodes);

    for (var i = 0; i < decisions.length; i++) {
        var requiredChoices = $($(".decisions", htmlNodes).get(i)).attr("decisions").split(",");

        var matches = 0;
        for (var j = 0; j < choices.length; j++) {
            if (requiredChoices.indexOf(choices[j]) >= 0) {
                matches++;
            }
        }

        if (matches == requiredChoices.length) {
            var content = $($(".decisions", htmlNodes).get(i)).html();
            $($(".decisions", htmlNodes).get(i)).replaceWith("<p>" + content + "</p>");
        } else {
            $($(".decisions", htmlNodes).get(i)).replaceWith("");
        }

        i--;
        decisions = $(".decisions", htmlNodes);
    }

    var scaffold = document.createElement("div");
    for (var i = 0; i < htmlNodes.length; i++) {
        scaffold.appendChild(htmlNodes[i]);
    }

    return scaffold.innerHTML;
}

function applyType(type) {
    if (type === "serif") {
        $("#content").css("font-family", "Garamond, Palatino, Times, serif");
    } else if (type === "sans") {
        $("#content").css("font-family", "Arial, Helvetica, sans-serif");
    } else if (type === "mono") {
        // Strip out headings and replace with something comparable when using
        // a monospaced style.
        var content = $("#content").html();

        content = content.replace(/<h1>(.+)<\/h1>/, "<strong>$1</strong></p>");
        content = content.replace(/<h2>(.+)<\/h2>/, "<strong>$1</strong></p>");
        content = content.replace(/<h3>(.+)<\/h3>/, "<strong>$1</strong></p>");
        content = content.replace(/<h4>(.+)<\/h4>/, "<strong>$1</strong></p>");
        content = content.replace(/<h5>(.+)<\/h5>/, "<strong>$1</strong></p>");
        content = content.replace(/<h6>(.+)<\/h6>/, "<strong>$1</strong></p>");

        $("#content").html(content.trim());

        $("#content").css("font-family", "'Courier New', Courier, 'Lucida Sans Typewriter', 'Lucida Typewriter', monospace");
    }
}

function applyTheme(theme) {
    if (theme === "light") {
        $("body").css("background-color", "#EEEEEE");
        $("#content").css("color", "#424242");
        $("#content a").css("color", "#212121");
        $("#header").css("background-color", "#9E9E9E");
    } else if (theme === "dark") {
        $("body").css("background-color", "#212121");
        $("#content").css("color", "#BDBDBD");
        $("#content a").css("color", "#FAFAFA");
        $("#header").css("background-color", "#9E9E9E");
    }
}

// Editor functions
function initializeEditor() {
    // Make the editor useful.
    $("#writer").bind("input propertychange", function() {
        window.clearTimeout($(this).data("timeout"));

        // Make the editor less brittle for long stories.
        $(this).data("timeout", setTimeout(function () {
            updateEditor();
        }, 500));
    });

    // Add the source to the editor.
    $("#writer").text(source);

    // Handler for publish link.
    $(document).on("click", "#editor #links #publish", function(event) {
        event.preventDefault();
        publishEditorSource();
    });

    // Handler for download link.
    $(document).on("click", "#editor #links #download", function(event) {
        event.preventDefault();
        downloadEditorSource();
    });
}

function toggleEditor() {
    if ($("#editor").is(":visible")) {
        $("#content").css("width", "100%");
        $("#editor").hide();
    } else {
        $("#content").css("width", "50%");
        $("#editor").show();
    }
}

function updateEditor() {
    source = $("#writer").val();
    parseSource(source);
    displaySection(currentSection);
}

function publishEditorSource() {
    var element = document.createElement('a');

    element.setAttribute('href', 'data:application/javascript;charset=utf-8,' +
        encodeURIComponent("var story = ") +
        encodeURIComponent(JSON.stringify(source)) +
        encodeURIComponent(";"));
    element.setAttribute('download', "story.js");
    element.style.display = 'none';

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function downloadEditorSource() {
    var element = document.createElement('a');

    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(source));
    element.setAttribute('download', title + ".md");
    element.style.display = 'none';

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// Core (Parser) functions.
// Stories have Sections, which are defined by H1s.
// Trees have Branches, which are populated with Bundles.
// Tree-related terminology is only used when processing text.
function getStory() {
    // Default to "story" defined in ./scripts/story.js
    if (story) {
        initializeStory(story);
    } else {
        var storyPath = "./stories/";
        var storyFile = "";

        // Check the "story" URL parameter.
        storyFile = getURLParam("story");

        // Fall back to ./stories/adventure.md
        if (!storyFile) {
            storyFile = "adventure";
        }

        storyPath = storyPath + storyFile + ".md";

        $.get(storyPath, function(data) {
            initializeStory(data);
        });
    }
}

function initializeStory(data) {
    parseSource(data);

    document.title = title;
    currentSection = title;
    displaySection(title);

    // Do this here. Don't grab the source twice.
    source = data;
    initializeEditor();
}

function loadStoryFromFile(event) {
    var file = event.target.files[0];
    var contents;

    if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
             contents = e.target.result;
             initializeStory(contents);
        }
        reader.readAsText(file);
    }
}

function parseSource(data) {
    var branches = parseStory(data);
    title = branches[0][1][2];
    sections = parseBranches(branches);
}

function parseStory(data) {
    var tree = markdown.parse(data);
    var branches = [];

    var bundle = [];
    // For markdown-js' renderer.
    bundle.push("markdown");

    var titleHeader = true;
    var createNewBundle = false;

    // tree[0] = "markdown".
    for (var i = 1; i < tree.length; i++) {
        var branch = tree[i];

        if (branch[0] === "header" && branch[1].level === 1 && !titleHeader) {
            createNewBundle = true;
        } else {
            titleHeader = false;
        }

        // Find choices implemented as links.
        parseBranchLinks(branch);

        if (createNewBundle === true) {
            branches.push(bundle);

            // Prepare new bundle
            bundle = [];
            bundle.push("markdown");
            createNewBundle = false;
        }

        bundle.push(branch);
    }

    // Last bundle.
    branches.push(bundle);

    return branches;
}

// Pre-processing for choice: and decisions:.
// Gets all links to open in a new tab or window.
function parseBranchLinks(branch) {
    for (var i = 0; i < branch.length; i++) {
        if (branch[i].length > 0 && branch[i][0] === "link") {
            var attributes = branch[i][1];

            if (attributes["href"].substring(0, 7) === "choice:") {
                var choice = attributes["href"].substring(7);
                branch[i][1]["href"] = "#choice";
                branch[i][1]["class"] = "choice";
                branch[i][1]["choice"] = choice;
            } else if (attributes["href"].substring(0, 10) === "decisions:") {
                var decisions = attributes["href"].substring(10);
                branch[i][1]["href"] = "#decision";
                branch[i][1]["class"] = "decisions";
                branch[i][1]["decisions"] = decisions;
            } else {
                branch[i][1]["target"] = "_blank";
            }
        }
    }
}

function parseBranches(branches) {
    var sections = [];

    for (var i = 0; i < branches.length; i++) {
        var name = branches[i][1][2];
        sections[name] = branches[i];
    }

    return sections;
}

// Utility functions.
function getURLParam(param) {
    var pageURL = window.location.search.substring(1);
    var pageURLParams = pageURL.split('&');

    for (var i = 0; i < pageURLParams.length; i++) {
        var paramName = pageURLParams[i].split('=');
        if (paramName[0] == param) {
            // Do not allow paths in story parameter.
            var story = paramName[1];
            if (/[\/\.]/.test(story) === false) {
                return story;
            }
        }
    }
}

function handleBack() {
    if (choices.length > 0) {
        var hashIndex = window.location.href.indexOf('#choice');
        if (hashIndex < 0) {
            var restart = confirm("Your Adventure is still in progress. Would you like to return to the beginning?");
            if (restart) {
                document.location.reload(true);
            } else {
                window.location.hash = "choice";
                displaySection(currentSection);
            }
        }
    }
}
