
<style lang="stylus">



.ui-resizable
  position absolute

/* frame-type-grid */
.frame.frame-type-grid
  padding 5px
  xbackground-color #f0f0f0

.frame.frame-type-grid > .frame
  width calc(33% - 6px)
  max-width 240px
  margin 3px
  height auto
  position relative
  float left
  min-height 48px
  border-left 4px solid #2196F3
  box-shadow 0 3px 6px 3px rgba(1,1,1,0.4)
  background-color white
  box-shadow 4px 4px 2px rgba(0, 0, 0, 0.3)
  z-index 10
  padding 0px

.frame.frame-type-grid > .frame > img
  display none
  width 100%
  height 11px

.frame.frame-type-grid > .frame > canvas
  display inline-block
  margin 0
  padding 0

.frame.frame-type-grid > .frame > canvas.image
  width 100%

.frame.frame-type-grid > .frame > canvas.palette
  position absolute
  width 24%
  height 24%
  right 6px
  margin-top -30%
  background white



.frame.frame-type-list > .frame
  width 100%
  height 180px
  margin 6px
  position relative
  border-left 4px solid #2196F3
  box-shadow 0 3px 6px 3px rgba(1,1,1,0.4)
  background-color rgba(33, 150, 243, 0)
  background-color white
  box-shadow 4px 4px 2px rgba(0, 0, 0, 0.3)
  z-index 10
  padding 0px

.frame.frame-type-list > .frame > img
  display none
  height 11px
.frame.frame-type-list > .frame > canvas
  height 180px
  position relative
  border-left 6px solid #2196F3
  background-color white
  z-index 10
  padding 0px
.frame.frame-type-list > .frame > canvas.palette
  display none

.item-label
  position absolute
  height 30%
  padding 2px
  margin-top -30%
  width 100%
  color white
  font-size .8rem
  background-color  rgba(0, 0, 0, .35)
  z-index 12

.frame.frame-type-list > .frame > .item-label
  height 80px
  width 180px
  padding 2px
  margin-left 6px
  margin-top -80px

.sortable-ghost
  opacity 1
  z-index 0

.sortable-chosen
  box-shadow 10px 10px 25px rgba(0, 0, 0, 1)

.sortable-drag
  opacity 1
  box-shadow 10px 10px 25px rgba(0, 0, 0, 1)

</style>

<template>
  <div>
    <pre class="text-white">{{ this.model || json 2}}</pre>
    <div v-sortable="options.sortable" @sort='onSort' class="frame {{ this.class }}">
      <j-item v-for='(i, item) in model' :item='item'></j-item>
    </div>
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
      class: {
        type: String,
        default: 'frame-type-grid'
      },
      model: {
        type: [Array, Object],
        required: true,
        sync: true
      }
    },
    components: {
      jItem
    },
    ready () {
      // var me = this
    },
    methods: {
      onSort (e) {
        var from = e.oldIndex
        var to = e.newIndex
        this.model.splice(to, 0, this.model.splice(from, 1)[0])
        console.log(e)
      }
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
