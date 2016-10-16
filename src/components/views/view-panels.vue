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

      <!-- PANEL :: DEBUG -->
      <j-panel title='Debug'>
        <pre slot="content" class='text-white'>{{ $data | json 2 }}</pre>
      </j-panel>


      <j-panel
        title="Bitmap Detail"
        icon="upload"
        >
        <div slot="content">
          <quasar-range :model.sync="number" :min="1" :max="1000" class='rotate-90'></quasar-range>
        </div>
      </j-panel>

      <!-- PANEL :: BITMAPS -->
      <j-panel
        title="Bitmaps"
        icon="business"
        >
          <div slot="content" class="j-tray area panel-item-grow">
            <j-collection
              :model="gallery"
              :options=""
            ></j-collection>
          </div>
      </j-panel>

      <!-- PANEL :: BITMAPS -->
      <j-panel
        title="Bitmaps"
        icon="business"
        >
          <div slot="content" class="j-tray area panel-item-grow">
            <j-collection
              :model="gallery"
              :options=""
            ></j-collection>
          </div>
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
        '/statics/img/resource/bg/bg10.png',
        '/statics/img/resource/bg/bitmap1.bmp',
        '/statics/img/resource/bg/bitmap2.bmp',
        '/statics/img/resource/bg/bitmap3.bmp',
        '/statics/img/resource/bg/bitmap4.bmp'
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
