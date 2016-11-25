"use strict";

var JPEGcompressor = function(data, quality, callback) {

    if (!isBase64(data)) {
        throw 'Data must be encoded as base64.';
        return;
    }

    if (Number.isNaN(quality) || quality > 1 || quality < 0) {
        throw 'Quality must be float between 0 and 1.';
        return;
    }

    if (typeof callback !== 'function') {
        throw 'Callback function is required.';
        return;
    }

    var img = new Image(),
        canvas = document.createElement('canvas'),
        context = canvas.getContext('2d');

    img.onload = function() {
        canvas.height = img.height;
        canvas.width = img.width;
        context.drawImage(img, 0, 0);
        callback(canvas.toDataURL("image/jpeg", quality));
    }

    img.src = data;

    function isBase64(str) {
        try {
            return btoa(atob(str)) === str;
        } catch (err) {
            return false;
        }
    }
}

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports)
        exports = module.exports = JPEGcompressor;
    exports.JPEGcompressor = JPEGcompressor;
}
