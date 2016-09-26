<template>
  <div>JPANEL!</div>
</template>

<script>
  var $ = require('jquery')
  require('jquery-ui/droppable')
  require('jquery-ui/draggable')
//  require('jquery-ui/themes/base/core.css')
//  require('jquery-ui/themes/base/resizable.css')
//  require('jquery-ui/themes/base/draggable.css')
  // require('jquery-ui/jquery-ui-touch')

  var jpanel = {
    bind: function (options) {
      var vm = this.vm
      var $el = $(this.el)

      $el.droppable({
        accept: '.dragme',
        zIndex: 600,
        //  activeClass: 'highlight',
        //  tolerance: 'pointer',
        drop: function (event, ui) {
          vm.$emit('drop', event, ui, $el)
        }
      })
    },
    unbind () {},
    update: function (o, n) {}
  }

  module.exports = jpanel

// export default {
//   data () {
//     return {}
//   }
// }
</script>

<style>
</style>
