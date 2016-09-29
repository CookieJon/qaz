<template>
  <!-- root node required -->
  <div>
    <!-- your content -->
    <div class="layout-padding">


    <ul id="sortable">
      <li class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>Item 1</li>
      <li class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>Item 2</li>
      <li class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>Item 3</li>
      <li class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>Item 4</li>
      <li class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>Item 5</li>
      <li class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>Item 6</li>
      <li class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>Item 7</li>
    </ul>

</template>

<script>
var jPanel = require('components/custom/j-panel')
export default {
  components: {
    jPanel
  },
  data () {
    return {
      'selected': null,
      'lists': {
        'A': [
          {
            'label': 'Item A1'
          },
          {
            'label': 'Item A2'
          },
          {
            'label': 'Item A3'
          },
          {
            'label': 'Item A4'
          }
        ],
        'B': [
          {
            'label': 'Item B1'
          },
          {
            'label': 'Item B2'
          },
          {
            'label': 'Item B3'
          },
          {
            'label': 'Item B4'
          }
        ]
      }
    }
  }
}
</script>

<style>

/** 
 * For the correct positioning of the placeholder element, the dnd-list and
 * it's children must have position: relative
 */
ul[dnd-list],
ul[dnd-list] > li {
	position: relative;
}
/**
 * The dnd-list should always have a min-height,
 * otherwise you can't drop to it once it's empty
 */
ul[dnd-list] {
    padding-left: 0px;
		min-height: 40px;
}
/**
 * The dndDraggingSource class will be applied to
 * the source element of a drag operation. It makes
 * sense to hide it to give the user the feeling
 * that he's actually moving it.
 */
ul[dnd-list] .dndDragging{
    opacity: 0.7;
}
ul[dnd-list] .dndDraggingSource {
    display: none;
}
/**
 * An element with .dndPlaceholder class will be
 * added to the dnd-list while the user is dragging
 * over it.
 */
ul[dnd-list] .dndPlaceholder {
    display: block;
    background-color: #eee;
    min-height: 41px;
}
ul[dnd-list] .dndPlaceholder.red{
  color: #F26B63;
}
/**
 * The dnd-lists's child elements currently MUST have
 * position: relative. Otherwise we can not determine
 * whether the mouse pointer is in the upper or lower
 * half of the element we are dragging over. In other
 * browsers we can use event.offsetY for this.
 */
ul[dnd-list] li {
    background-color: #fff;
    color: #35495E;
    border-bottom: 1px solid #41B883;
    display: block;
    padding: 10px 15px;
}
ul[dnd-list] li:last-child{
    border-bottom: none;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
}
/**
 * Show selected elements in green  有问题的
 */
ul[dnd-list] li.selected {
    background-color: #dff0d8;
    color: #3c763d;
}
</style>

