<template>
  <quasar-layout v-bind:style="bgStyle">
   <!--
    <div slot="header" class="toolbar bg-primary shadow-2 z-marginal-plus-1">
      <button>
        <i>menu</i>
      </button>
      <button class="left-drawer-opener">
        <i>menu</i>
      </button>
      <quasar-toolbar-title :padding="3">
        quaZ-APP!      
     
      </quasar-toolbar-title>

      <button>
        <i>mail</i>
      </button>
      <button>
        <i>alarm</i>
      </button>
    </div>
--> 

     <!-- Navigation Tabs 
     <quasar-tabs slot="navigation" class="bg-secondary text-white">
      <quasar-tab icon="mail" v-link="{path: '/view-panels', exact: true}">Panels</quasar-tab>
      <quasar-tab icon="alarm" v-link="{path: '/view-sortable', exact: true}">Sortable</quasar-tab>
      <quasar-tab icon="help" v-link="{path: '/view-editor', exact: true}">Editor</quasar-tab>
    </quasar-tabs>
    -->
<quasar-select
        type="radio"
        :model.sync="selectedBg"
        :options="options"
      ></quasar-select>
   <!-- FABS -->
      <quasar-fab type="indigo" style="margin:40px 20px " icon="collections" direction="right" class="fixed-top-left">
        <quasar-small-fab class="white" @click="this.openModal()">mail</quasar-small-fab>
        <quasar-small-fab class="white" @click="toast('alarm')">alarm</quasar-small-fab>
      </quasar-fab>
      
   <div class="column items-bottom"  v-bind:style="{'background-image': selectedBg}" style="bottom: 100px; z-index:0;">
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

<style lang="css">
  
.ripple {
  position: absolute;
  background: rgba(0,0,0,.25);
  border-radius: 100%;
  transform: scale(0);
  pointer-events: none;
}

.ripple.show {
  animation: ripple .5s ease-out;
}
@keyframes
ripple { to {
 transform: scale(2);
 opacity: 0;
}
}
</style>

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
