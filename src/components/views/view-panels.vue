<template>
  <!-- root node required -->
  <div>

    <!-- your content -->
    <div class="layout-padding">

      <!-- if you want automatic padding -->
      Panels
     
<!--

      <div class="list">

                      
               <div class="item multiple-lines" 
                 <div class="item multiple-lines">                     
                <div class="item-content">
                  <span class="item-label">From To: </span>
                  <
  <quasar-gallery :src="gallery"></quasar-gallery>

                </div>
              </div>    

      </div>

-->
<!-- Tokens; alternative: Chips -->

          
       <j-panel icon="upload" title="Some panel">
         test
       </j-panel>
       <j-panel icon="upload" title="Some panel">
         test
       </j-panel>
     
      <j-panel icon="shopping_cart" v-for="(listName, list) in lists" :title='listName' :x='$index * 340  + 20' :y='40' >


      <div slot="toolbar" class='j-panel-toolbar'>
          <button class="circle text-white small"><i>dns</i></button>
          <input type="file" @change='loadBitmap'  id="file-upload-bitmap"  style="display:inline-block;xdisplay:none;" value="C:\_working\_MOE\_FINAL\img\bmp" multiple accept=".bmp, .tif, .tiff|images/*" /> 
          <button class=" text-white small"><i>chrome_reader_mode</i></button>
          <button class=" text-white small"><i>donut_small</i></button>
          <button class=" text-white small"><i>extension</i></button>
      </div>

      <div slot="toolbar" class='j-panel-toolbar'>
           <!-- Tabs -->
          <quasar-tabs class="inverted dark">
            <quasar-tab icon="mail" target="#tab-1" v-goodies-ripple>
              Tab 1
            </quasar-tab>
            <quasar-tab icon="mail" target="#tab-2" v-goodies-ripple>
              Tab 2
            </quasar-tab>
            <quasar-tab icon="alarm" target="#tab-3" v-goodies-ripple>
              Tab 3
            </quasar-tab> 
          </quasar-tabs>
         
      </div>

          <!-- Tab Targets -->
          
          <div id="tab-1">
           asdasdasd
          </div>          
          
          
          <div id="tab-2">
         
             <div class="list">
                <!-- chips -->
                <div class="item multiple-lines">
                  <i class="item-primary">edit</i>
                  <div class="item-content">
                    <quasar-chips :model.sync="chipsArray" placeholder="Chips!"></quasar-chips>
                  </div>
                </div>            

               <!-- checkbox -->
                <label class="item">
                  <div class="item-primary">
                    <quasar-checkbox :model.sync="checked"></quasar-checkbox>
                  </div>
                  <div class="item-content">
                    Notifications
                  </div>
                </label>
             </div>

         
          </div>
          <div id="tab-3">

          <div v-dnd-list :dnd-list="list" :dnd-horizontal-list="false">

            <div class='list' v-dnd-draggable v-for="item in list" :dnd-draggable="item" :dnd-index="$index" :dnd-data="list" dnd-selected="selectedEvent" dnd-effect-allowed="copyMove" v-bind:class="{'selected': selected === item}">
   <!-- range -->
               
               <div class="list-label">List Labels R Me</div>
                   
                   

                  <!-- switch -->
                  <label class="item two-lines">
                      <div class="item-content has-secondary">
                        <div>Events and reminders</div>
                        <div>Lorem ipsum...</div>
                      </div>
                      <div class="item-secondary">
                        <quasar-toggle :model.sync="checked" class="purple"></quasar-toggle>
                      </div>
                  </label>

                  <!-- range -->
                  <div class="item multiple-lines">                     
                    <div class="item-content">
                      <span class="item-label">From To: </span>
                      <quasar-double-range
                        :model-min.sync="test_range.min"
                        :model-max.sync="test_range.max"
                        :min="0" :max="100" label
                      ></quasar-double-range>
                    </div>
                  </div>                    

                  <!-- ddl radio -->
                  <div class="item multiple-lines"> 
                    
                    <div class="item-content">
                      <span class="item-label">Username</span>
                        <quasar-select
                          class="full-width"
                          type="radio"
                          :model.sync="jon"
                          :options="[{ label:'Cyrano H Welles', value: 1}, { label:'Ferdinand Zelda', value: 2}, { label:'Rarebit Koenig II', value: 3}]"
                        ></quasar-select>
                    </div>
                </div>

              </div>
         
          </div>
          
                  
           </div>
      


         
          
      </j-panel>

      <!-- #data -->
      <j-panel title='Debug' x="20" y="420" >
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
require('jquery-ui/sortable') // NB Not used at the moment.
require('jquery-ui-css/core.css')
require('jquery-ui-css/theme.css')
require('jquery-ui-css/draggable.css')
require('jquery-ui-css/sortable.css')
require('jquery-ui-css/resizable.css')
var jPanel = require('components/custom/j-panel')

var Bitmap = require('../../moe/moe.bitmap.js')
console.log(Bitmap)
export default {
  data () {
    return {
      'gallery': [
        '/statics/img/resource/bg/bg1.png',
        '/statics/img/resource/bg/bg2.png',
        '/statics/img/resource/bg/bg3.png',
        '/statics/img/resource/bg/bg4.png',
        '/statics/img/resource/bg/bg5.png',
        '/statics/img/resource/bg/bg6.png',
        '/statics/img/resource/bg/bg8.png',
        '/statics/img/resource/bg/bg10.png'
      ],
      'chipsArray': [],
      'test_range': { min: 10, max: 90 },
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
  
  
/*
  
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
*/

  .item {background-color:white;}
</style>