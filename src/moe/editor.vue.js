$(document).ready(function() {

  // Init floating panels
  //
 $(".panel-float").resizable().draggable();

  var model = {

    filters: [
      { type: "PixelMap", name: "Amazing Filter", min: 10, max: 190  }, 
      { type: "ColorMap", name: "Crazy for You", min: 10, max: 190  }, 
      { type: "PixelMap", name: "All Shook Up", min: 10, max: 190  }
    ],
    
    selectedBitmap: 'test',
    
    bitmaps: []
    
  }
  
  /**
   * Load bitmap by name
   */
  function serveBitmap( fileName, callback ) {
    var bitmap = new Bitmap().fromFileName( fileName, 	function(bitmap) {
         callback(bitmap);
    });
   
  }
	
  /**
   * 	Add bitmap to editor
   */
	function addBitmap(bitmap) {
		$('#bitmaps').append(bitmap.dom);
	}


  //style="width:{{$ctrl.width}};height:{{$ctrl.height}};top:{{$ctrl.top}};left:{{$ctrl.left}};"


  // VUE COMPONENTS
  //
  Vue.component('tr-tray', {
    
      props:    [
                  'title',
                  'color' 
                ],
    
    	xtemplate: `<div class="card card-draggable  card-resizable" >
                    <div class="card-header ch-alt bgm-{{ color }}">
                      <h2>{{ title }}</h2>
                    </div>
                    <div class="card-body" v-el:el-scrollable>
                      <slot />
                    </div>
                  </div>
                `,
    
      template: `
                  <div class="tile tile-collapse">
                    <div data-target="#{{'tray_id'+_uid}}" data-toggle="collapse">
                      <div class="tile-side pull-left" data-ignore="tile">
                        <div class="avatar avatar-sm">
                          <span class="icon">alarm</span>
                        </div>
                      </div>
                      <div class="tile-inner">
                        <div class="text-overflow">lorem ipsum dolor sit amet</div>
                      </div>
                    </div>
                    <div class="tile-active-show collapse" id="{{'tray_id'+_uid}}">
                      <div class="tile-sub">
<slot />
                        <p>Additional information<br><small>Aliquam in pharetra leo. In congue, massa sed elementum dictum, justo quam efficitur risus, in posuere mi orci ultrices diam.</small></p>
                      </div>
                      <div class="tile-footer">
                        <div class="tile-footer-btn pull-left">
                          <a class="btn btn-flat waves-attach waves-effect" href="javascript:void(0)"><span class="icon">check</span>&nbsp;OK</a>
                          <a class="btn btn-flat waves-attach waves-effect" data-toggle="tile" href="#ui_tile_example_1"><span class="icon">close</span>&nbsp;Cancel</a>
                        </div>
                      </div>
                    </div>
                  </div>
                `,
    
      xtemplate: `<div class="card card-draggable card-resizable" >
							<div class="card-main" >
								<div class="card-header header-{{ color }}" data-toggle="collapse" data-target="{{ _uid }}">
									<div class="card-inner">
										<h1 class="card-heading" >{{ title }}</h1>
									</div>  
								</div>
								<div class="card-inner collapse in" id="{{ _uid }}" v-el:el-scrollable style="overflow:scroll;">
              
									<p class="text-center">
										<span class="avatar avatar-inline avatar-lg">
											<img alt="Login" src="img/resource/sample/avatar-001.jpg">
										</span>
									</p>
 
									<form class="form" action="index.html">
										<div class="form-group form-group-label">
											<div class="row">
												<div class="col-md-10 col-md-push-1">
													<label class="floating-label" for="ui_login_username">Username</label>
													<input class="form-control" id="ui_login_username" type="text">
												</div>
											</div>
										</div>

										<div class="form-group form-group-label">
											<div class="row">
												<div class="col-md-10 col-md-push-1">
													<label class="floating-label" for="ui_login_password">Password</label>
													<input class="form-control" id="ui_login_password" type="password">
												</div>
											</div>
										</div>
										
										<div class="form-group">
											<div class="row">
												<div class="col-md-10 col-md-push-1">
													<slot ></slot>
												</div>
											</div>
										</div>
										
									</form>
								</div>
							</div>
						</div>`,
      methods: {
        
        bringFront: function (elem, stack){
          // Brings a jqueryUI Draggable to the stack front
          var min, group = $(stack);

          if(group.length < 1) return;
          min = parseInt(group[0].style.zIndex, 10) || 0;
          $(group).each(function(i) {
            this.style.zIndex = min + i;
          });

          //if($elem.length === 0undefined) return;
          elem.css({'zIndex' : (min + group.length) });
        }
        
      },
    
      // Hooks
      ready:    function() {
        
        var self = this;
        
        var el;
        
        el = $(this.$els.elScrollable);
        el.mCustomScrollbar({
         theme:"dark" 
        });
        
        el = $(this.$el);
        el.addClass('z-depth-2'); 
//        el.on('mousedown', function( event ) { 
//          self.bringFront( el,  '.card'); 
//        }); 
//       
        el.resizable({
          ghost: true,
          //animate: true,
          //animateDuration: 'fast',
          //animateEasing: 'easeOutBounce',
          //grid: [10, 10],
          containment: $('body'),
          //autoHide: true,
          handles: 'all',
          helper: ".resizable-helper"
        });

        el.draggable({
          //handle: '.drag-handle',
          //grid: [50, 50],
		  snap: true,
		  stack: '.card',
          opacity: 0.45,
          snapMode: 'outer',	// inner outer both
          snapTolerance: 5,
          start: 	function( event, ui ) 	
                  { 
                    el.removeClass('z-depth-2'); 
                    el.addClass('z-depth-4'); 
                  },
          stop: 	function( event, ui ) 	
                  { 
                    el.removeClass('z-depth-4');
                    el.addClass('z-depth-2'); 
                  }
        });
        
      }
    

  });
  
 //<component v-for="(windex, item) in items" :index="windex" :index="$index" :bitmap="item" is="tr-item"></component>
  Vue.component('j-collection', {

    data: function () {
      return {
        sortFromIndex: null,
        sortToIndex: null
      }
    },

    template: `<div class="collection-container">
                <div class="collection-sortable" v-el="mylist">
                  <tr-item v-for="(i, item) in items" :item="item" /></tr-item>
                </div>
              </div>`,

    props: ['items'],

    ready: function jCollection_ready() {

      me = this;

      $(this.$el)
        .find(".collection-sortable")
        .sortable({
          forcePlaceholderSize: true,
          forceHelperSize: true,
          placeholder: ".ui-sortable-placeholder",
          delay: 150,
        
          handle: '.drag-handle',
          start: function (event, ui) {

            me.sortFromIndex = ui.item.index();
            console.log("From " + ui.item.index());

          },
          update: function (event, ui) {

            me.sortToIndex = ui.item.index();
            console.log("To " + ui.item.index());

            // Move array element from->to routine 
            // NB: Vue maintains binding with Array methods, push(), splice(), etc.
            if (me.sortToIndex >= me.items.length) {
              var k = me.sortToIndex - me.items.length;
              while ((k--) + 1) {
                me.items.push(undefined);
              }
            }
            me.items.splice(me.sortToIndex, 0, me.items.splice(me.sortFromIndex, 1)[0]);

          }
        })
        .disableSelection();

    }
  });
  
  
  Vue.component('tr-item', {

    props: ['item'],
    
    template: `
							<div class="tile tile-collapse">
								<div data-parent="#{{'ui_tile_example_parent_ID'+_uid}}" data-target="#{{'ui_tile_example_'+_uid}}" data-toggle="tile">
									<div class="tile-side pull-left">
										<div class="avatar avatar-sm">
											<span class="icon">alarm</span>
										</div>
									</div>
									<div class="tile-inner">
										<div class="text-overflow">lorem ipsum dolor sit amet</div>
									</div>
								</div>
								<div class="tile-active-show collapse" id="{{'ui_tile_example_'+_uid}}">
									<div class="tile-sub">
										<p>Additional information<br><small>Aliquam in pharetra leo. In congue, massa sed elementum dictum, justo quam efficitur risus, in posuere mi orci ultrices diam.</small></p>
									</div>
									<div class="tile-footer">
										<div class="tile-footer-btn pull-left">
											<a class="btn btn-flat waves-attach" href="javascript:void(0)"><span class="icon">check</span>&nbsp;OK</a>
											<a class="btn btn-flat waves-attach" data-toggle="tile" href="#ui_tile_example_4"><span class="icon">close</span>&nbsp;Cancel</a>
										</div>
									</div>
								</div>
							</div>
              `,
    
    xtemplate: `
              <div class="tile tile-collapse">
								<div class="drag-handle" data-target="#{{ _uid }}" data-toggle="tile">
									<div class="tile-side pull-left">
										<div class="avatar avatar-sm avatar-brand">
											<span class="icon">backup</span>
										</div>
									</div>
									<div class="tile-inner">
										<div class="text-overflow">{{ item.name }}</div>
									</div>
								</div>
								<div class="tile-active-show collapse " id="{{ _uid }}">

									<div class="tile-sub">
                  <nav class="tab-nav tab-nav-brand margin-top-no">
									<ul class="nav nav-justified">
										<li class="">
											<a class="waves-attach waves-effect" data-toggle="tab" href="#ui_tab_example_1_brand" aria-expanded="false">First Tab</a>
										</li>
										<li class="">
											<a class="waves-attach waves-effect" data-toggle="tab" href="#ui_tab_example_2_brand" aria-expanded="false">Second Tab</a>
										</li>
										<li class="active">
											<a class="waves-attach waves-effect" data-toggle="tab" href="#ui_tab_example_3_brand" aria-expanded="true">Third Tab</a>
										</li>
									</ul>
								<div class="tab-nav-indicator" style="left: 358.906px; right: 0.09375px;"></div>
                </nav>
                  <p>
                    <div class="checkbox switch">
                        <label for="switch-{{ _uid }}">
                            <input class="access-hide" id="switch-{{ _uid }}" name="switch-{{ _uid }}" type="checkbox"><span class="switch-toggle"></span>
                        </label>
                    </div>
                  </p>
										<p>Additional information<br><small>Aliquam in pharetra leo. In congue, massa sed elementum dictum, justo quam efficitur risus, in posuere mi orci ultrices diam.</small></p>
                    <input type="range" v-model="item.max" />
									</div>
								</div>
							</div>
            `,
   
//									<div class="tile-footer">
//										<div class="tile-footer-btn pull-left">
//											<a class="btn btn-flat waves-attach waves-effect" href="javascript:void(0)"><span class="icon">check</span>&nbsp;OK</a>
//											<a class="btn btn-flat waves-attach waves-effect" data-toggle="tile" href="#{{ _uid }}"><span class="icon">close</span>&nbsp;Cancel</a>
//										</div>
//									</div>
    
    ready: function () {

      me = this;
      $(this.$el).collapse({
        toggle: false
      })
      //.disableSelection();

   }

//  xtemplate: ` 
//        <div class="card">
//                  <h4>tr-item</h4>
//                  <label>Name:<input v-model="item.name" /></label><br />
//                  <label>Type:<input v-model="item.type" /></label><br />
//                  <label>Min:<input v-model="item.min" /></label><br />
//                  <label>Max:<input v-model="item.mix" /></label><br />
//                  <h5>Debug:</h5>
//                  {{  item | json }}
//            
//                </div>
//              `
});
  
Vue.component('j-bitmap', {

  template: '<div class="widget widget-bitmap">' +
    '<div class="title">{{ index }}: {{ title }}</div>' +
    '<div class="canvas_key"><canvas v-el:canvas1></canvas></div>' +
    '<div class="canvas"></div>' +
    '<div class="palette"></div>' +
    '</div>',

  props: ['index', 'bitmap'],

  ready: function () {

    // Update imageData		  
    //      var bitmap = this.bitmap;
    //      bitmap.generateImageData( bitmap.pixels, bitmap.palette, bitmap.imageData );
    //    
    //      // Update canvas
    //      this.$els.canvas1.getContext('2d').putImageData( bitmap.imageData, 0, 0 );     
    //      
    //      // Create helper      
    //      var helper = $(this.$el).clone();
    //      $(helper).find('canvas')[0].getContext('2d').putImageData( bitmap.imageData, 0, 0);

  }

});
  
  Vue.component('tr-text', {

    props: ['label', 'value'],

    template: ` <h4>tr-text</h4>
                <label>{{label}}</label>
                <input type="text" value="{{value}}" />
              `

  });
  
  // VUE APP
  //
  var MOEEditor = new Vue({

    el: '#app',
    
    data: model,
    
    methods: {
      
      loadBitmap: function(e) {
        
        for (var i=0, l=e.target.files.length;i<l;i++) {
          var file = e.target.files[i];
          var tmppath = URL.createObjectURL(file);
          serveBitmap(tmppath, function(bitmap) { 
            this.bitmaps.push(bitmap);
          }.bind(this));
        }
        
      },
      
      addBitmap: function() {
        
        serveBitmap("img/bmp/newtest.bmp", function(bitmap) { 
           this.bitmaps.push(bitmap);
        }.bind(this));
        
      },
      
      removeItem: function(item) {
        this.list.$remove(item)
      },
      
      changeFirst: function() {
        this.list[0] && (this.list[0].name = this.list[0].name.toUpperCase())
      }
      
    }
    
  });     

  
  
//  Vue.component('j-collection', {
//    
//    template: `<div class="j-collection">
//               <ul class="j-list" v-el="mylist">
//                <component v-for="(windex, item) in items" :index="windex" :index="$index" :bitmap="item" is="tr-item"></component>
//               </ul>
//              </div>`,
//    
//    props:    ['items'],
//    
//                ready:  function() {
//                   
//                   $(this.$el).find(".j-list").css({"border":"1px solid red;"})
//                   .sortable({
//                     placeholder: "widget widget-bitmap"
//                   }).disableSelection();
//                  
//                }
//
//  });  
});


