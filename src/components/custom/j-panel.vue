<template>
  <!--
  
    # j-panel - container of a model.

    - width/height
    - draggable
    - resizable
    - expand/collapse
    - maximise/minimise

    - Form of: 
      -  draggable / collapsible panel 
      -  list item - horizontal / vertical

  -->

  <div class='j-panel' v-bind:style='style_panel'>
    <header>{{ title }}</header>
    <div class='content' v-el:content>
      <slot></slot>
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

<script type='text/javascript'>
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
      },
      x: {
        default: 88
      },
      y: {
        default: 88
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
    created () {
      console.log('Created')
      console.log(this)
      this.style_panel.x = this.x
    },
    ready () {
      var vm = this
      var $el = $(vm.$el)
      var $content = $(vm.$els.content)
      // $content = $el
      $content.mCustomScrollbar({
        theme: 'dark'
      })
      // Make Draggable
      console.log($(this.$el))
      $el
        .css({left: this.x + 'px', top: this.y + 'px'})
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
    background white
    & > header
      min-height 32px
      padding 4px
      background $primary
      color white
      shadow 6px 6px black
    & > .content
      overflow auto
      flex-grow 1
      background $tertiary
    & > footer
      min-height 32px
      background $primary-dark
      color white


</style>
