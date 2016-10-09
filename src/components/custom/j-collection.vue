<style lang="stylus">
  .collection-container
    border 4px dotted crimson
</style>

<template>
    <div class='collection-container scroll fit'>
       
      <pre class='bg-primary text-white'>{{ model | json 2 }} </pre>
        <div class='collection-sortable'>
            <j-item v-for='(i, item) in model' :item='item' ></j-item>
        </div>
    </div>
</template>

<script>
var $ = require('jquery')
require('jquery-mousewheel')
require('malihu-custom-scrollbar-plugin')
require('jquery-ui/draggable')
require('jquery-ui/resizable')
require('jquery-ui/sortable') // NB Not used at the moment.
require('jquery-ui-css/core.css')
require('jquery-ui-css/theme.css')
require('jquery-ui-css/draggable.css')
require('jquery-ui-css/sortable.css')
require('jquery-ui-css/resizable.css')
var Bitmap = require('../../moe/moe.bitmap.js')
console.log(Bitmap)
var jItem = require('components/custom/j-item')
export default {
  data () {
    return {
      sortFromIndex: null,
      sortToIndex: null
    }
  },
  props: {
    model: {
      type: [Array, Object],
      required: true
    }
  },
  components: {
    jItem
  },
  ready () {
    var me = this
    $(this.$el)
      .find('.collection-sortable')
      .sortable({
        forcePlaceholderSize: true,
        forceHelperSize: true,
        placeholder: '.ui-sortable-placeholder',
        delay: 150,
        // handle: '.drag-handle',
        start: function (event, ui) {
          me.sortFromIndex = ui.item.index()
          console.log('From ' + ui.item.index())
        },
        update: function (event, ui) {
          me.sortToIndex = ui.item.index()
          console.log('To ' + ui.item.index())
          // Move array element from->to routine
          // NB: Vue maintains binding with Array methods, push(), splice(), etc.
          if (me.sortToIndex >= me.model.length) {
            var k = me.sortToIndex - me.model.length
            while ((k--) + 1) {
              me.model.push(undefined)
            }
          }
          me.model.splice(me.sortToIndex, 0, me.model.splice(me.sortFromIndex, 1)[0])
        }
      })
      .disableSelection()
  }
}
  </script>