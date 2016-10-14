
<style lang="stylus">



.frame.frame-type-grid
  padding 5px
  xbackground-color #f0f0f0

.frame.frame-type-grid > .frame
  xwidth 220px
  width 100%
  position relative
  margin 5px
  float left
  min-height 48px
  border-left 4px solid #2196F3
  box-shadow 0 3px 6px 3px rgba(1,1,1,0.4)
  background-color rgba(33, 150, 243, 0)
  background-color white
  box-shadow 4px 4px 2px rgba(0, 0, 0, 0.3)
  z-index 10
  padding 8px

.frame.frame-type-grid > .frame > img
  display none
  width 128px
  height 128px

.frame.frame-type-grid > .frame > canvas
  display inline-block
  margin 0
  padding 0

 .frame.frame-type-grid > .frame > canvas.image 
  width 120px
  height 120px

 .frame.frame-type-grid > .frame > canvas.palette 
  width 60px
  height 60px

.item-label 
  position absolute
  padding 4px
  top 88px
  height 40px
  width 120px
  color white
  font-size .8rem
  xfont-weight bold
  background-color  rgba(0, 0, 0, .35)

.sortable-ghost
  opacity 0.1
  z-index 0
  border 4px solid red

.sortable-chosen
  xborder 2px solid green
  box-shadow 10px 10px 25px rgba(0, 0, 0, 1)

.sortable-drag
  border 4px solid blue
  box-shadow 10px 10px 25px rgba(0, 0, 0, 1)

</style>

<template>
  <div v-sortable="options.sortable" class="frame frame-type-grid">
    <j-item v-for='(i, item) in model' :item='item'></j-item>
  </div>
</template>

<script>
  // var Bitmap = require('../../moe/moe.bitmap.js')
  var jItem = require('components/custom/j-item')
  export default {
    data () {
      return {
        options: {
          sortable: {
            animation: 550,
            ghostClass: 'sortable-ghost',  // Class name for the drop placeholder
            chosenClass: 'sortable-chosen',  // Class name for the chosen item
            dragClass: 'sortable-drag'  // Class name for the dragging item
          }
        },
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
      // var me = this
    }
  }
</script>

<!--
       ** SORTABLE OPTIONS **
        group: "name",  // or { name: "...", pull: [true, false, clone], put: [true, false, array] }
        sort: true,  // sorting inside list
        delay: 0, // time in milliseconds to define when the sorting should start
        disabled: false, // Disables the sortable if set to true.
        store: null,  // @see Store
        animation: 150,  // ms, animation speed moving items when sorting, `0` — without animation
        handle: ".my-handle",  // Drag handle selector within list items
        filter: ".ignore-elements",  // Selectors that do not lead to dragging (String or Function)
        draggable: ".item",  // Specifies which items inside the element should be draggable
        ghostClass: "sortable-ghost",  // Class name for the drop placeholder
        chosenClass: "sortable-chosen",  // Class name for the chosen item
        dragClass: "sortable-drag",  // Class name for the dragging item
        dataIdAttr: 'data-id',

        forceFallback: false,  // ignore the HTML5 DnD behaviour and force the fallback to kick in

        fallbackClass: "sortable-fallback",  // Class name for the cloned DOM Element when using forceFallback
        fallbackOnBody: false,  // Appends the cloned DOM Element into the Document's Body
        fallbackTolerance: 0 // Specify in pixels how far the mouse should move before it's considered as a drag.

        scroll: true, // or HTMLElement
        scrollFn: function(offsetX, offsetY, originalEvent) { ... }, // if you have custom scrollbar scrollFn may be used for autoscrolling
        scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
        scrollSpeed: 10, // px
        + events...
-->
