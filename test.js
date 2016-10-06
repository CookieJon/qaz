/**
 *
 * Take 2
 * 
 */

function Bitmap() {

  this._type = "Bitmap";

  this.title = "Untitled";

  this.source = null;

  this.width = null; //     256
  this.height = null; // x   256
  this.length = null; // = 65535

  this.pixels_key = null; // Original pixels
  this.palette_key = null; // Original palette
  this.imageData_key = null; //context.getImageData(0,0,this.width, this.height).data;

  this.pixels = null; // Uint8Array[.length]   Output/used pixels
  this.palette = null; // Uint8Array[256]     Output/used palette
  this.imageData = null; //context.getImageData(0,0,this.width, this.height).data;


  this.stats = {
    tags: null,
    colors: null,
    noiseLevel: null,
    average: null,
    high: null,
    low: null
  };

}

Bitmap.prototype = {

  constructor: Bitmap,

  init: function () {

    this.imageData = new ImageData(this.width, this.height);

  },

  fromArrayBuffer: function fromArrayBuffer(srcArrayBuffer) {

    // bitmap stream
    var dataview = new DataView(srcArrayBuffer);
    var offBits = dataview.getUint16(10, true);
    this.width = dataview.getUint32(18, true);
    this.height = dataview.getUint32(22, true);
    var bitCount = dataview.getUint16(28, true);
    var totalColors = dataview.getUint16(46, true);
    var usedColors = dataview.getUint16(50, true);

    // pixels
    this.length = this.width * this.height;
    this.pixels_key = new Uint8Array(this.length);
    for (var y = 0; y < 256; y++) {
      for (var x = 0; x < 256; x++) {
        this.pixels_key[x + y * 256] = dataview.getUint8(offBits + x + (255 - y) * 256); // Invert Y axis (BMP8 data goes from bottom->top)
      }
    }
    this.pixels = Uint8Array.from(this.pixels_key);

    // palette
    var length = bitCount === 0 ? 1 << bitCount : usedColors;
    var index = 54;
    var tmpPalette = [];
    for (var i = 0; i < length; i++) {

      var b = dataview.getUint8(index++);
      var g = dataview.getUint8(index++);
      var r = dataview.getUint8(index++);
      var a = dataview.getUint8(index++);

      tmpPalette.push(Palette.getColorFromRGBA(r, g, b, a));

    }
    this.palette_key = tmpPalette;
    this.palette = Array.from(tmpPalette);

    return this;

  },

  fromFile: function fromFile(srcFile, callback) {

    var file = srcFile;
    var reader = new FileReader();
    var title = file.name.replace(/\.bmp|_/g, '').toSentenceCase();
    var bitmap = this;
    (function (reader, title) {
      var title = title;
      reader.addEventListener("load", function (e) {
        bitmap.fromArrayBuffer(e.target.result);
        bitmap.title = title;
        bitmap.init();
        callback(bitmap);
      }, false);
      reader.readAsArrayBuffer(file); // for BMP8 raw file
      // reader.readAsDataURL(file);  // for Image() object

    })(reader, title);
    return this;

  },

  fromFileName: function fromFileName(filename, callback) {

    // Load bitmap programatically
    //
    var oReq = new XMLHttpRequest();
    oReq.open("GET", filename, true);
    oReq.responseType = "arraybuffer";
    oReq.onload = function (oEvent) {
      var arrayBuffer = oReq.response; // Note: not oReq.responseText
      if (arrayBuffer) {
        var byteArray = new Uint8Array(arrayBuffer);
        var bitmap = new Bitmap().fromArrayBuffer(arrayBuffer);
        bitmap.title = filename.slice(-8).replace(/\.bmp|_/g, '').toSentenceCase();
        bitmap.init();
        callback(bitmap);
      }
    };
    oReq.send(null);
  },


  // OUTPUT
  // 
  generateDom: function generateDom() {


    this.dom = dom;
    this.render();
    return dom;

  },


  render: function render() {

    this.generateImageData(this.pixels, this.palette, this.imageData);

  },


  generateImageData: function generateImageData(pixels, palette, imageData) {

    // quick method just for the key image with no mapping etc.
    //
    var data = imageData.data;

    var mapToIndex = 0;

    for (var i = 0; i < 65535; i++) {

      theColor = this.palette_key[pixels[i]];

      data[mapToIndex++] = theColor.r;
      data[mapToIndex++] = theColor.g;
      data[mapToIndex++] = theColor.b;
      data[mapToIndex++] = 255;

    }

    return imageData;

  }

}









//alert(a.data.source);

