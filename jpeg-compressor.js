/**
* @Author: Guilherme Seradilha
* @Date:   25-Nov-2016 09:27:08
* @Email:  gserradilha@adagency.com.br
* @Last modified by:   Guilherme Seradilha
* @Last modified time: 25-Nov-2016 10:13:48
*/


"use strict";

var JPEGcompressor = function() {

    self.Run = function(data, quality, callback) {

        if (!isDataURL(data)) {
            throw 'Image must be encoded as DataURL.';
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
    }

    function isDataURL(s) {
        return !!s.match(/^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i);
    }

    return self;
}

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports)
        exports = module.exports = JPEGcompressor;
    exports.JPEGcompressor = JPEGcompressor;
}
