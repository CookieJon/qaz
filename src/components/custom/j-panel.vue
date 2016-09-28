<template>

  <div class='j-panel' v-bind:style='style_panel'>
    <header>
      Header
    </header>
    <header>
      Header
    </header>    
    <div class='content' v-el:content>
      Content<br />
      Content<br />
      Content<br />
      Content<br />
      Content<br />
      Content<br />
      Content<br />
      Content<br />
      Content<br />
      Content<br />
      Content<br />
      Content<br />
      Content<br />
      Content<br />
      Content<br />
      Content<br />
      Content<br />
      Content<br />
      Content<br />
      Content<br />
      Content<br />
      Content<br />
      Content<br />      
    </div>
    <footer>
      Footer
    </footer>
  </div>
<!--
      <div class='j-panel-header'>
        <div class='j-panel-title'>
          <i>drag_handle</i>
          <span class='title'>{{ title }}</span>
        </div>        
        <div class='j-panel-toolbar'>
          <button class='small'> 
            <i>gradient</i>
          </button>
          <button class='small'> 
            <i>palette</i>
          </button>        
        </div>
      </div>
      <div  class='j-panel-content'>
          asdasdasdad
        <!--<div class="card">
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
    -->
</template>

<script>
  var $ = require('jquery')
  require('jquery-mousewheel')
  require('malihu-custom-scrollbar-plugin')
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
          width: '300px',
          height: '380px'
        }
      }
    },
    ready () {
      var self = this
      var $el = $(self.$el)
      var $content = $(self.$els.content)
      $content.mCustomScrollbar({
        theme: 'dark'
      })
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
    }
}
</script>

<style lang='styl'>

  @import '../../themes/app.variables.styl'
  

  div.j-panel
    position absolute
    display flex
    flex-direction column
    overflow hidden
    border-radius 2px !important
    & > header
      min-height 32px
      background $primary
      color white
      shadow 6px 6px black
    & > .content
      flex-grow 1
      width 200px
      height 400px
      overflow auto
      background white
    & > footer
      min-height 32px
      background $primary-dark
      color white
      
  div.jx-panel
    position absolute
    -webkit-backdrop-filter blur(4px)
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
      background white
      overflow scroll
      top 0
      bottom 0
    & > .jpanel-footer
      background-color $lighterPrimary


</style>
//
.bg-glass
  background rgba(30, 30, 30, .3)
  backdrop-filter grayscale(100%) blur(4px)
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

