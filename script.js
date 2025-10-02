
links = [
    { name: "Welcome", url: "manual/landing.html", subpages: [
        { name: "Open-source licenses", url: "manual/under_construction.html", subpages: [] },
    ] },
    { name: "Introduction", url: "manual/introduction.html", subpages: [
        { name: "System requirements", url: "manual/requirements.html", subpages: [] },
        { name: "Supported formats", url: "manual/compatibility.html", subpages: [] },
        { name: "Workspaces", url: "manual/workspaces.html", subpages: [] },
    ] },
    { name: "voidsprite Launchpad", url: "manual/launchpad.html", subpages: [
        { name: "About color modes", url: "manual/under_construction.html", subpages: [] },
        { name: "Templates", url: "manual/templates.html", subpages: [] },
        { name: "Quick Convert", url: "manual/quickconvert.html", subpages: [] },
        { name: "Recovery autosaves", url: "manual/recoveryautosaves.html", subpages: [] },
    ] },
    { name: "Editor", url: "manual/under_construction.html", subpages: [
        { name: "Tools", url: "manual/under_construction.html", subpages: [] },
        { name: "Patterns", url: "manual/patterns.html", subpages: [] },
        { name: "Spritesheet preview", url: "manual/under_construction.html", subpages: [] },
        { name: "3D Cube preview", url: "manual/under_construction.html", subpages: [] },
        { name: "RPG Maker 2000/2003 map preview", url: "manual/under_construction.html", subpages: [] },
        { name: "Network canvas [BETA]", url: "manual/netcollab.html", subpages: [] },
    ] },
    { name: "Split sessions", url: "manual/under_construction.html", subpages: [] },
    { name: "Multiple windows", url: "manual/under_construction.html", subpages: [] },
    { name: "Settings", url: "manual/under_construction.html", subpages: [
        { name: "Application data directory", url: "manual/appdata.html", subpages: [] },
        { name: "Visual configuration (themes)", url: "manual/themes.html", subpages: [] },
    ] },
    { name: "Advanced features", url: "manual/advancedintro.html", subpages: [
        { name: "Data extractor", url: "manual/under_construction.html", subpages: [] },
        { name: "Image to code export", url: "manual/under_construction.html", subpages: [] },
        { name: "Zlib compression", url: "manual/advanced_zlib.html", subpages: [] },
        { name: "Native plugin API", url: "manual/under_construction.html", subpages: [
            { name: "Full API reference", url: "manual/api_full.html", subpages: [
                { name: "File IO functions", url: "manual/under_construction.html", subpages: [] },
                { name: "Filter functions", url: "manual/api_filters.html", subpages: [] },
                { name: "Layer functions", url: "manual/api_layers.html", subpages: [] },
                { name: "Editor functions", url: "manual/under_construction.html", subpages: [] },
            ] },
            { name: "Get started", url: "manual/sdk_start.html", subpages: [] },
            { name: "Custom file importers", url: "manual/under_construction.html", subpages: [] },
            { name: "Custom filters", url: "manual/sdk_filters.html", subpages: [] },
            { name: "Custom brushes", url: "manual/under_construction.html", subpages: [] },
        ] }
    ] },
];

createdLinkElements = [];

function deactivateAllLinkElements() {
    createdLinkElements.forEach(function(linkElem) {
        linkElem.classList.remove("sublink-active");
    });
}

function highlightPageByLinkName(name) {
    createdLinkElements.forEach(function(linkElem) {
        if (linkElem.href.endsWith(name + ".html")) {
            linkElem.classList.add("sublink-active");
        }
    });
}

function changePage(link) {
    iframe_content.src = link;
}

function linkElement(name, link, subLevel) {
    var aElem = document.createElement("a");
    aElem.href = link;
    aElem.classList.add("sublink-level-" + subLevel);
    if (link == "manual/under_construction.html") {
        aElem.classList.add("redlink");
    }
    aElem.textContent = name;
    aElem.onclick = function(event) {
        event.preventDefault();
        changePage(link);
        deactivateAllLinkElements();
        aElem.classList.add("sublink-active");
    };
    return aElem;
}

function evalLinks(pages, parentElement, subLevel) {
    Array.prototype.forEach.call(pages, function(element) {
        var linkElem = linkElement(element.name, element.url, subLevel);
        parentElement.appendChild(linkElem);
        createdLinkElements.push(linkElem);
        if (element.subpages) {
            var subList = document.createElement("div");
            subList.className = "sub-links";
            evalLinks(element.subpages, subList, subLevel + 1);
            parentElement.appendChild(subList);
        }
    });
}

function load() {
    div_links = document.getElementById("sidebar-links");
    iframe_content = document.getElementById("manual-content");

    evalLinks(links, div_links, 0);

    try {
        const queryParams = new URLSearchParams(window.location.search);
        var page = queryParams.get("page") || "landing";
        changePage("manual/" + page + ".html");
        highlightPageByLinkName(page);
    } catch (e) {
        changePage("manual/landing.html");
    }
}

