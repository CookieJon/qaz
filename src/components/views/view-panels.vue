<template>
  <!-- root node required -->
  <div>

    <!-- your content -->
    <div class="layout-padding">
     
     
     

     
     
     
     
     
     
     
     
     
     
     
     
      <!-- if you want automatic padding -->
      Panels 
<!-- Tokens; alternative: Chips -->
<span class="token">Some token</span>
      <j-panel v-for="(listName, list) in lists" :title='listName' :x='$index * 220' :y='$index * 50' >

          <div class="panel-item type-toolbar">
              <button class=" text-white small"><i>dns</i></button>
              <button class=" text-white small"><i>chrome_reader_mode</i></button>
              <button class=" text-white small"><i>donut_small</i></button>
              <button class=" text-white small"><i>extension</i></button>
          </div>

     
           <div class="list">
              <div class="list-label">Single Selection</div>
              <div class="item multiple-lines">
                <i class="item-primary">supervisor_account</i>
                <div class="item-content">
                  <quasar-select
                    class="full-width"
                    type="radio"
                    :model.sync="jon"
                    :options="[{ label:'Cyrano H Welles', value: 1}, { label:'Ferdinand Zelda', value: 2}, { label:'Rarebit Koenig II', value: 3}]"
                  ></quasar-select>
                </div>
            </div>
            <div class="item two-lines">
              <i class="item-primary">local_atm</i>
              <div class="item-content">
                <quasar-double-range
                  :model-min.sync="modelMin"
                  :model-max.sync="modelMax"
                  :min="0" :max="50" label
                ></quasar-double-range>
              </div>
            </div>            
            <div class="item two-lines">
              <i class="item-primary">edit</i>
              <div class="item-content">
                <span class="item-label">Number: </span>
                <quasar-numeric :model.sync="number"></quasar-numeric>
              </div>
            </div>

          </div>


             
        
        
      
          <ul v-dnd-list :dnd-list="list" :dnd-horizontal-list="false">
              <li v-dnd-draggable v-for="item in list" :dnd-draggable="item" :dnd-index="$index" :dnd-data="list" dnd-selected="selectedEvent" dnd-effect-allowed="move" v-bind:class="{'selected': selected === item}">
                  {{item.label}}
              </li>
              <li class="dndPlaceholder red">Custom placeholder</li>
          </ul>
          
      </j-panel>

      <!-- #data -->
      <j-panel title='Debug' >
        <pre class='text-dark' style="font-size:10px;line-height:10px;">{{ $data | json 2 }}</pre>
      </j-panel>


    </div><!-- your content -->

  </div><!-- root node required -->

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
      'jon': 1,
      'bitmaps': {
        '001': {
          type: 'bitmap',
          name: 'untitled',
          src: 'image.bm',
          tags: ['arty', 'photo', 'spooky', 'b&w', 'face', 'people']
        }
      },
      'artworks': {
      },
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