<template>

  <div class='j-panel' v-bind:style='style_panel'>
    <div class='j-panel-header'>
      <button class='text-white'>
        <i>menu</i>
      </button>
      <div class='title'>{{ title }}</h2>
    </div>
    <div class='j-panel-toolbar'>
      
    </div>
    <div class='j-panel-content'>
             <!-- #data -->
      <div class="card" style="max-width:300px;">
        <div class="card-title">
          $data
        </div>
        <div class="card-content bg-lighter-primary card-force-top-padding">
        <pre style="font-size:10px;line-height:10px;">{{ $data | json 1 }}</pre>
        </div>
      </div>
 
    </div>
    <div class='j-panel-footer'>
      
    </div>    
  </div>
</template>

<script>
  var $ = require('jquery')
  require('jquery-ui/draggable')
  require('jquery-ui/resizable')
  require('jquery-ui-css/core.css')
  require('jquery-ui-css/theme.css')
  require('jquery-ui-css/draggable.css')
  require('jquery-ui-css/resizable.css')
  export default {
    props: {
      title: {
        type: String
      }
    },
    data () {
      return {
        style_panel: {
          width: '200px',
          height: '400px'
        }
      }
    },
    ready () {
      var self = this
      var $el = $(self.$el)
      // Make Draggable
      $el
        .draggable({
          // stack: '.card',
          // handle: '.drag-handle',
          // snap: true,
          // grid: [50, 50],
          opacity: 0.45,
          snapMode: 'outer',	// inner outer both
          snapTolerance: 5,
          start: function (event, ui) {
            $el.removeClass('shadow-2')
            $el.addClass('shadow-4')
          },
          stop: function (event, ui) {
            $el.removeClass('shadow-4')
            $el.addClass('shadow-2')
          }
        })
        .resizable()
    }
}
</script>

<style lang='styl'>

  @import '../../themes/app.variables.styl'

  div.j-panel
    background white
    & > .j-panel-header
      width 100%
      height 32px
      background-color $primary
      color white
      & > div
        display inline-block
    & > .j-panel-content
      background-color $lighterPrimary
    & > .jpanel-footer
      background-color $lighterPrimary

</style>
//
//    // Make Resizable
//    $el.resizable({
//      ghost: true,
//      // animate: true,
//      // animateDuration: 'fast',
//      // animateEasing: 'easeOutBounce',
//      // grid: [10, 10],
//      containment: $('body'),
//      // autoHide: true,
//      handles: 'all',
//      helper: '.resizable-helper'
//    })
    // $(function () {
    //   //  console.log($(self.$el).draggable())
    // })
   // Interact('.card').draggable()
 // }

