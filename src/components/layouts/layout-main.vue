<template>
  <quasar-layout>

    <div slot="header" class="toolbar bg-dark-primary shadow-2">
      <button>
        <i>menu</i>
      </button>
      <button class="left-drawer-opener">
        <i>menu</i>
      </button>
      <quasar-toolbar-title :padding="1">
        quaZ-APP!
      </quasar-toolbar-title>
      <button>
        <i>mail</i>
      </button>
      <button>
        <i>alarm</i>
      </button>

    </div>


     <!-- Navigation Tabs -->
     <quasar-tabs slot="navigation" class="primary  shadow-2">
      <quasar-tab icon="mail" v-link="{path: '/view-panels', exact: true}">Panels</quasar-tab>
      <quasar-tab icon="alarm" v-link="{path: '/view-sortable', exact: true}">Sortable</quasar-tab>
      <quasar-tab icon="help" v-link="{path: '/view-editor', exact: true}">Editor</quasar-tab>
    </quasar-tabs>

     <!-- Left side Drawer -->
     <!--
      <quasar-drawer>
        <div class="list platform-delimiter">
          <div class="list-header">
            Left Side Drawer
          </div>
          <quasar-drawer-link page="my-account"></quasar-drawer-link>
          <quasar-drawer-link page="shopping-cart"></quasar-drawer-link>
        </div>
      </quasar-drawer>
    content
    -->

     <!-- FABS -->

     <div class="column items-top" style="margin-top: 100px; margin-bottom: 100px;z-index:10;">
        <quasar-fab type="indigo" icon="collections" direction="right">
          <quasar-small-fab class="white" @click="toast('mail')">mail</quasar-small-fab>
          <quasar-small-fab class="white" @click="toast('alarm')">alarm</quasar-small-fab>
        </quasar-fab>
        <quasar-fab :type="['pink', 'glossy']" icon="keyboard_arrow_down" direction="right">
          <quasar-small-fab class="white" @click="toast('mail')">mail</quasar-small-fab>
          <quasar-small-fab class="white" @click="toast('alarm')">alarm</quasar-small-fab>
        </quasar-fab>
        <quasar-fab :type="['blue', 'glossy']" icon="keyboard_arrow_right" direction="right">
          <quasar-small-fab class="white" @click="toast('mail')">mail</quasar-small-fab>
          <quasar-small-fab class="white" @click="toast('alarm')">alarm</quasar-small-fab>
        </quasar-fab>
        <quasar-fab backdrop type="red push" icon="keyboard_arrow_right" direction="right">
          <quasar-small-fab class="primary" @click="toast('mail')">mail</quasar-small-fab>
          <quasar-small-fab class="white" @click="toast('alarm')">alarm</quasar-small-fab>
        </quasar-fab>
      </div>

      <!-- Replace "div" with "router-view" if using subRoutes -->
      <!-- <div class="layout-view no-scroll"> -->
      <router-view  keep-alive></router-view>

  </quasar-layout>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>



<style lang="stylus">

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