function BLitmap(buffer, container) {

  this.id; // Name+#
  this.name;

  this.bitmap; // Original bmp8 read from buffer

  this.w;
  this.h;
  this.l; // l = w*h   (65535 = 256 * 256)
  this.res; // 1, 2, 4, 8, 16, 32, 64, 256 pixels per pixel

  this.palette;
  this.res_color; // 1, 2, 4, 8, 16, 32, 64, 256 colors

  this.thePixels; // Which set of pixels is selected for working

  this.pixels_key;
  this.pixels1;
  this.pixels2;
  this.pixels3;

  this.canvas_key;
  this.canvas1;
  this.canvas2;
  this.canvas3;

  this.context_key;
  this.context1;
  this.context2;
  this.context3;

  this.canvasHouse;


  this.usePixelMap = false;
  this.useColorMap = false;

  // Decode bitmap data
  //
  //this.initialise(buffer, container);

}
var BM = Bitmap.prototype;


// BITMAP DATA
//
BM.initialise = function (buffer) {

  var datav = new DataView(buffer);
  var bitmapdata = {};
  // info header
  bitmapdata.type = datav.getUint16(0, true);
  bitmapdata.hdrSize = datav.getUint16(2, true);
  bitmapdata.reserved1 = datav.getUint16(6, true);
  bitmapdata.reserved2 = datav.getUint16(8, true);
  bitmapdata.offBits = datav.getUint16(10, true);
  // image header
  bitmapdata.size = datav.getUint32(14, true);
  bitmapdata.width = datav.getUint32(18, true);
  bitmapdata.height = datav.getUint32(22, true);
  bitmapdata.planes = datav.getUint16(26, true);
  bitmapdata.bitCount = datav.getUint16(28, true);
  bitmapdata.compression = datav.getUint32(30, true);
  bitmapdata.imageSize = datav.getUint32(34, true);
  bitmapdata.xPerMeter = datav.getUint32(38, true);
  bitmapdata.yPelsPerMeter = datav.getUint32(42, true);
  bitmapdata.totalColors = datav.getUint32(46, true);
  bitmapdata.usedColors = datav.getUint32(50, true);
  bitmapdata.stride = Math.floor((bitmapdata.bitCount * bitmapdata.width + 31) / 32) * 4;

  this.bitmapdata = bitmapdata;

  this.w = 256;
  this.h = 256;
  this.l = 256 * 256;
  this.res = 1;
  this.colors = 256;

  //this.pixels_key = new Uint8Array(buffer, bitmapdata.offBits);    //** original!

  this.pixels_key = new Uint8Array(this.l);
  // Invert Y axis (BMP8 data goes from bottom->top)
  for (var y = 0; y < 256; y++) {
    for (var x = 0; x < 256; x++) {
      this.pixels_key[x + y * 256] = datav.getUint8(bitmapdata.offBits + x + (255 - y) * 256);
    }
  }
  this.pixels1 = Uint8Array.from(this.pixels_key);
  this.pixels2 = Uint8Array.from(this.pixels_key);
  this.pixels3 = Uint8Array.from(this.pixels_key);

  this.canvas_key = document.createElement("canvas");
  this.canvas_key.width = 256;
  this.canvas_key.height = 256;
  this.canvas_key.id = "canvas_key";
  this.canvas_key.className = "canvas_key";
  this.context_key = this.canvas_key.getContext("2d");

  this.canvas1 = document.createElement("canvas");
  this.canvas1.width = 256;
  this.canvas1.height = 256;
  this.canvas1.id = "canvas1";
  this.canvas1.className = "canvas1";
  this.context1 = this.canvas1.getContext("2d");

  this.canvas2 = document.createElement("canvas");
  this.canvas2.width = 256;
  this.canvas2.height = 256;
  this.canvas2.id = "canvas2";
  this.canvas2.className = "canvas2";
  this.context2 = this.canvas2.getContext("2d");

  this.canvas3 = document.createElement("canvas");
  this.canvas3.width = 256;
  this.canvas3.height = 256;
  this.canvas3.id = "canvas3";
  this.canvas3.className = "canvas3";
  this.context3 = this.canvas3.getContext("2d");

  // Canvas House setup
  //this.canvasHouse = $("<div class='canvasHouse'><div class='thumbnail'></div><div class='canvases'></div><div class='title'></div></div>");

  // new polaroid!
  //
  //  this.canvasHouse = $("<figure><div class='canvases'><span id='canvas_key'></span><span id='canvas1'></span><span id='canvas2'></span><span id='canvas3'></span></div><<figcaption></figcaption><span class='info'><label><input type='checkbox' id='ch-usePixelMap' />PM</label><label><input type='checkbox' id='ch-useColorMap' />CM</label></span></figure");

  var str = "<figure>";
  str += "<figcaption></figcaption>";
  str += "<div class='canvases'><span id='canvas0'></span><span id='canvas1'></span></div>";
  str += "<span class='info nowrap'><label><input type='checkbox' id='ch-usePixelMap' />P</label><label>C<input type='checkbox' id='ch-useColorMap' /></label></span>";
  str += "</figure>";

  this.canvasHouse = $(str);



  this.canvasHouse.data("bitmap", this); // Reference from DOM element to this Object
  this.canvasHouse.draggable();

  this.canvasHouse.find("#canvas0").append(this.canvas_key);
  this.canvasHouse.find("#canvas1").append(this.canvas1);

  //    var oBitmaps = this.canvasHouse.find('.canvases');
  //
  //  oBitmaps.find("span:nth-child(1)").append(this.canvas1);
  //  oBitmaps.find("span:nth-child(2)").append(this.canvas2);
  //  oBitmaps.find("span:nth-child(3)").append(this.canvas3);
  //  


  //
  // generate the palette
  //


  console.log("LOADING BITMAP'S PALETTE:");

  var length = bitmapdata.bitCount === 0 ? 1 << bitmapdata.bitCount : bitmapdata.usedColors;
  var index = 54;
  var tmpPalette = [];

  for (var i = 0; i < length; i++) {

    var b = datav.getUint8(index++);
    var g = datav.getUint8(index++);
    var r = datav.getUint8(index++);
    var a = datav.getUint8(index++);

    var color = paletteManager.constructColorFromRGB(r, g, b, a);

    tmpPalette.push(color);


  }
  this.palette = tmpPalette;
  this.palette_key = tmpPalette.slice();


}





