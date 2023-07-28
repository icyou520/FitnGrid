function resizeAndDistribute(items) {
    // Get the artboard dimensions
    var artboardRect = app.activeDocument.artboards[0].artboardRect;
    var artboardWidth = artboardRect[2] - artboardRect[0];
    var artboardHeight = artboardRect[1] - artboardRect[3];

    var itemCount = items.length;
    var columns = Math.ceil(Math.sqrt(itemCount));
    var rows = Math.ceil(itemCount / columns);

    var maxItemWidth = artboardWidth / columns;
    var maxItemHeight = artboardHeight / rows;

    for (var i = 0; i < itemCount; i++) {
        var item = items[i];

        // Calculate the scaling factor based on the aspect ratio
        var scaleWidth = maxItemWidth / item.width;
        var scaleHeight = maxItemHeight / item.height;
        var scaleFactor = Math.min(scaleWidth, scaleHeight);

        // Resize the object while maintaining its aspect ratio
        item.resize(
            scaleFactor * 100,
            scaleFactor * 100,
            true, true, true, true,
            scaleFactor * 100,
            Transformation.CENTER
        );

        // Determine grid position
        var col = i % columns;
        var row = Math.floor(i / columns);

        // Position the object
        var posX = col * maxItemWidth + (maxItemWidth - item.width) / 2;
        var posY = -(row * maxItemHeight + (maxItemHeight - item.height) / 2);
        item.position = [posX, posY];
    }
}

// Check if there are selected objects
if (app.activeDocument.selection.length > 0) {
    var selectedItems = app.activeDocument.selection;
    resizeAndDistribute(selectedItems);
} else {
    alert("Please select one or more objects to resize and distribute.");
}
