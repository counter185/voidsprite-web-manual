function recommendDownload() {
    var ua = navigator.userAgent;
    
    var matchList = [ 
        ["dl-winx64", "Win64"], 
        ["dl-winx86", "WOW64"],
        ["dl-winx86", "Windows NT"],
        ["dl-winx86", "Win32"],
        ["dl-android", "Android"],
        ["dl-linux", "Linux"],
        ["dl-linux", "X11"],
        ["dl-mac", "OS X"],
    ];

    for (var i = 0; i < matchList.length; i++) {
        if (ua.indexOf(matchList[i][1]) != -1) {
            var element = document.getElementById(matchList[i][0]);
            element.style = "font-size: 1.6em; font-weight: bold;";
            element.innerHTML = "» " + element.innerHTML;
            break;
        }
    }
}

recommendDownload();