BM.setUsePixelMap = function (flag) {
  this.usePixelMap = flag;
  this.canvasHouse.find("input#ch-usePixelMap").prop("checked", flag);
  //    if (flag==true) {
  //        this.pixels1 = Mapper.unmap(this.pixels2 );
  //    } else {
  //        this.pixels1 = Mapper.map(this.pixels2 );
  //    }
  this.render();

}


BM.setUseColorMap = function (flag) {
  this.useColorMap = flag;
  this.canvasHouse.find("input#ch-useColorMap").prop("checked", flag);
  //    if (flag==true) {
  //        for (var i=0; i<65536; i++) {
  //            this.pixels1[i] = (this.pixels1[i] - Mapper.mappedColors[i] + 256) % 256;
  //        }  
  //    } else {
  //        
  //        for (var i=0; i<65536; i++) {
  //            this.pixels1[i] = (this.pixels1[i] + Mapper.mappedColors[i] + 256) % 256;
  //        }
  //    }

  this.render();
}

BM.applyColorMap = function (amount) {
  // 1 = map
  // 2 = unmap
  var amount = (amount === undefined) ? 1 : amount;

  for (var i = 0; i < 65536; i++) {
    this.pixels1[i] = (this.pixels1[i] + (Mapper.mappedColors[i] * amount) + 256) % 256;
  }

};

BM.getMappedIndex = function (srcIndex) {
  // returns same if no ma;
  return (this.usePixelMap == false) ? srcIndex : (Mapper.mappedCoords[srcIndex * 2] + 256 * Mapper.mappedCoords[srcIndex * 2 + 1]);
}

BM.getUnmappedIndex = function (srcIndex) {
  // returns same if no ma;
  return (this.usePixelMap == false) ? srcIndex : (Mapper.mappedCoords[srcIndex * 2] + 256 * Mapper.mappedCoords[srcIndex * 2 + 1]);
}



// EFFECTS
BM.Xpixelate = function (level) {

  var bitmap = this.bitmap;

  var pixels = Uint8Array.from(this.pixels_key);

  for (var y = 0; y < bitmap.height; y += level) {
    for (var x = 0; x < bitmap.width; x += level) {

      var index = x + 256 * y;
      var pixel = parseInt(pixels[index]);

      for (var yy = 0; yy < level; yy++) {
        for (var xx = 0; xx < level; xx++) {
          pixels[x + xx + 256 * (y + yy)] = pixel;
        }
      }
      //log("@ " + x + ", " + y + "    pix " + pixel + " => " + pixelDest[x,y]);
    }

  }

  this.pixels = pixels;
  this.render();
  //this.render(contexts[1], this.bitmap);

}

BM.restore = function () {
  this.pixels = Uint8Array.from(this.pixels_key);
  this.render();
}

BM.transform = function () {


}