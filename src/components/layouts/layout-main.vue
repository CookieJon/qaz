<template>
  <quasar-layout v-bind:style="bgStyle">
    <div slot="header" class="toolbar bg-primary shadow-2 z-marginal-plus-1">
      <button>
        <i>menu</i>
      </button>
      <button class="left-drawer-opener">
        <i>menu</i>
      </button>
      <quasar-toolbar-title :padding="3">
        quaZ-APP!      
      <quasar-select
        type="radio"
        :model.sync="selectedBg"
        :options="options"
      ></quasar-select>
      </quasar-toolbar-title>

      <button>
        <i>mail</i>
      </button>
      <button>
        <i>alarm</i>
      </button>
    </div>


     <!-- Navigation Tabs -->
     <quasar-tabs slot="navigation" class="bg-secondary text-white">
      <quasar-tab icon="mail" v-link="{path: '/view-panels', exact: true}">Panels</quasar-tab>
      <quasar-tab icon="alarm" v-link="{path: '/view-sortable', exact: true}">Sortable</quasar-tab>
      <quasar-tab icon="help" v-link="{path: '/view-editor', exact: true}">Editor</quasar-tab>
    </quasar-tabs>
    

   <!-- FABS -->
   <div class="column items-bottom"  v-bind:style="{'background-image': selectedBg}" style="bottom: 100px; z-index:10;">
      <quasar-fab type="indigo" style="margin-top:auto; margin-bottom:100px;" icon="collections" direction="right" class="align-end">
        <quasar-small-fab class="white" @click="this.openModal()">mail</quasar-small-fab>
        <quasar-small-fab class="white" @click="toast('alarm')">alarm</quasar-small-fab>
      </quasar-fab>
    </div>

      <!-- <div class="layout-view no-scroll">keep-alive>-->
      <router-view keep-alive> </router-view>
      
      
  </quasar-layout>
</template>

<script>
//  import { Modal } from 'quasar'
//  import modalTemplate from '../modal_layout.html'
//  var modal
  export default {
    data () {
      return {
        'selectedBg': 0,
        'bgs': [
          '/statics/img/resource/bg/bg1.png',
          '/statics/img/resource/bg/bg2.png',
          '/statics/img/resource/bg/bg3.png',
          '/statics/img/resource/bg/bg4.png',
          '/statics/img/resource/bg/bg5.png',
          '/statics/img/resource/bg/bg6.png',
          '/statics/img/resource/bg/bg8.png',
          '/statics/img/resource/bg/bg10.png'
        ]
      }
    },
    computed: {
      'bgStyle' () {
        return {
          'background-image': 'url(' + this.selectedBg + ')'
        }
      },
      'options' () {
        var opts = []
        console.log(this.bgs.length + '!!')
        for (var i = 0, l = this.bgs.length; i < l; i++) {
          var t = this.bgs[i]
          opts.push({ 'label': t, 'value': t })
        }
        console.log(opts.length + 'ssss!')
        return opts
      }
    },
    ready () {
      console.log(this.options + ' !!!;')
    }
    // ,
//    ready () {
//      modal = Modal.create({
//        template: modalTemplate // '#modal1' // see below for template
//      }).set({
//        closeWithBackdrop: true,
//        mininized: true
//      })
//      .css({
//        minWidth: '26vw',
//        minHeight: '80vh'
//      })
//      console.log(modalTemplate)
//    },
//    methods: {
//      openModal () {
//        console.log('hi')
//        modal.open()
//      }
//    }
  }
</script>

<style lang="stylus">

  .layout
    xbackground url("/statics/img/resource/bg/bg3.png") no-repeat 50% 0px
    background-attachment fixed
    background-size cover/* cover || contain  */
    /* background-color: #3F51B5; */
    overflow hidden
  .layout-view
    scroll none
  .bg-glass
    background rgba(30, 30, 30, .3)




  .layout-header
    z-index 11 !important

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

