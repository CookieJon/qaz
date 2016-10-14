<style>
#drop {
  min-height: 150px;
  width: 250px;
  border: 1px solid blue;
  margin: 10px;
  padding: 10px;
}
</style>
 <template>
  <!-- root node required -->
  <div>

    <!-- your content -->
    <div class="layout-padding">

      <!-- PANEL :: BITMAPS -->
      <j-panel
        title="Bitmaps"
        icon="business"
        >
         

          <!-- content 
           <div slot="header" class='j-panel-toolbar'>Header toolbar</div>
           
          <div slot="content" class='j-panel-toolbar'>
            <span class="title">Bitmaps : Content Toolbar</span>
          </div>

          <div slot="content" class="j-panel-toolbar">
            <i class="item-primary">face</i>
            <i class="item-primary">extension</i>
          </div>

          <div slot="content" class="j-panel-item scroll expand" style="height: 100px;">

          </div>
          -->

          <div slot="content" class="j-tray area panel-item-grow">
            <j-collection
              :model="gallery"
              :options=""
            ></j-collection>
          </div>
<!--

          <j-frame
            :collection="
              {
                model: gallery,
                views: ['tile', '']
              }",
            :sortable="
              {

              }"
            :draggable
            
            :resizable

          }"
-->

     
      </j-panel>


      <!-- PANEL :: LEVER -->
      <j-panel title='Debug'>
        <
      </j-panel>
     
     
      <!-- PANEL :: DEBUG -->
      <j-panel title='Debug'>
        <pre>{{ $data | json 2 }}</pre>
      </j-panel>

   
    </div><!-- your content -->

  </div><!-- root node required -->

</template>



<script>
/**
 *
 * START SCRIPT
 *
 **/
var jPanel = require('components/custom/j-panel')
var jCollection = require('components/custom/j-collection')
var jUploadZone = require('components/custom/j-upload-zone')
export default {
  data () {
    return {
      'building': {
        'levels': {
          'id': {
            'id': null,
            'spaces': {
              'artwork': null,
              'other': {
                key: null,
                exits: null
              }
            }
          }
        },
        'artworks': {
          'id': {
            id: null,
            filters: []
          }
        },
        'bitmaps': {
          'id': {
            id: null,
            filters: []
          }
        },
        'palettes': {
        }
      },
      'bitmaps': [1, 2, 3, 4, 5],
      'gallery': [
        '/statics/img/resource/bg/more1.png',
        '/statics/img/resource/bg/more2.png',
        '/statics/img/resource/bg/bg2.png',
        '/statics/img/resource/bg/bg10.png'
      ],
      'chipsArray': [],
      'test_range': { min: 10, max: 90 },
      'jon': 1,
      'artworks': {},
      'selected': null
    }
  },
  components: {
    jPanel, jUploadZone, jCollection
  },
  ready () { }
}
</script>
