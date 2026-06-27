function fnParam(type, name, description) {
    return {
        "type": type,
        "name": name,
        "description": description
    }
}
function apiType(name) {
    return "<span class=api-customtype>"+name+"</span>"
}
function fnPointer(returnType, params) {
    return "["+returnType+"("+params.join(", ")+")]"
}

api_doc = {
    "filters": [
        {
            "return": apiType("VSPFilter*"),
            "name": "registerFilter",
            "params": [
                fnParam("const char*", "name", "the name of the filter"),
                fnParam(fnPointer("void", [apiType("VSPLayer*"), apiType("VSPFilter*")]), "filterFunction", "the function to call when filter is applied")
            ],
            "return_desc": "the pointer to the newly created " + apiType("VSPFilter") + "<br>NULL on failure.",
            "description": "Registers a new filter.<br>"
                            + "The filter function will be called when the filter is applied to a layer.<br>"
                            + "Filters can only be applied in RGB mode.<br><br>"
                            + "Your filter function receives the "+apiType("VSPLayer")+" pointer containing target layer data, and needs to modify it.<br>"
                            + "Your filter function will run on a new thread, but never concurrently with itself.<br><br>"
                            + "This pointer is managed by voidsprite and should not be freed from plugin code."
        },
        {
            "return": "void",
            "name": "filterNewBoolParameter",
            "params": [
                fnParam(apiType("VSPFilter*"), "filter", "the filter to add the parameter to"),
                fnParam("const char*", "name", "the name of the parameter"),
                fnParam("bool", "defaultValue", "the default value of the parameter"),
            ],
            "description": "Adds a boolean [ON/OFF] parameter to a filter.<br>"
                            + "This parameter will be configurable with a checkbox when the filter is selected.<br><br>"
                            + "The value can then be retrieved with <span class=\"api-fn\">filterGetBoolValue</span> inside the filter function.",
        },
        {
            "return": "void",
            "name": "filterNewIntParameter",
            "params": [
                fnParam(apiType("VSPFilter*"), "filter", "the filter to add the parameter to"),
                fnParam("const char*", "name", "the name of the parameter"),
                fnParam("int", "minValue", "the minimum value of the parameter"),
                fnParam("int", "maxValue", "the maximum value of the parameter"),
                fnParam("int", "defaultValue", "the default value of the parameter"),
            ],
            "description": "Adds an integer [whole number] parameter to a filter.<br>"
                            + "This parameter will be configurable with a slider when the filter is selected.<br><br>"
                            + "The value can then be retrieved with <span class=\"api-fn\">filterGetIntValue</span> inside the filter function.",
        },
        {
            "return": "void",
            "name": "filterNewDoubleParameter",
            "params": [
                fnParam(apiType("VSPFilter*"), "filter", "the filter to add the parameter to"),
                fnParam("const char*", "name", "the name of the parameter"),
                fnParam("double", "minValue", "the minimum value of the parameter"),
                fnParam("double", "maxValue", "the maximum value of the parameter"),
                fnParam("double", "defaultValue", "the default value of the parameter"),
            ],
            "description": "Adds a double [floating point number] parameter to a filter.<br>"
                            + "This parameter will be configurable with a slider when the filter is selected.<br><br>"
                            + "The value can then be retrieved with <span class=\"api-fn\">filterGetDoubleValue</span> inside the filter function.",
        },
        {
            "return": "void",
            "name": "filterNewDoubleRangeParameter",
            "params": [
                fnParam(apiType("VSPFilter*"), "filter", "the filter to add the parameter to"),
                fnParam("const char*", "name", "the name of the parameter"),
                fnParam("double", "minValue", "the minimum value of the parameter"),
                fnParam("double", "maxValue", "the maximum value of the parameter"),
                fnParam("double", "defaultValueLow", "the default lower value of the parameter"),
                fnParam("double", "defaultValueHigh", "the default higher value of the parameter"),
                fnParam("uint32", "color", "the color of the slider in 0xAARRGGBB format")
            ],
            "description": "Adds a number range parameter to a filter.<br>"
                            + "This parameter will be configurable with a range slider when the filter is selected.<br><br>"
                            + "The value can then be retrieved with <span class=\"api-fn\">filterGetRangeValue1</span> and <span class=\"api-fn\">filterGetRangeValue2</span> inside the filter function.",
        },
        {
            "return": "bool",
            "name": "filterGetBoolValue",
            "params": [
                fnParam(apiType("VSPFilter*"), "filter", "the filter to query"),
                fnParam("const char*", "name", "the name of the parameter")
            ],
            "return_desc": "the value of the parameter."+"<br>false if the filter is NULL or the parameter is not found.",
            "description": "Gets the value of a boolean parameter."
        },
        {
            "return": "int",
            "name": "filterGetIntValue",
            "params": [
                fnParam(apiType("VSPFilter*"), "filter", "the filter to query"),
                fnParam("const char*", "name", "the name of the parameter")
            ],
            "return_desc": "the value of the parameter."+"<br>0 if the filter is NULL or the parameter is not found.",
            "description": "Gets the value of an integer parameter."
        },
        {
            "return": "double",
            "name": "filterGetDoubleValue",
            "params": [
                fnParam(apiType("VSPFilter*"), "filter", "the filter to query"),
                fnParam("const char*", "name", "the name of the parameter")
            ],
            "return_desc": "the value of the parameter."+"<br>0.0 if the filter is NULL or the parameter is not found.",
            "description": "Gets the value of a double parameter."
        },
        {
            "return": "double",
            "name": "filterGetRangeValue1",
            "params": [
                fnParam(apiType("VSPFilter*"), "filter", "the filter to query"),
                fnParam("const char*", "name", "the name of the parameter")
            ],
            "return_desc": "the value of the parameter."+"<br>0.0 if the filter is NULL or the parameter is not found.",
            "description": "Gets the lower value of a range parameter."
        },
        {
            "return": "double",
            "name": "filterGetRangeValue2",
            "params": [
                fnParam(apiType("VSPFilter*"), "filter", "the filter to query"),
                fnParam("const char*", "name", "the name of the parameter")
            ],
            "return_desc": "the value of the parameter."+"<br>0.0 if the filter is NULL or the parameter is not found.",
            "description": "Gets the higher value of a range parameter."
        }
    ],


    "files": [
        {
            "return": "void",
            "name": "registerLayerImporter",
            "params": [
                fnParam("const char*", "name", "the name of the importer"),
                fnParam("const char*", "extension", "the extension this importer will load, (example: \".bin\")"),
                fnParam("int", "layerTypes", "a bitmask of layer types that this importer can output<br>(example: VSP_LAYER_RGBA | VSP_LAYER_INDEXED)"),
                fnParam(apiType("VSPFileExporter*"), "matchingExporter", "a corresponding "+apiType("VSPFileExporter")+" that will be assigned to loaded files. May be NULL."),
                fnParam(fnPointer(apiType("VSPLayer*"), ["char* path"]), "importFunction", "the function that will be called to import the file. Must either return a valid layer or NULL on failure."),
                fnParam(fnPointer("bool", ["char* path"]), "canImportFunction", "a function that checks if this importer is applicable for the given file (like checking any magic values, etc.). May be NULL.")
            ],
            "description": "Registers a new file importer for single-layer files."
                            + "<br>When the user imports a file of the specified extension, canImportFunction will be called first."
                            + "<br>If canImportFunction is NULL or returns true, importFunction will be called to import the layer."
                            + "<br>All strings are encoded in UTF-8."
        },
        {
            "return": "VSPFileExporter*",
            "name": "registerLayerExporter",
            "params": [
                fnParam("const char*", "name", "the name of the exporter"),
                fnParam("const char*", "extension", "the extension this exporter will save, (example: \".bin\")"),
                fnParam("int", "layerTypes", "a bitmask of layer types that this exporter can save<br>(example: VSP_LAYER_RGBA | VSP_LAYER_INDEXED)"),
                fnParam(fnPointer("bool", [apiType("VSPLayer*") + " layer", "char* path"]), "exportFunction", "the function that will be called to save the layer to a file. Should return true on success and false on failure."),
                fnParam(fnPointer("bool", [apiType("VSPLayer*") + " layer"]), "canExportFunction", "currently unused. May be NULL.")
            ],
            "return_desc": "a pointer to your layer exporter." + "<br>NULL on failure.",
            "description": "Registers a new file exporter for single-layer files."
                            + "<br>When the user exports a file of the specified extension, importFunction will be called."
                            + "<br>All strings are encoded in UTF-8."
        }
    ],


    "layers": [
        {
            "return": apiType("VSPLayer*"),
            "name": "layerAllocNew",
            "params": [
                fnParam("int", "type", "must be either VSP_LAYER_RGBA or VSP_LAYER_INDEXED"),
                fnParam("int", "width", "layer width"),
                fnParam("int", "height", "layer height")
            ],
            "return_desc": "the pointer to the newly created " + apiType("VSPLayer") + "<br>NULL on failure.",
            "description": "Allocates a new layer of the specified type and dimensions."
        },
        {
            "return": "void",
            "name": "layerFree",
            "params": [
                fnParam(apiType("VSPLayer*"), "layer", "the layer to free")
            ],
            "description": "Frees a layer previously allocated with <span class=api-fn>layerAllocNew</span>."
        },
        {
            "return": apiType("VSPLayerInfo*"),
            "name": "layerGetInfo",
            "params": [
                fnParam(apiType("VSPLayer*"), "layer", "the layer to query")
            ],
            "return_desc": "a pointer to a " + apiType("VSPLayerInfo") + " struct." + "<br>NULL if the layer is NULL.",
            "description": "Gets information about a layer."
                + "<br><br>This pointer needs to be freed with <span class=api-fn>util_free</span> after use."
        },
        {
            "return": "void",
            "name": "layerSetPixel",
            "params": [
                fnParam(apiType("VSPLayer*"), "layer", "the layer to modify"),
                fnParam("int", "x", "the X coordinate of the pixel"),
                fnParam("int", "y", "the Y coordinate of the pixel"),
                fnParam("uint32", "color", "the color to set the pixel to")
            ],
            "description": "Sets the pixel at the specified coordinates to the specified color."
                + "<br>For RGBA layers, the color is in 0xAARRGGBB format."
                + "<br>For indexed layers, the color is the palette index."
        },
        {
            "return": "uint32",
            "name": "layerGetPixel",
            "params": [
                fnParam(apiType("VSPLayer*"), "layer", "the layer to query"),
                fnParam("int", "x", "the X coordinate of the pixel"),
                fnParam("int", "y", "the Y coordinate of the pixel")
            ],
            "return_desc": "the color of the pixel." + "<br>0 if the layer is NULL or coordinates are out of bounds.",
            "description": "Gets the color of the pixel at the specified coordinates."
                + "<br>For RGBA layers, the color is in 0xAARRGGBB format."
                + "<br>For indexed layers, the color is the palette index, or 0xFFFFFFFF (-1) for no color."
        },
        {
            "return": "uint32*",
            "name": "layerGetRawPixelData",
            "params": [
                fnParam(apiType("VSPLayer*"), "layer", "the layer to query")
            ],
            "return_desc": "a pointer to the raw pixel data." + "<br>NULL if the layer is NULL.",
            "description": "Gets a pointer to the raw pixel data of the layer."
                + "<br>For RGBA layers, the data is an array of 32-bit colors in 0xAARRGGBB format."
                + "<br>For indexed layers, the data is an array of 32-bit palette indices."
                + "<br><br>This pointer is managed by voidsprite and should not be freed from plugin code."
        }
    ],


    "editor": [
        {
            "return": "void",
            "name": "registerEditorAction",
            "params": [
                fnParam("const char*", "name", "the name of your action"),
                fnParam(fnPointer("void", [apiType("VSPEditorContext*") + " editor"]), "action", "the function to call when running your action")
            ],
            "description": "Registers a new editor action."
                + "<br>The action will be accessible from the <span class=navbar-hint>Actions</span> menu on the navigation bar."
        },
        {
            "return": "uint32",
            "name": "editorGetActiveColor",
            "params": [
                fnParam(apiType("VSPEditorContext*"), "editor", "the editor context to query")
            ],
            "return_desc": "the editor's current active color." + "<br>0 if editor is NULL.",
            "description": "Gets the current active color."
                            + "<br>For RGB sessions, it will be in 0xAARRGGBB format."
                            + "<br>For indexed sessions, it will be an index in the palette."
        },
        {
            "return": "int",
            "name": "editorGetNumLayers",
            "params": [
                fnParam(apiType("VSPEditorContext*"), "editor", "the editor context to query"),
            ],
            "return_desc": "the number of layers." + "<br>0 if editor is NULL.",
            "description": "Gets the number of layers in the editor."
        },
        {
            "return": apiType("VSPLayer*"),
            "name": "editorGetLayer",
            "params": [
                fnParam(apiType("VSPEditorContext*"), "editor", "the editor context to query"),
                fnParam("int", "index", "the index of the layer")
            ],
            "return_desc": "a pointer to the layer." + "<br>NULL if editor is NULL or layer index is out of bounds.",
            "description": "Gets a pointer to the layer of the specified index."
        },
        {
            "return": apiType("VSPLayer*"),
            "name": "editorGetActiveLayer",
            "params": [
                fnParam(apiType("VSPEditorContext*"), "editor", "the editor context to query")
            ],
            "return_desc": "a pointer to the layer." + "<br>NULL if editor is NULL.",
            "description": "Gets a pointer to the current active layer."
        },
        {
            "return": "void",
            "name": "editorSetPixel",
            "params": [
                fnParam(apiType("VSPEditorContext*"), "editor", "the target editor context"),
                fnParam("int", "x", "the X coordinate of the pixel"),
                fnParam("int", "y", "the Y coordinate of the pixel"),
                fnParam("uint32", "color", "the color to set the pixel to"),
            ],
            "description": "Sets a pixel to the specified color."
                            + "<br>Unlike layerSetPixel, this function will be affected by symmetry, eraser mode, brush blend mode and the current brush alpha."
        },
        {
            "return": "void",
            "name": "editorUndoPushLayerState",
            "params": [
                fnParam(apiType("VSPEditorContext*"), "editor", "the target editor context"),
                fnParam(apiType("VSPLayer"), "layer", "the target layer"),
            ],
            "description": "Pushes the current layer state onto the undo stack."
                            + "<br>Do this before modifying a layer's pixels outside of brush and filter code."
        },
        {
            "return": apiType("VSPLayer*"),
            "name": "editorFlattenImage",
            "params": [
                fnParam(apiType("VSPEditorContext*"), "editor", "the target editor context")
            ],
            "return_desc": "layer containing the merged image",
            "description": "Merges all layers in the editor's current frame to a newly allocated layer."
                            + "<br>This layer must be freed with <span class=api-fn>layerFree</span> after use."
        },
        {
            "return": apiType("VSPLayer*"),
            "name": "editorFlattenFrame",
            "params": [
                fnParam(apiType("VSPEditorContext*"), "editor", "the target editor context"),
                fnParam("int", "index", "the target frame index")
            ],
            "return_desc": "layer containing the merged image",
            "description": "Merges all layers in the selected frame to a newly allocated layer."
                            + "<br>This layer must be freed with <span class=api-fn>layerFree</span> after use."
        },
        {
            "return": "int",
            "name": "editorGetNumFrames",
            "params": [
                fnParam(apiType("VSPEditorContext*"), "editor", "the target editor context")
            ],
            "return_desc": "number of frames in the editor",
            "description": "Gets the number of frames in an editor session."
        },
        {
            "return": "int",
            "name": "editorGetActiveFrameIndex",
            "params": [
                fnParam(apiType("VSPEditorContext*"), "editor", "the target editor context")
            ],
            "return_desc": "the index of the current active frame",
            "description": "Gets the index of the current active frame in an editor session."
        }
    ],


    "brushes": [

    ],


    "other": [
        {
            "return": "void",
            "name": "util_free",
            "params": [
                fnParam("void*", "object", "the object to free")
            ],
            "description": "Frees the memory of an object allocated by voidsprite."
                            + "<br>Use this function when another API function description says so."
        },
        {
            "return": "void",
            "name": "vspPostNotification",
            "params": [
                fnParam("const char*", "title", "the title of the notification"),
                fnParam("const char*", "message", "the message of the notification"),
                fnParam("uint32", "color", "the color of the notification"),
                fnParam("int", "durationMS", "the duration of the notification in milliseconds"),
            ],
            "description": "Posts a notification to all windows with the specified title, message, color (0xAARRGGBB) and duration."
                            + "<br>Text must be encoded in UTF-8."
                            + "<br>It's safe to call this function from a thread."
        },
        {
            "return": "void",
            "name": "vspPostSuccessNotification",
            "params": [
                fnParam("const char*", "title", "the title of the notification"),
                fnParam("const char*", "message", "the message of the notification")
            ],
            "description": "Posts a success notification to all windows with the specified title and message."
                            + "<br>The notification will use the #D9FFBA color, last 5 seconds and use the success icon."
                            + "<br>Text must be encoded in UTF-8."
                            + "<br>It's safe to call this function from a thread."
        },
        {
            "return": "void",
            "name": "vspPostErrorNotification",
            "params": [
                fnParam("const char*", "title", "the title of the notification"),
                fnParam("const char*", "message", "the message of the notification")
            ],
            "description": "Posts an error notification to all windows with the specified title and message."
                            + "<br>The notification will use the #FFBABA color, last 5 seconds and use the success icon."
                            + "<br>Text must be encoded in UTF-8."
                            + "<br>It's safe to call this function from a thread."
        },
        {
            "return": "const char*",
            "name": "vspGetLocalizedString",
            "params": [
                fnParam("const char*", "key", "the target localization key")
            ],
            "return_desc": "a localized string corresponding to the localization key."
                            + "<br>\"--NO KEY\" if it does not exist.",
            "description": "Gets a localized string from the current active localization."
                + "<br>If the key doesn't exist, \"--NO KEY\" will be returned."
                + "<br>For example, passing \"vsp.cmn.error\" will return \"Error\"."
                + "<br>All available localization keys can be found in the <a target=\"_blank\" href=\"https://github.com/counter185/voidsprite/blob/main/freesprite/localization/localization_english.txt\">localization_english.txt</a> file."
                + "<br>This pointer is managed by voidsprite and must not be freed or modified."
        }
    ]
}

