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
        {name: "OpenRaster", ext: ".ora", import: "+", export: "+",
            notes: "advanced features from painting programs like layer blend modes, etc. are not available here."
                    + "<br>Exporting the thumbnail will not work until color quantization is implemented." 
        },
        {name: "Pixel Studio session", ext: ".psp", import: "~", export: "+",
            notes: "a 1:1 read of this format requires accurately implementing every tool from that program."
                    + "<br>For the best experience, wipe the undo history before attempting an import (Functions -> Resize canvas -> Resize -> Yes)."
        },
        {name: "Pixel Studio session<br>(compressed)", ext: ".psx", import: "~", export: "+"},
        {name: "XYZ (RPG Maker 2000/2003)", ext: ".xyz", import: "+", export: "+"},
        {name: "DIBv5 Clipboard dump", ext: ".dibv5", import: "~", export: "+",
            notes: "JPEG, RLE4 and RLE8 subformats currently not supported."
        },
        {name: "PBM (Cave Story engine)", ext: ".pbm", import: "+", export: "+"},
        {name: "Valve Texture Format", ext: ".vtf", import: "~", export: "+",
            notes: "no mipmaps are imported or exported."
                    + "<br>Formats: I8, IA88, A8, RGB565,BGR888,RGB888, BGRA8888, RGBA8888, ARGB8888, ABGR8888, DXT1, DXT3, DXT5"
        },
        {name: "Aseprite session", ext: ".aseprite", import: "+", export: "+",
            notes: "Layer blend modes and tilemaps are not available here."
        },
        {name: "Piskel", ext: ".piskel", import: "~", export: "+"},
        {name: "Lospec Pixel Editor", ext: ".lpe", import: "+", export: "+"},
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
        {name: "Pix2D session", ext: ".pix2d", import: "~", export: "-"},
        {name: "Pixilart session", ext: ".pixil", import: "+", export: "-", 
            notes: "animations and filters not supported [only frame 1 is imported]"
        },
        {name: "Flipnote Studio (DSi)", ext: ".ppm", import: "+", export: "-"},
        {name: "Atrophy Engine texture", ext: ".aetex", import: "~", export: "-",
            notes: "GXT and Switch ASTC subformats not implemented"
        },
        {name: "PS2 Icon", ext: ".icn .ico", import: "~", export: "-"},
        {name: "DirectDraw Surface", ext: ".dds", import: "~", export: "-",
            notes: "only BC1, BC2, BC3 and BGRA8888"
        },
        {name: "Wii/GameCube TPL", ext: ".tpl", import: "~", export: "-",
            notes: "only I4, RGB5A3, RGBA32"
        },
        {name: "IW Engine IWI", ext: ".iwi", import: "~", export: "-",
            notes: "only DXT1, DXT3, DXT5 and ARGB32"
        },
        {name: "GoldSrc SPR", ext: ".spr", import: "+", export: "-"},
        {name: "GIF", ext: ".gif", import: "+", export: "?"},
        {name: "Godot Engine Compressed texture", ext: ".ctex", import: "~", export: "-",
            notes: "only WEBP and PNG subformats"
        },
        {name: "Windows 1.0/2.0/3.11 Paint", ext: ".msp", import: "?", export: "-"},
        {name: "PS Vita GXT", ext: ".gxt", import: "?", export: "-"},
        {name: "PSP/PS3 GIM", ext: ".gim", import: "?", export: "-"},
        {name: "Nintendo 3DS app icon", ext: ".cxi", import: "?", export: "-"},
        {name: "XNA XNB", ext: ".xnb", import: "?", export: "-"},
        {name: "Every other SDL_Image format", ext: "*", import: "+", export: "-"},
    ]
},
{
    target: "table-export",
    compat: [
        {name: "C header (as uint32_t array)", ext: ".h", import: "-", export: "+"},
        {name: "Python NumPy array", ext: ".py", import: "-", export: "+"},
        {name: "HTML Base64 image", ext: ".html", import: "-", export: "+"},
        {name: "Java BufferedImage", ext: ".java", import: "-", export: "~",
            notes: "only works for small images. Larger images go beyond the function size limit."
        },
    ]
},
{
    target: "table-palette",
    compat: [
        {name: "voidsprite palette", ext: ".voidplt", import: "+", export: "+"},
        {name: "Hex palette", ext: ".hex", import: "+", export: "-"},
        {name: "paint.net palette", ext: ".txt", import: "+", export: "-"},
        {name: "JASC-PAL palette", ext: ".pal", import: "+", export: "-"},
        {name: "GIMP GPL palette", ext: ".gpl", import: "+", export: "-"},
        {name: "Pixel Studio palette", ext: ".palette", import: "+", export: "-"}
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
            var targetParent = targetElement.parentNode;
            var notesList = document.createElement("ul");
            targetParent.appendChild(notesList);

            target.compat.forEach(function (item) {
                var row = makeCompatRow(item.name, item.ext, item.import, item.export);
                targetElement.appendChild(row);
                if (item.notes != undefined) {
                    var noteItem = document.createElement("li");
                    noteItem.innerHTML = "<b>" + item.name + "</b>: " + item.notes;
                    notesList.appendChild(noteItem);
                }
            });
        }
    });
}


window.addEventListener("load", makeCompatList);