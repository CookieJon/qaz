<style>

  #upload-container {
    position:relative;
    overflow:hidden;
    width:100%; height:300px;
    background:transparent;
    border:2px dashed #333;
    cursor:pointer; padding:5px; color:#555; font-family:'Segoe UI'; font-weight:bold;
  }
  #upload-container:hover {
    border-color: green;
  }

  #file-upload{
    xdisplay:none;
  }

  #upload-container img{
    position:absolute;
    width:312px;
    height:362px;
    top:-1px;
    left:-1px;
    z-index:-1;
    border:none;
    background-color: #eee;
  }
</style>

 <template>
    <div
      v-el:container
      id="upload-container"
      @click.stop.prevent="fileChanged"
      @dragenter.stop.prevent="doDragEnter"
      @dragover.stop.prevent="doDragOver"
      @drop.stop.prevent="doDrop"
    >
      Drag imgs here
      <img v-el:img id="photo" src=""/>
    </div>
    <input
      id="file-upload"
      @change="fileChanged"
      v-el:fileinput
      type="file"
      name="userprofile_picture"
    />
  </div>
</template>


<script>
  var iq = require('image-q')
  var $vm
  export default {
    props: { },
    data () {
      return {}
    },
    computed: {},
    created () {},
    ready () {
      $vm = this
    },
    methods: {
      doDragEnter () {
      },
      doDragOver () {
      },
      doDrop (e) {
        console.log(e)
        var dt = e.dataTransfer
        var files = dt.files
        // this code line fires your 'fileChanged' function (imageLoader change event)
        $vm.$els.fileinput.files = files
      },
      fileChanged (e) {
        var reader = new FileReader()
        reader.onload = function (event) {
          $vm.$els.img.setAttribute('src', event.target.result)
        }
        reader.readAsDataURL(e.target.files[0])
      }
    }
  }
</script>