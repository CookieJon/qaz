<template>

  <!-- j-panel -->
  <div
    class='j-panel non-selectable xitem-collapsible xshadow-transition xhoverable-5'
    v-bind:style='computedStyle'
  >
    <!-- j-panel-header -->
    <div class='j-panel-header' @dblClick='toggle()' v-el:header>

      <!-- j-panel-title -->
      <div class='j-panel-toolbar j-panel-title'>
        <i class="item-primary">{{ icon }}</i>
        <span class="title">{{ title }}</span>
        <i class="item-secondary">menu</i>
        <i class="xitem-secondary" style="font-size:1.2rem; margin-left:auto;" :class="{'rotate-180': expanded}">keyboard_arrow_down</i>
        <i class="item-secondary">more_vert</i>
      </div>

      <!-- user toolbars -->
      <slot name="header">
        <!-- <div class='j-panel-toolbar'></div> -->
      </slot>

    </div>

    <!-- j-panel-content -->
    <div class='j-panel-content' v-el:content>

        <div class='j-panel-content-inner scroll' v-el:content-inner>

          <!-- user content -->
          <slot name="content"></slot>

       </div>

    </div>

    <!-- j-panel-footer -->
    <div class='j-panel-footer' v-el:footer>

      <!-- user toolbars -->
      <slot name="footer"></slot>

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
      x: {type: Number, default: 88},
      y: {type: Number, default: 88},
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
      this.style.x = _static._panels.length * 200
      this._static = _static
      this.order = _static._panels.length - 1
      this.id = 'Panel-00' + _static._panelCount
      console.log('CREATED j-PANEL:', this.order, this)
    },
    ready () {
      var vm = this
      var $el = $(vm.$el)
      // var $content = $(vm.$els.content)
      this.header_height = $(vm.$els.header).outerHeight()

      // Scrollable
      //
      // $(vm.$els.contentInner)
      $el
        .find('.scroll')
        .wrapInner('<div></div>')
        .mCustomScrollbar({
          theme: 'dark'
        })

      // Resizable
      //
      $el
        .resizable({
          stop (event, ui) {
            vm.style.width = ui.size.width
            vm.style.height = ui.size.height
            console.log(ui.size)
          },
          handles: 'all'
          // helper: '.resizable-helper'
        })
        .on('mousedown', function () {
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
        _panels.push(_panels.splice(this.order, 1)[0])
        //  array.push(array.splice(array.indexOf(element), 1)[0]);

        _panels.forEach(function (value, index) {
          value.order = index
          // console.log(index, value.title, 'order=', value.order)
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
    // border-top-left-radius 6px
    // border-top-right-radius 6px
    xbox-shadow 0 3px 6px 3px rgba(1,1,1,0.4)
    transition box-shadow .2s ease-in-out 0s
    z-index 5
    width 100%
    background-color rgba(96, 125, 139, 0.22)
    box-shadow 0 0 25px rgba(0, 0, 0, 0.1), inset 0 0 1px rgba(255, 255, 255, 0.6)

  .j-panel-header
    xborder 4px dotted orange
    flex-shrink 0
    xbackground $primary
    z-index 10

  .j-panel-content
    xborder 2px dotted yellow
    overflow hidden
    padding 2px
    flex-grow 1
    display flex
    flex-wrap nowrap
    flex-direction column
    background-color rgba(255, 255, 255, 0.92)
    z-index 0
    padding-top 0
    xperspective 100px
    xtransform translateX( -100px )
    z-index 9

  .j-panel-content-inner
    xborder 2px dotted yellow
    overflow hidden
    padding 2px
    flex-grow 1
    display flex
    flex-wrap nowrap
    flex-direction column
    background white

  .content-item
    
  .panel-item-grow
    xborder 4px dotted red
    overflow hidden
    flex-grow 1
    display flex
    flex-wrap nowrap
    flex-direction column
    background white
    z-index 0
    padding-top 0
    xperspective 100px
    xtransform translateX( -100px )

  .j-panel-footer
    xborder 4px dotted pink
    height 36px
    flex-shrink 0
    xbackground $primary
    color white

  .j-panel-area
    border 2px dotted orange
    border-left 4px solid orange

  .flex-grow
    flex-grow 1

  .flex-shrink
    flex-shrink 1

  // .area-resizable

  .j-panel-toolbar
    display flex
    flex-wrap nowrap
    flex-direction row
    position relative
    zjustify-content flex-start
    align-items center
    align-content flex-start
    height 42px
    background $light
    // background  $primary
    font-size 1rem
    z-index 9
    color $primary-light
  & > i
    font-size 24px
    /* Support for Safari and Chrome. */
    text-rendering: optimizeLegibility;
    /* Support for Firefox. */
    -moz-osx-font-smoothing: grayscale;
    /* Support for IE. */
    font-feature-settings: 'liga';

  &.j-panel-title
    background $primary
    z-index 10
    padding 14px
    color white
    box-shadow 0 1px 3px 2px rgba(1,1,1,0.4)

    & > :not(:last-child)
      margin-right 14px

    & > .title
      margin-right auto

/*
    & > button.circular.small
      width 20px
      height 20px
*/



</style>


<style src="malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css"></style>
