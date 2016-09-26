<template>
  <!-- root node required -->
  <div>
   


    <!-- your content -->
    <div class="layout-padding">
      <!-- if you want automatic padding -->
      Panels
      <j-panel title='Hi there!'>HI</j-panel>
    </div>
  </div>
</template>

<script>
var jPanel = require('components/custom/j-panel')

export default {
  data () {
    return {}
  },
  components: {
    jPanel
  }
}
</script>

