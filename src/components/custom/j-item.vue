
<template>
    <!-- item is just "Bitmap" at the moment... make generic later -->
    <div class='frame' @click='onClick'>
      <img v-el:src :src="item.src" class='frame' @load='onImgLoad' width='256' height='256' />
      <canvas v-el:dest class='image' width='256' height='256'></canvas>
      <div class='item-label'>
        <div><input v-bind:id="'item.id" v-bind:value="item.name" v-on:input="onInput"></div>
        <div>sub label</div>
      </div>
    </div>
</template>

<script>
  var iq = require('image-q')
  import { addBitmap } from '../../store/actions'
  var ColorUtils = require('../../moe/utils/moe.utils.color.js')
  console.log(ColorUtils)
  export default {
    data () {
      return {
        ctx: null
      }
    },
    props: ['item', 'value'],
    components: {},
    ready () {
      this.imageData = this.$els.dest.getContext('2d').getImageData(0, 0, 255, 255)
    },
    methods: {
      onInput: function (event) {
        this.$emit('input', event.target.value)
      },
      onClick () {
        console.log(addBitmap)
      },
      onImgLoad () {
        //
        var img = this.$els.src
        var canvas = this.$els.dest
        canvas.getContext('2d').drawImage(img, 0, 0, 256, 256)

        // desired colors number

        // ... PREDEFEINED PALETTE
        //

        // * material colors
        //
        var colorFrom = parseInt(Math.random() * 150)
        var colorTo = parseInt(Math.random() * 150) + 151
        colorFrom = 0
        colorTo = 255
        var materialColors = ColorUtils.getMaterialColors(colorFrom, colorTo)

        // * iq.palette <= material colors
        var iqPalette = new iq.utils.Palette()
        for (var j = 0, l = materialColors.length; j < l; j++) {
          var color = materialColors[j]
          iqPalette.add(iq.utils.Point.createByRGBA(color.r, color.g, color.b, color.a))
        }
        // * iq.distance.?
        var iqDistance = new iq.distance.EuclideanRgbQuantWOAlpha()
        //     return new iq.distance.Euclidean();
        //     return new iq.distance.Manhattan();
        //     return new iq.distance.CIEDE2000();
        //     return new iq.distance.CIE94Textiles();
        //     return new iq.distance.CIE94GraphicArts();
        //     return new iq.distance.EuclideanRgbQuantWOAlpha();
        //     return new iq.distance.EuclideanRgbQuantWithAlpha();
        //     return new iq.distance.ManhattanSRGB();
        //     return new iq.distance.CMETRIC();
        //     return new iq.distance.PNGQUANT();
        //     return new iq.distance.ManhattanNommyde();
        // }

        // & iq.image.?
        var inPointContainer = iq.utils.PointContainer.fromHTMLCanvasElement(canvas)
        // var iqImage = new iq.image.ErrorDiffusionArray(iqDistance, iq.image.ErrorDiffusionArrayKernel.SierraLite)
        var iqImage = new iq.image.NearestColor(iqDistance)

        var outPointContainer = iqImage.quantize(inPointContainer, iqPalette)
        var uint8array = outPointContainer.toUint8Array()
        var imageData = canvas.getContext('2d').getImageData(0, 0, 256, 256)
        for (var i = 0; i < uint8array.length; i++) {
          imageData.data[i] = uint8array[i]
        }
        canvas.getContext('2d').putImageData(imageData, 0, 0)

        // draw palette
        //
        var paletteCanvas = ColorUtils.drawPixels(iqPalette.getPointContainer(), 16, 32)
        paletteCanvas.className = 'palette'
        this.$el.appendChild(paletteCanvas)
      }
    }
  }
</script>

<style lang="stylus">

</style>
