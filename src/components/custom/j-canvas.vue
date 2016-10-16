<template>
  <canvas :width='width' :height='height'></canvas>
</template>

<script>
export default {
  props: {
    id: null,
    width: 256,
    height: 256
  },
  data () {
    return {
      ctx: null,
      imgd: null,
      data: null
    }
  },
  ready () {
    this.ctx = this.$el.getContext('2d')
    this.imgd = this.ctx.getImageData(0, 0, this.width, this.height)
  }
}
</script>

<style>
</style>
