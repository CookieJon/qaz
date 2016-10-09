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
        <pre class='text-dark' style="font-size:10px;line-height:10px;">{{ $data | json 2 }}</pre>
      </j-panel>

      <!-- PANEL :: BITMAPS -->
      <j-panel
        title="Bitmaps"
        icon="business"
        >
          <div slot="header" class='j-panel-toolbar'>Header toolbar</div>

          <!-- content -->
          <div class='j-panel-toolbar'>CONTENT toolbar</div>

          <div class="j-panel-toolbar">
            <i class="item-primary">face</i>
            <i class="item-primary">extension</i>
          </div>

          <div class="j-panel-item scroll" style="flex-shrink: 1; height: 100px;">
            <j-collection :model="bitmaps"
            ></j-collection>
          </div>
          
          <div class="j-panel-toolbar">
            <i class="item-primary">face</i>
            <i class="item-primary">extension</i>
          </div>

          <div class="j-panel-item panel-item-grow">
            <j-collection :model="bitmaps"
            ></j-collection>
          </div>

      </j-panel>

    </div><!-- your content -->

  </div><!-- root node required -->

</template>

<script>
var jPanel = require('components/custom/j-panel')
var jCollection = require('components/custom/j-collection')
var jUploadZone = require('components/custom/j-upload-zone')
export default {
  data () {
    return {
      'bitmaps': [1, 2, 3, 4, 5],
      'gallery': [
        '/statics/img/resource/bg/bg2.png',
        '/statics/img/resource/bg/bg3.png',
        '/statics/img/resource/bg/bg4.png',
        '/statics/img/resource/bg/bg5.png',
        '/statics/img/resource/bg/bg6.png',
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
