function makeHeader() {
    return '<h4> \
                ◆This page is part of the voidsprite web manual. <a class="manual-link" href="../index.html">View full manual</a> \
            </h4>';
}

function makeReturnLink(page) {
    return '<h4><a class="manual-link" href='+page+'.html> \
                Back to previous page \
            </a></h4>';
}

function checkIframe() {
    var insertInto = document.getElementsByClassName("manual-body")[0];
    if (window === window.parent) {
        if (insertInto) {
            insertInto.innerHTML = makeHeader() + insertInto.innerHTML;
        }
    }
    const queryParams = new URLSearchParams(window.location.search);
    var returnPage = queryParams.get("back");
    if (returnPage != null) {
        if (insertInto) {
            insertInto.innerHTML = makeReturnLink(returnPage) + insertInto.innerHTML;
        }
    }
}