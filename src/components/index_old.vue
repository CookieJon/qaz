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
    <quasar-tab icon="mail" v-link="{path: '/layout', exact: true}">Mails</quasar-tab>
    <quasar-tab icon="alarm" v-link="'/layout/alarm'">Alarms</quasar-tab>
    <quasar-tab icon="help" v-link="'/layout/help'">Help</quasar-tab>
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
   <div class="column items-top" style="margin-top: 100px; margin-bottom: 100px;">
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
    <div class="layout-view no-scroll">

     <div class="justify-left row items-baseline group generic-margin">


        <!-- #data -->
        <div class="card" style="max-width:300px;">
          <div class="card-title">
            $data
          </div>
          <div class="card-content bg-lighter-primary card-force-top-padding">
          <pre style="font-size:10px;line-height:10px;">{{ $data | json 1 }}</pre>
          </div>
        </div>

        <!-- An Item -->
        <div class="card shadow-5 xround-borders" style="max-width:700px;">

  <div class="toolbar">
    <!-- opens left-side drawer -->
    <button class="lxeft-drawer-opener">
      <i>menu</i>
    </button>
    <button class="primary small circular">
    <i>mail</i>
</button>
    <!-- Toolbar title/text -->
    <quasar-toolbar-title :padding="2">
      Title
    </quasar-toolbar-title>
    <button>
      <i>mail</i>
    </button>
    <button>
      <i>alarm</i>
    </button>
  </div>

 <div class="card bg-glass" style="margin-top: 25px;">

  <div class="card-title bg-accent">
    Card with Collapsible List
  </div>

  <div class="card-content">
   z <jpanel>a</jpanel>q
  </div>

  <div class="list item-delimiter">
    <quasar-collapsible icon="explore" label="First">
      <div>
        Lorem ipsum dolor sit amet...
      </div>
    </quasar-collapsible>
    <quasar-collapsible icon="perm_identity" label="Second">
      <div>
        Lorem ipsum dolor sit amet...
      </div>
    </quasar-collapsible>
    <quasar-collapsible icon="shopping_cart" label="Third">
      <div>
        Lorem ipsum dolor sit amet...
      </div>
    </quasar-collapsible>
  </div>
</div>

          <div v-dnd-draggable :dnd-draggable="this" class="card-content card-force-top-padding">

            <div class="toolbar">
               <div v-dnd-draggable class="dnd-button"
                  :dnd-draggable="templates"
                  dnd-copied="copied"
                  dnd-effect-allowed="copy">
                  Add Element
                </div>
            </div>

         

          <div id="rem" v-el="resizeme" class="card-content bg-white card-force-top-padding">

            <label class="item two-lines">
              <div class="item-content has-secondary">
                <div>Events and reminders</div>
                <div>Lorem ipsum...</div>
              </div>
              <div class="item-secondary">
                <quasar-toggle :model.sync="checked" class="purple"></quasar-toggle>
              </div>
            </label>
            <label class="item three-lines">
              <div class="item-content has-secondary">
                <div>Events and reminders</div>
                <div>Lorem ipsum...</div>
              </div>
              <div class="item-secondary">
                <quasar-toggle :model.sync="checked" class="red"></quasar-toggle>
              </div>
            </label>
 
          <quasar-numeric
            :model.sync="modelMin"
            :min="1"
            :max="17"
          ></quasar-numeric>
          
           <quasar-double-range
           class="accent"
            :label="true"
            :markers="true"
            :model-min.sync="modelMin"
            :model-max.sync="modelMax"
            :min="0"
            :max="100"
            :step="5"
          ></quasar-double-range>
          
</div>
              <!-- ** dnd list -->
              <div v-for="(listName, list) in lists" class="col-md-4">
             <div class="card" style="max-width:300px;">
                <div class="card-title bg-light-primary">List {{listName}}</div>
                <div class="card-content card-force-top-padding">
                  <ul v-dnd-list :dnd-list="list" :dnd-horizontal-list="false">
                      <li v-dnd-draggable v-for="item in list"
                          :dnd-draggable="item"
                          :dnd-index="$index"
                          :dnd-data="list"
                          dnd-selected="selectedEvent"
                          dnd-effect-allowed="move"
                          v-bind:class="{'selected': selected === item}">
                          {{item.label}}
                      </li>
                      <li class="dndPlaceholder red">Custom placeholder</li>
                  </ul>
                </div>
            </div>
        </div>
      </div>

          <div class="card-footer">

            <button class="light relative-position">
              Eat Me
              <span class="floating label circular bg-primary text-white">22</span>
            </button>
            <button class="secondary relative-position">
              Drink Me
              <span class="floating label bg-dark">22</span>
            </button>
          </div>

        </div>

     </div>

    </div>
  </quasar-layout>
</template>

<script>
//  var Interact = require('interact')
//  var Interact = require('interact.js')
var $ = require('jquery')
require('jquery-ui/droppable')
require('jquery-ui/draggable')
var jpanel = require('components/jpanel')
export default {
  data () {
    return {
      modelMin: 0,
      modelMax: 100,
      'selected': null,
      'lists': {
        'A': [
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
        'B': [
          {
            'label': 'Item B1'
          },
          {
            'label': 'Item B2'
          },
          {
            'label': 'Item B3'
          },
          {
            'label': 'Item B4'
          }
        ]
      }
    }
  },
  ready () {
    var self = this
    var $el = $(self.$el)
    console.log($el)
    // Make Draggable
    $el
      .find('div.card')
      .prepend('asdjaskljdaksdaskdas')
      .draggable({
        // stack: '.card',
        handle: '.drag-handle',
        snap: true,
        // grid: [50, 50],
        opacity: 0.45,
        snapMode: 'outer',	// inner outer both
        snapTolerance: 5,
        start: function (event, ui) {
          $el.removeClass('z-depth-2')
          $el.addClass('z-depth-4')
        },
        stop: function (event, ui) {
          $el.removeClass('z-depth-4')
          $el.addClass('z-depth-2')
        }
      })
  },
  components: {
    jpanel
  }
}
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
