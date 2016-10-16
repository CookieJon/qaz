<style>

  .upload-zone {
    position:relative;
    overflow:hidden;
    width:100%;
    height:300px;
    background:transparent;
    border:2px dashed #333;
    cursor:pointer; padding:5px; color:#555; font-family:'Segoe UI'; font-weight:bold;
  }
  .upload-zone:hover {
    border-color: green;
  }

  .file-upload{
    display:none;
  }

  .upload-zone img {
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
      :class='computedClass'
      @click.stop.prevent="doContainerClick"
      @dragenter.stop.prevent="doDragEnter"
      @dragover.stop.prevent="doDragOver"
      @drop.stop.prevent="doDrop"
    >
      Drag imgs here
      <img
        v-el:img
        id="photo"
        src=""
      />
    </div>
    <input
      type="file"
      v-el:fileinput
      class="file-upload"
      name="userprofile_picture"
      @change="loadImage"
    />

  </div>
</template>

<script>
  var iq = require('image-q')
  console.log(iq)
  var $vm
  export default {
    props: {
      'cssClass': {
        type: String,
        default: ''
      }
    },
    data () {
      return {}
    },
    computed: {
      computedClass () {
        return ['upload-zone', this.cssClass]
      }
    },
    created () {},
    ready () {
      $vm = this
    },
    methods: {
      doContainerClick (e) {
        $vm.$els.fileinput.click()
      },
      doDragEnter (e) {
        e.stopPropagation()
        e.preventDefault()
      },
      doDragOver (e) {
        e.stopPropagation()
        e.preventDefault()
      },
      doDrop (e) {
        console.log(e)
        e.preventDefault()
        var files = e.dataTransfer.files
        for (var i = 0, l = files.length; i < l; i++) {
          this.loadImage(files[i])
        }
        // $vm.$els.fileinput.files = files // this code line fires your 'fileCloadImagehanged' function (imageLoader change event)
      },
      loadImage (src) {
        //	Prevent any non-image file type from being read.
        if (!src.type.match(/image.*/)) {
          console.log('The dropped file is not an image: ', src.type)
          return
        }
        //	Create our FileReader and ru n the results through the render function.
        var reader = new FileReader()
        reader.onload = function (e) {
          this.render(e.target.result)
        }.bind(this)
        reader.readAsDataURL(src)
      },
      render (src) {
        var MAX_WIDTH = 256
        var MAX_HEIGHT = 256
        var image = new Image()
        image.onload = function () {
          var canvas = document.createElement('canvas') // document.getElementById('myCanvas')
          if (image.height > MAX_HEIGHT) {
            // image.width *= MAX_HEIGHT / image.height
            image.width = MAX_WIDTH
            image.height = MAX_HEIGHT
          }
          var ctx = canvas.getContext('2d')
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          canvas.width = image.width
          canvas.height = image.height
          canvas.style.width = '80px'
          canvas.style.height = '80px'
          ctx.drawImage(image, 0, 0, image.width, image.height)
          $vm.$els.container.appendChild(canvas)
        }
        image.src = src
      }
    }
  }
</script>