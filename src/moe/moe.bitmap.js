/**
 *
 * Take 2
 *
 */

exports.Bitmap = Bitmap

function Bitmap () {
  this._type = 'Bitmap'

  this.title = 'Untitled'

  this.source = null

  this.width = null //     256
  this.height = null // x   256
  this.length = null // = 65535

  this.pixels_key = null // Original pixels
  this.palette_key = null // Original palette
  this.imageData_key = null // context.getImageData(0,0,this.width, this.height).data

  this.pixels = null // Uint8Array[.length]   Output/used pixels
  this.palette = null // Uint8Array[256]     Output/used palette
  this.imageData = null // context.getImageData(0,0,this.width, this.height).data

  this.stats = {
    tags: null,
    colors: null,
    noiseLevel: null,
    average: null,
    high: null,
    low: null
  }
}

Bitmap.prototype = {

  constructor: Bitmap,

  init: function () {
    this.imageData = new ImageData(this.width, this.height)
  },

  fromArrayBuffer: function fromArrayBuffer (srcArrayBuffer) {
    // bitmap stream
    var dataview = new DataView(srcArrayBuffer)
    var offBits = dataview.getUint16(10, true)
    this.width = dataview.getUint32(18, true)
    this.height = dataview.getUint32(22, true)
    var bitCount = dataview.getUint16(28, true)
    // var totalColors = dataview.getUint16(46, true)
    var usedColors = dataview.getUint16(50, true)

    // pixels
    this.length = this.width * this.height
    this.pixels_key = new Uint8Array(this.length)
    for (var y = 0; y < 256; y++) {
      for (var x = 0; x < 256; x++) {
        this.pixels_key[x + y * 256] = dataview.getUint8(offBits + x + (255 - y) * 256) // Invert Y axis (BMP8 data goes from bottom->top)
      }
    }
    this.pixels = Uint8Array.from(this.pixels_key)

    // palette
    var length = bitCount === 0 ? 1 << bitCount : usedColors
    // var index = 54
    var tmpPalette = []
    for (var i = 0; i < length; i++) {
//      var b = dataview.getUint8(index++)
//      var g = dataview.getUint8(index++)
//      var r = dataview.getUint8(index++)
//      var a = dataview.getUint8(index++)

      // tmpPalette.push(Palette.getColorFromRGBA(r, g, b, a))
    }
    this.palette_key = tmpPalette
    this.palette = Array.from(tmpPalette)

    return this
  },

  fromFile: function fromFile (srcFile, callback) {
    var file = srcFile
    var reader = new FileReader()
    var title = file.name.replace(/\.bmp|_/g, '').toSentenceCase()
    var bitmap = this(function (reader, title) {
      reader.addEventListener('load', function (e) {
        bitmap.fromArrayBuffer(e.target.result)
        bitmap.title = title
        bitmap.init()
        callback(bitmap)
      }, false)
      reader.readAsArrayBuffer(file) // for BMP8 raw file
      // reader.readAsDataURL(file)  // for Image() object
    })(reader, title)
    return this
  },

  fromFileName: function fromFileName (filename, callback) {
    // Load bitmap programatically
    //
    var oReq = new XMLHttpRequest()
    oReq.open('GET', filename, true)
    oReq.responseType = 'arraybuffer'
    oReq.onload = function (oEvent) {
      var arrayBuffer = oReq.response // Note: not oReq.responseText
      if (arrayBuffer) {
        // var byteArray = new Uint8Array(arrayBuffer)
        var bitmap = new Bitmap().fromArrayBuffer(arrayBuffer)
        bitmap.title = filename.slice(-8).replace(/\.bmp|_/g, '').toSentenceCase()
        bitmap.init()
        callback(bitmap)
      }
    }
    oReq.send(null)
  },

  // OUTPUT
  //
  render: function render () {
    this.generateImageData(this.pixels, this.palette, this.imageData)
  },

  generateImageData: function generateImageData (pixels, palette, imageData) {
    // quick method just for the key image with no mapping etc.
    //
    var data = imageData.data

    var mapToIndex = 0

    for (var i = 0; i < 65535; i++) {
      var theColor = this.palette_key[pixels[i]]

      data[mapToIndex++] = theColor.r
      data[mapToIndex++] = theColor.g
      data[mapToIndex++] = theColor.b
      data[mapToIndex++] = 255
    }

    return imageData
  }

}

