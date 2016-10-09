<style lang="stylus">
  .collection-container
    min-height 200px

  .collection-list
    xdisplay flex
    xflex-wrap nowrap
    xflex-direction column

  .collection-item
    xflex-shrink 1
    display inline-block
    position relative
    width auto
    margin 4px
    min-height 48px
    padding 12px
    border-bottom 1px solid rgba(0,0,0,0.1)
    background white
    border-left 4px solid orange
    transition .3s

  .collection-list.list-type-grid
    background-color rgba(255, 255, 255, .95)
    xflex-flow row wrap // direction=  wrap=
    xjustify-content flex-start

  .collection-list.list-type-grid .collection-item
    width 80px
    height 80px
    flex-shrink 0
    background-color white // rgba(255,255,255,.4)






</style>

<template>
    <div class='collection-container'>
     <label>Collection</label>
      <div class='j-panel-toolbar text-primary'>
        <button><i>play</i></button>
      </div>
      <div class='collection-list list-type-grid' style='flex-grow: 1;'>
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
      .find('.collection-list')
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