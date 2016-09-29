<template>

  <div class='j-panel' v-bind:style='style_panel'>
    <header>{{ title }}</header>
    <div class='content' v-el:content >
      <slot>MT</slot>
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
      // $content = $el
      $content.mCustomScrollbar({
        theme: 'dark'
      })
      // Make Draggable
      console.log($(this.$el))
      $el
        .resizable()
        .draggable({
          handle: 'header',
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

<style src="malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css"></style>

<style lang='styl'>

  @import '../../themes/app.variables.styl'
  
  div.j-panel
    position absolute
    display flex
    flex-direction column
    overflow hidden
    border-radius 2px !important
    font-size 12px
    min-width 300px
    background pink
    & > header
      min-height 32px
      padding 4px
      background $primary
      color white
      shadow 6px 6px black
    & > .content
      overflow auto
      flex-grow 1
      background lemonchiffon
    & > footer
      min-height 32px
      background $primary-dark
      color white


</style>
