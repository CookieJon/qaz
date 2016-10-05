<template>

  <!-- j-panel -->
  <div class='j-panel non-selectable item-collapsible shadow-transition hoverable-5' 
     v-bind:style='computedStyle'  >

    <div class='j-panel-header' @dblClick='toggle()' v-el:header>

      <div class='j-panel-toolbar j-panel-title'>
        <i class="">{{ icon }}</i>
        <span class="title">{{ title + ' [' + _static._currentPanel.id + ']' }}</span>
        <i class="item-secondary">menu</i>
        <i class="item-secondary" :class="{'rotate-180': expanded}">keyboard_arrow_down</i>
      </div>

      <slot name="toolbar">
<!--
       <div class='j-panel-toolbar'>

       </div>
-->
      </slot>

    </div>


    <div class='j-panel-content' v-el:content>

       <div class='j-content-inner'>

<!--      <div v-for="i in 25" style="width:50px;height:50px;margin:5px; background:pink; border:2px solid orange;display:inline-block;">HI</div>-->

          <ul v-dnd-list :dnd-list="images" :dnd-horizontal-list="true">
              <div v-dnd-draggable v-for="item in images"
                  :dnd-draggable="item"
                  :dnd-index="$index"
                  :dnd-data="images"
                  dnd-selected="selectedEvent"
                  dnd-effect-allowed="move"
                  class="j-draggable"
                  v-bind:class="{'selected': selected === item}">
                  {{item.label}}
              </div>
              <div class=" j-draggable dndPlaceholder red">Custom placeholder</div>
          </ul>
        
         <slot></slot>
      
       </div>
       
    </div>

    <div class='j-panel-footer' v-el:footer>
      <div class='j-panel-toolbar'>
        Footer Toolbar
      </div>
    </div>

  </div>

</template>


<script>
  var _static = require('./j-panel-static.js')
  var $ = require('jquery')
  require('malihu-custom-scrollbar-plugin')
  require('jquery-mousewheel')
  require('jquery-ui/draggable')
  require('jquery-ui/resizable')
  require('jquery-ui-css/core.css')
  require('jquery-ui-css/theme.css')
  require('jquery-ui-css/draggable.css')
  require('jquery-ui-css/resizable.css')
  // require('jquery-ui-touch-punch')
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
      },
      expanded: {
        type: Boolean,
        default: true,
        twoWay: true,
        coerce: Boolean
      },
      icon: String,
      img: String,
      avatar: String,
      label: String
    },
    data () {
      return {
        images: [
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
        style: {
          x: 10,
          y: 10,
          width: 300,
          height: 400,
          header_height: 40,
          zIndex: 10
        },
        test: null,
        id: null,
        order: 0,
        _static: null
      }
    },
    computed: {
      computedStyle () {
        var s = this.style
        return {
          x: s.x,
          y: s.y,
          width: s.width + 'px',
          height: this.expanded ? s.height + 'px' : '45px',
          'z-index': this.order
        }
      }
    },
    created () {
      _static._panels.push(this)
      _static._panelCount++
      _static._currentPanel = this
      this._static = _static
      this.order = _static._panels.length - 1
      this.id = 'Panel-00' + _static._panelCount
      console.log('CREATED j-PANEL:', this.order, this)
    },
    ready () {
      var vm = this
      var $el = $(vm.$el)
      var $content = $(vm.$els.content)
      this.header_height = $(vm.$els.header).outerHeight()

      $content.mCustomScrollbar({
        theme: 'dark'
      })
      $el
        // Resizable
        //
        .resizable({
          stop (event, ui) {
            vm.style.width = ui.size.width
            vm.style.height = ui.size.height
            console.log(ui.size)
          },
          handles: 'all'
          // helper: '.resizable-helper'
        })
        .on('mouseover', function () {
          console.log('mousedown', vm)
          vm.moveToFront()
        })
        .draggable({
          handle: '.j-panel-header',
          start: function (event, ui) {
            $el.removeClass('shadow-4')
            $el.addClass('shadow-2')
          },
          stop: function (event, ui) {
            $el.removeClass('shadow-4')
            $el.addClass('shadow-2')
          }
        })
    },
    methods: {
      toggle () {
        this.expanded = !this.expanded
        console.log(this.computedStyle)
      },
      moveToFront () {
        var _panels = this._static._panels
        console.log('CLICKY! = ' + _panels.length)
        _panels.push(_panels.splice(this.order, 1)[0])
        //  array.push(array.splice(array.indexOf(element), 1)[0]);

        _panels.forEach(function (value, index) {
          value.order = index
          console.log(index, value.title, 'order=', value.order)
        })
      },
      fetchPic () {
        this.$http.get('/path/to/api').then(function (response) {
          this.pic_url = response
        }.bind(this))
      }
    }
  }
