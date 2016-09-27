<template>

  <div class='j-panel'
    v-bind:style='style_panel'>

      <!--<div class='card-title'>
          <i>drag_handle</i>
        <div class='title'>{{ title }}</div>
      </div>-->
      <div class='j-panel-header'>
        <div class='j-panel-title text-white bg-primary shadow-2'>
          <i>drag_handle</i>
          <span class='title'>{{ title }}</span>
        </div>        
        <div class='j-panel-toolbar text-white bg-light-primary shadow-2'>
          <button class='small'> 
            <i>gradient</i>
          </button>
          <button class='small'> 
            <i>palette</i>
          </button>        
        </div>
      </div>

      <div  class='j-panel-content '
            v-el:j-panel-content>
         
        <div class="card">
          <div class="card-title">
            $data
          </div>
          <div class="card-content bg-accent">
            <pre class="text-white" style="font-size:10px;line-height:10px;">{{ $data | json 1 }}</pre>
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

  require('jspanel3')

  var Ps = require('perfect-scrollbar')



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
      var content = self.$els.jPanelContent
      // Make Draggable
      console.log($(this.$el))
      $el
        .resizable()
        .draggable({
          // stack: '.card',
          // handle: '.drag-handle',
          // snap: true,
          // grid: [50, 50],
          // opacity: 0.45,
          // snapMode: 'outer',	// inner outer both
          // snapTolerance: 5,
          start: function (event, ui) {
            $el.removeClass('shadow-2')
            $el.addClass('shadow-4')
          },
          stop: function (event, ui) {
            $el.removeClass('shadow-4')
            $el.addClass('shadow-2')
          }
        })
      Ps.initialize(content)
    }
}
</script>

<style lang='styl'>

  @import '../../themes/app.variables.styl'
  
  div.j-panel
    position absolute
    background pink
    & > .j-panel-header
      width 100%
      height 1.95rem
      padding .2rem
      line-height 1.5rem
      font-size .95rem
      background-color $primary
      color white
    & > .j-panel-content
      position relative
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