function makeApiDoc(a) {
    var fnParams = [];
    a["params"].forEach(element => {
        fnParams.push("<span class=api-type>"+element["type"] + "</span> " + element["name"]);
    });

    var paramDetails = []
    if (a["params"].length > 0) {
        a["params"].forEach(element => {
            paramDetails.push("<span class=api-param>"+element["name"] + "</span>: " + element["description"]);
        });
    }
    return ""
        + "<h3><span class=fn><span class=api-type>"+a["return"]+"</span> "+a["name"]+"("+fnParams.join(", ")+")</span></h3>\n"
        + (paramDetails.length > 0 ? "<div class=\"api-block api-params\">"+paramDetails.join("<br>")+"</div>\n" : "")
        + (a["return"] != "void" ? "<div class=\"api-block api-returns\"><span class=api-return>returns </span>"+a["return_desc"]+"</div>\n" : "")
        + "<p>"+a["description"]+"</p>";
}

function makeApiDocs(category) {
    var apiDocsRoot = document.getElementById("api_root");
    api_doc[category].forEach((element)=> {
        apiDocsRoot.innerHTML += makeApiDoc(element) + "\n";
    });
}

function listApiDocsFunctions(category) {
    var list = [];
    api_doc[category].forEach((element)=> {
        var params = []
        element["params"].forEach((e2) => {
            params.push("<span class=api-type>" + e2["type"] + "</span> " + e2["name"])
        });
        list.push("<span class=api-type>" + element["return"] + "</span> " + element["name"] + " ("+params.join(", ")+")");
    });
    return list.join("<br>");
}