</script>


<style lang="stylus">
.j-draggable {
  width:50px;height:50px;margin:5px; background:pink; border:2px solid orange;display:inline-block;position:relative;
}
.layout-view
  scroll none
  -webkit-backdrop-filter grayscale(1)
  backdrop-filter grayscale(1)

.bg-glass
  background rgba(30, 30, 30, .3)
  backdrop-filter grayscale(100%) blur(4px)


.card-title
  background $blue

</style>

<style lang="less">

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
ul[dnd-list] li:last-child {
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

<style>
  .ripple {
    position: absolute;
    background: rgba(0,0,0,.25);
    border-radius: 100%;
    -webkit-transform: scale(0);
    -ms-transform: scale(0);
    transform: scale(0);
    pointer-events: none;
  }

  .ripple.show {
    -webkit-animation: ripple .5s ease-out;
    animation: ripple .5s ease-out;
  }

  @-webkit-keyframes,
  @keyframes
    ripple { to {
     -webkit-transform: scale(1.5);
     transform: scale(1.5);
     opacity: 0;
    }
  }
</style>


<style lang='styl'>

  @import '../../themes/app.variables.styl'

  .ui-draggable-handle
   cursor pointer

  .j-panel
    xborder 6px dotted red
    position absolute
    overflow hidden
    display flex
    flex-wrap nowrap
    flex-direction column
    zjustify-content flex-start
    align-items stretch
    align-content flex-start
    zbackground-clip border-box
    min-width 250px
    border-top-left-radius 6px
    border-top-right-radius 6px
    xbox-shadow 0 3px 6px 3px rgba(1,1,1,0.4)
    transition box-shadow .2s ease-in-out 0s
    z-index 5

  .j-panel-header
    xborder 4px dotted orange
    flex-shrink 0
    background $primary
    z-index 10

  .j-panel-content
    xborder 2px dotted yellow
    overflow hidden
    padding 2px
    flex-grow 1
    background white
    z-index 0
    padding-top 0
    xperspective 100px
    xtransform translateX( -100px )
    z-index 9

  .j-panel-footer
    xborder 4px dotted pink
    height 36px
    flex-shrink 0
    background $primary
    color white

  .j-panel-toolbar
    xborder 2px dotted orange
    display flex
    flex-wrap nowrap
    flex-direction row
    position relative
    zjustify-content flex-start
    align-items center
    align-content flex-start
    min-height 36px
    padding 0px
    background lighten($primary, 30%)
    //background  $primary
    color white
    font-size 1rem
    z-index 9

/*
    & > :not(:last-child)
      margin-right 4px
*/

    & > .title
      margin-right auto

/*
    & > button.circular.small
      width 20px
      height 20px
*/

  &.j-panel-title
    background $primary
    z-index 10
    padding 4px
    // box-shadow 0 1px 3px 2px rgba(1,1,1,0.4)


</style>


<style src="malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css"></style>
<style>
/* For the "inset" look only */
html {
    overflow: auto;
}
body {
    position: absolute;
    top: 20px;
    left: 20px;
    bottom: 20px;
    right: 20px;
    padding: 30px; 
    overflow-y: scroll;
    overflow-x: hidden;
}

/* Let's get this party started */
::-webkit-scrollbar {
    width: 12px;
}
 
/* Track */
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    -webkit-border-radius: 5px;
    border-radius: 5px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    xbackground: rgba(0,0,0,0.8); 
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
	background: rgba(255,0,0,0.4); 
}
</style>