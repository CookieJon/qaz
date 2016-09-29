<template>
  <!-- root node required -->
  <div>
   


    <!-- your content -->
    <div class="layout-padding">
      <!-- if you want automatic padding -->
      Panels

      <div v-for="(listName, list) in lists" class="col-md-4">
        <div class="card" style="max-width:300px;">
          <div class="card-title bg-light-primary">List {{listName}}</div>
          <div class="card-content card-force-top-padding">
            <ul v-dnd-list :dnd-list="list" :dnd-horizontal-list="false">
              <li v-dnd-draggable v-for="item in list" :dnd-draggable="item" :dnd-index="$index" :dnd-data="list" dnd-selected="selectedEvent"
                dnd-effect-allowed="move" v-bind:class="{'selected': selected === item}">
                {{item.label}}
              </li>
              <li class="dndPlaceholder red">Custom placeholder</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- #data -->
      <j-panel title='Debug'>
        <pre style="font-size:10px;line-height:10px;">{{ $data | json 2 }}</pre>
      </j-panel>

      <!-- ** dnd list -->
      <j-panel title='VUE DND' >

      </j-panel>

      <j-panel :title='listName' v-for="(listName, list) in lists">
        <ul class="sortable">
          <li v-for="item in list" class="sortable-element"><i>menu</i> {{ item.label }}</li>
        </ul>
      </j-panel>


  <!-- ** dnd list -->
      <!--
      <div v-for="(listName, list) in lists" class="col-md-4">
        <j-panel :title='listName'>
          <div class="card-title bg-light-primary">List {{listName}}</div>
          <div class="card-content card-force-top-padding">
            <ul v-dnd-list :dnd-list="list" :dnd-horizontal-list="false">
              <li v-dnd-draggable v-for="item in list" :dnd-draggable="item" :dnd-index="$index" :dnd-data="list" dnd-selected="selectedEvent"
                dnd-effect-allowed="move" v-bind:class="{'selected': selected === item}">
                {{item.label}}
              </li>
              <li class="dndPlaceholder red">Custom placeholder</li>
            </ul>
          </div>
        </div>
      </div>
      -->

    </div>
  </div>
</template>

<script>
var $ = require('jquery')
require('jquery-mousewheel')
require('malihu-custom-scrollbar-plugin')
require('jquery-ui/draggable')
require('jquery-ui/resizable')
require('jquery-ui/sortable')
require('jquery-ui-css/core.css')
require('jquery-ui-css/theme.css')
require('jquery-ui-css/draggable.css')
require('jquery-ui-css/sortable.css')
require('jquery-ui-css/resizable.css')
var jPanel = require('components/custom/j-panel')

export default {
  data () {
    return {
      'selected': null,
      'lists': {
        'List A': [
          {
            'label': 'Item A5'
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
        'List B': [
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
  components: {
    jPanel
  },
  ready () {
    // var self = this
    // var $el = $(self.$el)
    // var $content = $(self.$els.myList)
    // Make Sortable
    console.log($('.sortable').length + ' sortables!')
    $('.sortable')
      .sortable({
        connectWith: '.sortable',
        placeholder: 'ui-state-highlight',
        forcePlaceholderSize: true,
        helper: 'clone',
        forceHelperSize: true,
        appendTo: document.body
        // axis: 'y'

        // grid: [ 20, 10 ]
      })
      .disableSelection()
  }
}
</script>

<style>
  .sortable { list-style-type: none; margin: 0; padding: 0; width: 100%; }
  .sortable-element {
     border:0px;margin: 4px; height:32px; 
     font-size:14px; 
     padding:4px;text-align:left; cursor:pointer;
     box-shadow: 0px 3px 3px 0px #aaaaaa;
     background: #64b5f6;
     color:white;
     float:left;
     width:64px;
     height:64px;


  }
</style>