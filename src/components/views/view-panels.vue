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
      <j-panel title='Debug' width="380" height="750" x="5" y="5">
        <pre slot="content" class='text-white'>{{ all | json 2 }}</pre>
      </j-panel>


      <j-panel
        title="Bitmap Detail"
        icon="upload"
         :width="370" :height="140" :x="320" :y="635">
        >
        <div slot="content">
          <quasar-range :model.sync="number" :min="1" :max="1000" class='rotate-90'></quasar-range>
        </div>
      </j-panel>

      <!-- PANEL :: BITMAPS -->
      <j-panel
        title="Bitmaps"
        icon="business"
         :width="320" :height="520" :x="380" :y="25">
        >
          <div slot="content" class="j-tray area panel-item-grow">
            <j-collection
              :model="bitmaps"
              :options=""
              class='frame-type-list'
            ></j-collection>
          </div>
      </j-panel>

      <!-- PANEL :: BITMAPS -->
      <j-panel
        title="Bitmaps"
        icon="business"
         :width="560" :height="530" :x="720" :y="35">
        >
          <div slot="content" class="j-tray area panel-item-grow">
            <j-collection
              :model="testBitmaps"
              :options=""
              type='frame-type-grid'
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
      'testBitmaps': [
        '/statics/img/resource/bg/more1.png',
        '/statics/img/resource/bg/more2.png',
        '/statics/img/resource/bg/bg2.png'
      ],
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
        'baitmaps': {
          'id': {
            id: null,
            filters: []
          }
        },
        'palettes': {
        }
      },
      'chipsArray': [],
      'test_range': { min: 10, max: 90 },
      'jon': 1,
      'artworks': {},
      'selected': null
    }
  },
  computed: {
    all () {
      return this.$store.getters.all
    },
    bitmaps () {
      return this.$store.getters.bitmaps
    }
  },
  components: {
    jPanel, jUploadZone, jCollection
  },
  ready () {
    console.log('STORE', this.all)
  }
}
</script>
