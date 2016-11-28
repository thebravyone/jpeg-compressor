/**
* @Author: Guilherme Seradilha
* @Date:   25-Nov-2016 09:27:08
* @Last modified by:   Guilherme Seradilha
* @Last modified time: 28-Nov-2016 12:11:35
*/

'use strict'

var JPEGcompressor = function () {
  JPEGcompressor.Run = function (data, quality, callback) {
    // Validations
    if (!isDataURL(data)) {
      throw new TypeError('Image must be encoded as DataURL.')
    }
    if (Number.isNaN(quality) || quality > 1 || quality < 0) {
      throw new TypeError('Quality must be float between 0 and 1.')
    }
    if (typeof callback !== 'function') {
      throw new TypeError('Callback function is required.')
    }

    var img = new window.Image()
    var canvas = document.createElement('canvas')
    var context = canvas.getContext('2d')
    img.onload = function () {
      canvas.height = img.height
      canvas.width = img.width
      context.drawImage(img, 0, 0)
      callback(canvas.toDataURL('image/jpeg', quality))
    }
    img.src = data
  }
  // Checks if a string contains a DataURL object
  function isDataURL (s) {
    return !!s.match(/^\s*data:([a-z]+\/[a-z]+(;[a-z-]+=[a-z-]+)?)?(;base64)?,[a-z0-9!$&',()*+,;=\-._~:@/?%\s]*\s*$/i)
  }
  return JPEGcompressor
}

if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = JPEGcompressor
  }
  exports.JPEGcompressor = JPEGcompressor
}
