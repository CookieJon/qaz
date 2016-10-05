/*!
 * Vue-drag-and-drop-list.js v0.8.1
 * (c) 2016 Hejx
 * Released under the MIT License.
 * https://github.com/Alex-fun/vue-drag-and-drop-list#readme
 */

  'use strict'

  var MoeEditor = {
      loadBitmap: function(e) {
        for (var i=0, l=e.target.files.length;i<l;i++) {
          var file = e.target.files[i];
          var tmppath = URL.createObjectURL(file);
          serveBitmap(tmppath, function(bitmap) {
            this.bitmaps.push(bitmap);
          }.bind(this));
        }
      },
      addBitmap: function() {
        serveBitmap("img/bmp/newtest.bmp", function(bitmap) {
           this.bitmaps.push(bitmap);
        }.bind(this));
      },
      removeItem: function(item) {
        this.list.$remove(item)
      },
      changeFirst: function() {
        this.list[0] && (this.list[0].name = this.list[0].name.toUpperCase())
      }
  }

  module.exports = MoeEditor


