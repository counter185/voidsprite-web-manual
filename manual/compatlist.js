compatListTargets = [
{
    target: "table-importexport",
    compat: [
        {name: "voidsprite session", ext: ".voidsn", import: "+", export: "+"},
        {name: "PNG", ext: ".png", import: "+", export: "+"},
        {name: "JPEG", ext: ".jpeg", import: "+", export: "+"},
        {name: "AVIF", ext: ".avif", import: "+", export: "+"},
        {name: "BMP", ext: ".bmp", import: "+", export: "~"},
        {name: "TGA", ext: ".tga", import: "+", export: "~"},
        {name: "JPEG XL", ext: ".jxl", import: "+", export: "+"},
        {name: "Portable Bitmap,<br>Graymap, Pixmap", ext: ".pbm .pgm .ppm", import: "+", export: "~"},
        {name: "X Bitmap", ext: ".xbm", import: "+", export: "+"},
        {name: "Windows cursor", ext: ".cur", import: "+", export: "+"},
        {name: "OpenRaster", ext: ".ora", import: "+", export: "+"},
        {name: "Pixel Studio session", ext: ".psp", import: "~", export: "+"},
        {name: "Pixel Studio session<br>(compressed)", ext: ".psx", import: "~", export: "+"},
        {name: "XYZ (RPG Maker 2000/2003)", ext: ".xyz", import: "+", export: "+"},
        {name: "DIBv5 Clipboard dump", ext: ".dibv5", import: "~", export: "+"},
        {name: "PBM (Cave Story engine)", ext: ".pbm", import: "+", export: "+"},
        {name: "Valve Texture Format", ext: ".vtf", import: "~", export: "+"},
        {name: "Aseprite Sprite", ext: ".aseprite", import: "~", export: "+"},
        {name: "Piskel", ext: ".piskel", import: "~", export: "+"},
    ]
},
{
    target: "table-import",
    compat: [
        {name: "Nintendo DS banner", ext: ".nds", import: "+", export: "-"},
        {name: "NES (dump CHR-ROM)", ext: ".nes", import: "+", export: "-"},
        {name: "Mario Paint save file", ext: ".srm", import: "+", export: "-"},
        {name: "X-Com SPK, BDY, SCR", ext: ".spk .bdy .scr", import: "+", export: "-"},
        {name: "Windows Shell Scrap", ext: ".shs", import: "+", export: "-"},
        {name: "Atrophy Engine texture", ext: ".aetex", import: "~", export: "-"},
        {name: "PS2 Icon", ext: ".icn .ico", import: "~", export: "-"},
        {name: "DirectDraw Surface", ext: ".dds", import: "~", export: "-"},
        {name: "Wii/GameCube TPL", ext: ".tpl", import: "~", export: "-"},
        {name: "Windows 1.0/2.0/3.11 Paint", ext: ".msp", import: "?", export: "-"},
        {name: "PS Vita GXT", ext: ".gxt", import: "?", export: "-"},
        {name: "PSP/PS3 GIM", ext: ".gim", import: "?", export: "-"},
        {name: "Nintendo 3DS app icon", ext: ".cxi", import: "?", export: "-"},
        {name: "Every other SDL_Image format", ext: "*", import: "+", export: "-"},
    ]
},
{
    target: "table-export",
    compat: [
        {name: "C header (as uint32_t array)", ext: ".h", import: "-", export: "+"},
        {name: "Python NumPy array", ext: ".py", import: "-", export: "+"},
        {name: "HTML Base64 image", ext: ".html", import: "-", export: "+"},
        {name: "Java BufferedImage", ext: ".java", import: "-", export: "~"},
    ]
},
{
    target: "table-palette",
    compat: [
        {name: "voidsprite palette", ext: ".voidplt", import: "+", export: "+"},
        {name: "Hex palette", ext: ".hex", import: "+", export: "-"},
        {name: "paint.net palette", ext: ".txt", import: "+", export: "-"},
        {name: "JASC-PAL palette", ext: ".pal", import: "+", export: "-"},
        {name: "GIMP GPL palette", ext: ".gpl", import: "+", export: "-"}
    ]
}
];

compatTDClasses = {
    "+": "compat-full",
    "~": "compat-partial",
    "-": "compat-none",
    "?": "compat-indev",
};

function makeCompatRow(name, ext, importStatus, exportStatus) {
    var row = document.createElement("tr");
    var nameCell = document.createElement("td");
    nameCell.innerHTML = name;
    row.appendChild(nameCell);

    var extCell = document.createElement("td");
    extCell.innerHTML = ext;
    row.appendChild(extCell);

    var importCell = document.createElement("td");
    importCell.textContent = importStatus;
    importCell.className = compatTDClasses[importStatus] || "compat-unknown";
    row.appendChild(importCell);

    var exportCell = document.createElement("td");
    exportCell.textContent = exportStatus;
    exportCell.className = compatTDClasses[exportStatus] || "compat-unknown";
    row.appendChild(exportCell);

    return row;
}

function makeCompatList() {
    compatListTargets.forEach(function (target) {
        var targetElement = document.getElementById(target.target);
        if (targetElement) {
            target.compat.forEach(function (item) {
                var row = makeCompatRow(item.name, item.ext, item.import, item.export);
                targetElement.appendChild(row);
            });
        }
    });
}


window.addEventListener("load", makeCompatList);