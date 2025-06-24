function makeHeader() {
    return `<h4>
                ◆This page is part of the voidsprite web manual. <a href="../index.html">View full manual</a>
            </h4>`;
}

function checkIframe() {
    if (window === window.parent) {
        var insertInto = document.getElementsByClassName("manual-body")[0];
        if (insertInto) {
            insertInto.innerHTML = makeHeader() + insertInto.innerHTML;
        }
    }
}