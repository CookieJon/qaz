

var Palette = (function() {
	
	var pub 	= {},

	rgbToHex 	= function(r, g, b) {
		
								return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
		
							};

	pub.getColorFromRGBA = function( r, g, b, a ) {
		
        var a = ( a === undefined ) ? 1 : a;   
				var hex = rgbToHex(r, g, b);
				var hsv = rgbToHsv(r, g, b);
		
        var color = { 
						r, g, b, a, hex,
						h: hsv.h, s: hsv.s, v: hsv.v,
						chroma: hsv.chroma,	
						luma: hsv.luma
				};

				return color;

	};
	
  
    // Colorspace converters
    //
    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
    
    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    
    function hexToRgb(hex) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
    
    
    function rgbToHsv (r, g, b) {

        /* Getting the Max and Min values for Chroma. */
        var max = Math.max.apply(Math, [r, g, b]);
        var min = Math.min.apply(Math, [r, g, b]);

        /* Variables for HSV value of hex color. */
        var chr = max - min;
        var hue = 0;
        var val = max;
        var sat = 0;
        var luma = 0.3 * r + 0.59 * g + 0.11 * b;


        if (val > 0) {
            /* Calculate Saturation only if Value isn't 0. */
            sat = chr / val;
            if (sat > 0) {
                if (r == max) {
                    hue = 60 * (((g - min) - (b - min)) / chr);
                    if (hue < 0) {
                        hue += 360;
                    }
                } else if (g == max) {
                    hue = 120 + 60 * (((b - min) - (r - min)) / chr);
                } else if (b == max) {
                    hue = 240 + 60 * (((r - min) - (g - min)) / chr);
                }
            }
        }
        
        return {  h: hue, s: sat, v: val, chroma: chr, luma: luma };
			
    }    
	
	return pub;
	
})();






function PaletteManager() {
    
    var materialDefs = getMaterialColors();
    
    // prepare the raw Material Design (hex) colors
    //
    var materialColors = [];
    
    for (var group in materialDefs) {
        for (var member in materialDefs[group]) {
            
            var hex = materialDefs[group][member];
            var color = constructColorFromHex(hex);
            
            materialColors.push(color);  
         
        }
    }    
    // console.table(materialColors);
    var thePalette = this.paletteRaw;      // default!
    
    //  Color construction
    //
    function constructColorFromHex(hex) {
        var rgb = hexToRgb(hex);
        return constructColorFromRGB(rgb.r, rgb.g, rgb.b, 1);
    }

    this.constructColorFromRGB = function(r, g, b, a) {

        a = ( a === undefined ) ? 1 : a;   

        var color = { };

        // RGBA
        color.r = r;
        color.g = g;
        color.b = b;   
        color.a = a;

        // Hex
        var hex = rgbToHex(r, g, b);
        color.hex = hex;
        
        // HSV
        var hsv = rgbToHsv(r, g, b);
        color.h = hsv.h;
        color.s = hsv.s;
        color.v = hsv.v;
        color.chroma    = hsv.chroma;    
        color.luma      = hsv.luma;

//            color.materialGroup = group;
//            color.materialLevel = level;

        return color;
        
    }
    
    
    
    // Palette arrangements
    //
    var paletteRaw          = getPaletteRaw();
    var paletteSuperColor   = getPaletteSuperColor();
    
//    this.paletteByHue       = getPaletteByHue();
//    this.paletteByHueWave   = getPaletteByHueWave();
//    this.paletteByLuma      = getPaletteByLuma();
        

    function getPaletteRaw () {
        
        return materialColors.slice(0);
        
    }
    
    function getPaletteSuperColor() {
        
        // superColorMap[ ( [0-256] * 10) + [0-9] ] -> materialRaw[0-256]
        //                   ^ Color Map    ^ Normalised pixel value
        
        var tmp = new Uint8Array(256 * 10); // up to 10 shades per color
        
        for ( var i = 0; i< 256; i++ ) {
            
            if ( i > 0 && i < 256 ) {
                
                if ( i < 225 ) {
                    
                    // main sequences
                    //var pos = (i-1) % 14;   // item pos in list of 10/4 sequences
                    
                    var groupPos = parseInt((i-1)/14);
                    
                    var posInGroup = (i-1)%14;
                    
                    var startShade = (posInGroup < 10) ? posInGroup : posInGroup - 10;
                    
                    var length = ( posInGroup < 10 ) ? 10 : 4;
                    
                    
                    for (var c = 0; c < 10; c++) {
                           
                        var extraValue;
                        if (length==10) {
                            extraValue = startShade + c;
                            if ( extraValue > 9) extraValue = 9;
                            
                            
                        } else {
                            // length 4
                            extraValue = startShade + c;
                            if ( extraValue > 9) extraValue = 9;
                            
                        }   
                        
                        tmp[(i*10)+c] = extraValue + (i/2);
                        
                    }
                    
                    
                    
                } else {
                    // final 3 runs of 10
                    
                    
                    
                }
                
                
                
            } else {
                
                // Black / White
                //
                for (var c = 0; c < 9; c ++ ) {
                    tmp[(i*10)+c] = i; // (i will be 0 or 255)
                }
                
            }
            
        }
        
 
        // console.log("SUPERMAP!", tmp);
        return tmp;
        
    }
    
    function sortPalette(code) {
        
        var code = code;
    
        
    }
    
    function generatePalette(id) {
			
		// Produce different arrangements of the same palette of Maaterial Design colors.
		
        	console.log("GENERATE PALETTE ARRANGEMENT ID ", id);
                // original palette
                var paletteFrom = Array.from(materialColors);
                var paletteTo = [];

                // group names
                var colors  =  ["red","pink","purple","deepPurple",
                                "indigo","blue","lightBlue","cyan",
                                "teal","green","lightGreen","lime",
                                "yellow","amber","orange","deepOrange"];
                var greys   = ["brown", "grey", "blueGrey"];

                // color groups
                var groups  = {};
        
                // 1. Black & White
                groups["black"] = paletteFrom[0];
                groups["white"] = paletteFrom[255];
                
                // 2. Color Groups
                for (var i=0; i<colors.length; i++) {
                    groups[colors[i]] = paletteFrom.slice((i*14) + 1, (i*14) + 15);
                }
		
                // 3. Greys
                for (var i=0; i<greys.length; i++) {
                    groups[greys[i]] = paletteFrom.slice((i*10) + 225, (i*10) + 235);
                }
        
                // Combinations
                groups.reds12 		= (groups.red).concat(groups.pink);
								groups.reds34 		= (groups.purple).concat(groups.deepPurple);
                groups.blues12 		= (groups.indigo).concat(groups.blue);
								groups.blues34		= (groups.lightBlue).concat(groups.cyan);
			
                groups.greens12 	= (groups.teal).concat(groups.green);
								groups.greens34		= (groups.lightGreen).concat(groups.lime);
				
                groups.yellows12 	= (groups.yellow).concat(groups.amber)
								groups.yellows34	= (groups.orange).concat(groups.deepOrange);
															 
                groups.allReds 		= (groups.reds12).concat(groups.reds34);
                groups.allBlues 	= (groups.blues12).concat(groups.blues34);
                groups.allGreens 	= (groups.greens12).concat(groups.greens34);
                groups.allYellows 	= (groups.yellows12).concat(groups.yellows34);
		
        				groups.allGreys 	= (groups.brown).concat(groups.grey).concat(groups.blueGrey);
				
        switch (id) {

			//  Raw
			//
			default:
            case "raw":
                return getPaletteRaw();
                break;
		
			// Misc. 
			//	
			case "supercolor":
					return getPaletteSuperColor;

			case "empty":
					return [];

			case "greyscale":
				
				return paletteTo;
				
			case "bichromal":
				
				return paletteTo;

				
				
			// Experimental
			case "experiment1":
                paletteTo = paletteTo
                            .concat( groups.black )
                            .concat( sortColorsByLuma( groups.allReds )  )
                            .concat( shuffleFromTop( sortColorsByLuma( groups.allBlues.concat(groups.allYellows).concat( groups.allGreys ).concat(groups.allGreens )).reverse() ))
                            .concat( groups.white );
				return paletteTo;
								
				
				
			case "experiment2":
                paletteTo = paletteTo
                            .concat( groups.white )
                            .concat( sortColorsByLuma( groups.allReds.concat(groups.allYellows) ).reverse() )
                            .concat( shuffleFromTop( sortColorsByLuma( groups.allBlues.concat(groups.allGreens).concat( groups.allGreys )).reverse() ))
                            .concat( groups.black );
				return paletteTo;
								
				
				
				
			case "experiment3":
                paletteTo = paletteTo
                            .concat( groups.white )
                            .concat( sortColorsByLuma( groups.allGreens.concat(groups.allYellows ) ).reverse() )
                            .concat( shuffleFromTop( sortColorsByLuma( groups.allBlues.concat(groups.allReds).concat( groups.allGreys )).reverse() ))
                            .concat( groups.black );
				return paletteTo;				
				
				
			case "experiment4":
				var a = sortColorsByLuma( groups.allYellows ).slice(0,24);
				var b = sortColorsByLuma( groups.allYellows ).slice(24);
                paletteTo = paletteTo
                            .concat( groups.black )
                            .concat( a )
                            .concat(  sortColorsByLuma( groups.allBlues.concat(groups.allReds).concat(groups.allGreens).concat( b ).concat( groups.allGreys )) )
                            .concat( groups.white );
				return paletteTo;					
				
			// w_rgby1234_b  <-- Nicest!!
			//
            case "w_rgby1234_b_lumaUndulating":
                paletteTo = paletteTo
                            .concat( groups.black )
                            .concat( sortColorsByLuma( groups.allReds.concat( groups.grey )  .concat( groups.white ) ) )
                            .concat( sortColorsByLuma( groups.allBlues).reverse() )
                            .concat( sortColorsByLuma( groups.allGreens.concat( groups.blueGrey )) )
                            .concat( sortColorsByLuma( groups.allYellows.concat( groups.brown ) ).reverse() )
                          ;
                
                return paletteTo;
                
            case "w_rgby1234_g_b_lumaUndulating":
                paletteTo = paletteTo
                            .concat( groups.black )
                            .concat( sortColorsByLuma( groups.allReds ) )
                            .concat( sortColorsByLuma( groups.allBlues) )
                            .concat( sortColorsByLuma( groups.allGreens) )
                            .concat( sortColorsByLuma( groups.allYellows.reverse() ) )
							.concat( sortColorsByLuma( groups.allGreys ) )
                            .concat( groups.white );
                
                return paletteTo;				
				
            case "w_rgby1234_b_lumaRising":
                paletteTo = paletteTo
                            .concat( groups.white )
                            .concat( sortColorsByLuma( groups.allReds.concat( groups.grey ) ) )
                            .concat( sortColorsByLuma( groups.allBlues ) )
                            .concat( sortColorsByLuma( groups.allGreens.concat( groups.blueGrey )) )
                            .concat( sortColorsByLuma( groups.allYellows.concat( groups.brown ) ) )
                            .concat( groups.black );
                
                return paletteTo;
                				
            case "w_rgby1234_b_lumaFalling":
                paletteTo = paletteTo
                            .concat( groups.white )
                            .concat( sortColorsByLuma( groups.allReds.concat( groups.grey ) ).reverse() )
                            .concat( sortColorsByLuma( groups.allBlues ).reverse() )
                            .concat( sortColorsByLuma( groups.allGreens.concat( groups.blueGrey ) ).reverse() )
                            .concat( sortColorsByLuma( groups.allYellows.concat( groups.brown ) ).reverse() )
                            .concat( groups.black );
                
                return paletteTo;                		


			// b_rbgy12_rgby34_g123_w
			//				
            case "b_rbgy12_rgby34_g123_w_lumaUndulating":
				
                paletteTo = paletteTo
                            .concat( groups.black )
                            .concat( sortColorsByLuma(groups.reds12))
							.concat( sortColorsByLuma(groups.blues12).reverse())
							.concat( sortColorsByLuma(groups.greens12))
							.concat( sortColorsByLuma(groups.yellows12).reverse())
                            .concat( sortColorsByLuma(groups.reds34))
							.concat( sortColorsByLuma(groups.blues34).reverse())
							.concat( sortColorsByLuma(groups.greens34))
							.concat( sortColorsByLuma(groups.yellows34).reverse())
					
                            .concat( sortColorsByLuma(groups.blueGrey))
                            .concat( sortColorsByLuma(groups.grey ))
                            .concat( sortColorsByLuma(groups.brown))
                            .concat( groups.white );
				

                return paletteTo;  	
            case "b_rbgy12_rgby34_g123_w_lumaRising":
				
                paletteTo = paletteTo
                            .concat( groups.black )
                            .concat( sortColorsByLuma(groups.reds12))
							.concat( sortColorsByLuma(groups.blues12))
							.concat( sortColorsByLuma(groups.greens12))
							.concat( sortColorsByLuma(groups.yellows12))
                            .concat( sortColorsByLuma(groups.reds34))
							.concat( sortColorsByLuma(groups.blues34))
							.concat( sortColorsByLuma(groups.greens34))
							.concat( sortColorsByLuma(groups.yellows34))
					
                            .concat( sortColorsByLuma(groups.blueGrey))
                            .concat( sortColorsByLuma(groups.grey ))
                            .concat( sortColorsByLuma(groups.brown))
                            .concat( groups.white );
				
                return paletteTo;	
								
            case "b_rbgy12_rgby34_g123_w_lumaFalling":
				
                paletteTo = paletteTo
                            .concat( groups.black )
                            .concat( sortColorsByLuma(groups.reds12).reverse() )
							.concat( sortColorsByLuma(groups.blues12).reverse() )
							.concat( sortColorsByLuma(groups.greens12).reverse() )
							.concat( sortColorsByLuma(groups.yellows12).reverse() )
                            .concat( sortColorsByLuma(groups.reds34).reverse())
							.concat( sortColorsByLuma(groups.blues34).reverse())
							.concat( sortColorsByLuma(groups.greens34).reverse())
							.concat( sortColorsByLuma(groups.yellows34).reverse())
					
                            .concat( sortColorsByLuma(groups.blueGrey))
                            .concat( sortColorsByLuma(groups.grey ))
                            .concat( sortColorsByLuma(groups.brown))
                            .concat( groups.white );
				
                return paletteTo;

                
        }
        
        
    }
    
//
//            for (var i=0; i<13; i++ ) {
//            var start = i*14 +1;
//            var end = start + 14;
//            var range = palette1.slice(start, end);
//            range = pm.sortColorsByLuma(range);
//            $("#output").append(">"+pm.renderPalette(range));
//     
        
        

    // Render to  <#palette>
    //
   function outputPalette(palette, slot ) { 

        // sortColorsByHue(palette);

	   
        var out =  $("#palette" + slot ).find(".colors"); // 0= bitmap  1=master
        
	   	if (palette === undefined) {
			out.html("Palette undefined.");
			
		} 
	   
	   
	    $("#palette" + slot ).find(".title").html(palette.length + " colors"); 
	   
        out.html("");
       
        //  var info = $("<div class='info'>");
        //  out.append(info);

        for (i = 0; i < palette.length; i++){
            
            var col = palette[i];
            
                try {

					var block = $('<div class="block" id=' + i +'></div>')
						.css({'background': col.hex});
						} catch(e) {
							console.log(palette, i);
						};
			
						//.html(palette[i].hex + "  " + palette[i].r + " " + palette[i].g + " " + palette[i].b);
						//  .html(parseInt(palette[i].hue))
						//.html("H:" + parseInt(palette[i].hue) + " <br />L: "+parseInt(palette[i].luma)+"<br/>");

				  		// color//  block.data({"index": i, "hex": col.hex, r: col.r, g: col.g, b: col.b});
						
						col.index = i;
						block.data(col);
						out.append(block);

				}
       
       out.append(" <div style='clear: both;' ></div>");

    };

    
    
    // Sorters
    //
    function sortColorsByHue(colors) {
        return colors.sort(function (a, b) {
            return (a.hue != b.hue) ? a.hue - b.hue : a.chroma - b.chroma;

        });
    };

    function sortColorsByLuma(colors) {
        return colors.sort(function (a, b) {
            return a.luma - b.luma ;
        });
    };

    function shuffleFromTop(colors) {
		
		var len = colors.length;
		
		var tmpColors = Array.from(colors);
		
		for (var i=0; i< len/2; i++) {
			colors[i] = tmpColors[i*2];
			colors[len-i-1] = tmpColors[i*2+1];
		}
		
		return colors;
		
    };

	
	function spreadColors(colors) {
		
		var len = colors.length;
		
		var tmpColors = Array.from(colors);
		
		for (var i=0; i<len; i++) {
			
			
			
		}
		
		
		
	}
  

    function getMaterialColors() {
        
        // 16x 10 + 4
        // 3x  10
        // 1 b 1 w
        // = 256
        
        return { 
            'Black': {'500': '#000000'},
            'Red': { 
                '50': '#FFEBEE', 
                '100': '#FFCDD2', 
                '200': '#EF9A9A', 
                '300': '#E57373', 
                '400': '#EF5350', 
                '500': '#F44336', 
                '600': '#E53935', 
                '700': '#D32F2F', 
                '800': '#C62828', 
                '900': '#B71C1C', 
                'A100': '#FF8A80', 
                'A200': '#FF5252', 
                'A400': '#FF1744', 
                'A700': '#D50000', 
            },

            'Pink': { 
                '50': '#FCE4EC', 
                '100': '#F8BBD0', 
                '200': '#F48FB1', 
                '300': '#F06292', 
                '400': '#EC407A', 
                '500': '#E91E63', 
                '600': '#D81B60', 
                '700': '#C2185B', 
                '800': '#AD1457', 
                '900': '#880E4F', 
                'A100': '#FF80AB', 
                'A200': '#FF4081', 
                'A400': '#F50057', 
                'A700': '#C51162', 
            },

            'Purple': { 
                '50': '#F3E5F5', 
                '100': '#E1BEE7', 
                '200': '#CE93D8', 
                '300': '#BA68C8', 
                '400': '#AB47BC', 
                '500': '#9C27B0', 
                '600': '#8E24AA', 
                '700': '#7B1FA2', 
                '800': '#6A1B9A', 
                '900': '#4A148C', 
                'A100': '#EA80FC', 
                'A200': '#E040FB', 
                'A400': '#D500F9', 
                'A700': '#AA00FF', 
            },

            'Deep Purple': { 
                '50': '#EDE7F6', 
                '100': '#D1C4E9', 
                '200': '#B39DDB', 
                '300': '#9575CD', 
                '400': '#7E57C2', 
                '500': '#673AB7', 
                '600': '#5E35B1', 
                '700': '#512DA8', 
                '800': '#4527A0', 
                '900': '#311B92', 
                'A100': '#B388FF', 
                'A200': '#7C4DFF', 
                'A400': '#651FFF', 
                'A700': '#6200EA', 
            },

            'Indigo': { 
                '50': '#E8EAF6', 
                '100': '#C5CAE9', 
                '200': '#9FA8DA', 
                '300': '#7986CB', 
                '400': '#5C6BC0', 
                '500': '#3F51B5', 
                '600': '#3949AB', 
                '700': '#303F9F', 
                '800': '#283593', 
                '900': '#1A237E', 
                'A100': '#8C9EFF', 
                'A200': '#536DFE', 
                'A400': '#3D5AFE', 
                'A700': '#304FFE', 
            },

            'Blue': { 
                '50': '#E3F2FD', 
                '100': '#BBDEFB', 
                '200': '#90CAF9', 
                '300': '#64B5F6', 
                '400': '#42A5F5', 
                '500': '#2196F3', 
                '600': '#1E88E5', 
                '700': '#1976D2', 
                '800': '#1565C0', 
                '900': '#0D47A1', 
                'A100': '#82B1FF', 
                'A200': '#448AFF', 
                'A400': '#2979FF', 
                'A700': '#2962FF', 
            },

            'Light Blue': { 
                '50': '#E1F5FE', 
                '100': '#B3E5FC', 
                '200': '#81D4FA', 
                '300': '#4FC3F7', 
                '400': '#29B6F6', 
                '500': '#03A9F4', 
                '600': '#039BE5', 
                '700': '#0288D1', 
                '800': '#0277BD', 
                '900': '#01579B', 
                'A100': '#80D8FF', 
                'A200': '#40C4FF', 
                'A400': '#00B0FF', 
                'A700': '#0091EA', 
            },

            'Cyan': { 
                '50': '#E0F7FA', 
                '100': '#B2EBF2', 
                '200': '#80DEEA', 
                '300': '#4DD0E1', 
                '400': '#26C6DA', 
                '500': '#00BCD4', 
                '600': '#00ACC1', 
                '700': '#0097A7', 
                '800': '#00838F', 
                '900': '#006064', 
                'A100': '#84FFFF', 
                'A200': '#18FFFF', 
                'A400': '#00E5FF', 
                'A700': '#00B8D4', 
            },

            'Teal': { 
                '50': '#E0F2F1', 
                '100': '#B2DFDB', 
                '200': '#80CBC4', 
                '300': '#4DB6AC', 
                '400': '#26A69A', 
                '500': '#009688', 
                '600': '#00897B', 
                '700': '#00796B', 
                '800': '#00695C', 
                '900': '#004D40', 
                'A100': '#A7FFEB', 
                'A200': '#64FFDA', 
                'A400': '#1DE9B6', 
                'A700': '#00BFA5', 
            },

            'Green': { 
                '50': '#E8F5E9', 
                '100': '#C8E6C9', 
                '200': '#A5D6A7', 
                '300': '#81C784', 
                '400': '#66BB6A', 
                '500': '#4CAF50', 
                '600': '#43A047', 
                '700': '#388E3C', 
                '800': '#2E7D32', 
                '900': '#1B5E20', 
                'A100': '#B9F6CA', 
                'A200': '#69F0AE', 
                'A400': '#00E676', 
                'A700': '#00C853', 
            },

            'Light Green': { 
                '50': '#F1F8E9', 
                '100': '#DCEDC8', 
                '200': '#C5E1A5', 
                '300': '#AED581', 
                '400': '#9CCC65', 
                '500': '#8BC34A', 
                '600': '#7CB342', 
                '700': '#689F38', 
                '800': '#558B2F', 
                '900': '#33691E', 
                'A100': '#CCFF90', 
                'A200': '#B2FF59', 
                'A400': '#76FF03', 
                'A700': '#64DD17', 
            },

            'Lime': { 
                '50': '#F9FBE7', 
                '100': '#F0F4C3', 
                '200': '#E6EE9C', 
                '300': '#DCE775', 
                '400': '#D4E157', 
                '500': '#CDDC39', 
                '600': '#C0CA33', 
                '700': '#AFB42B', 
                '800': '#9E9D24', 
                '900': '#827717', 
                'A100': '#F4FF81', 
                'A200': '#EEFF41', 
                'A400': '#C6FF00', 
                'A700': '#AEEA00', 
            },

            'Yellow': { 
                '50': '#FFFDE7', 
                '100': '#FFF9C4', 
                '200': '#FFF59D', 
                '300': '#FFF176', 
                '400': '#FFEE58', 
                '500': '#FFEB3B', 
                '600': '#FDD835', 
                '700': '#FBC02D', 
                '800': '#F9A825', 
                '900': '#F57F17', 
                'A100': '#FFFF8D', 
                'A200': '#FFFF00', 
                'A400': '#FFEA00', 
                'A700': '#FFD600', 
            },

            'Amber': { 
                '50': '#FFF8E1', 
                '100': '#FFECB3', 
                '200': '#FFE082', 
                '300': '#FFD54F', 
                '400': '#FFCA28', 
                '500': '#FFC107', 
                '600': '#FFB300', 
                '700': '#FFA000', 
                '800': '#FF8F00', 
                '900': '#FF6F00', 
                'A100': '#FFE57F', 
                'A200': '#FFD740', 
                'A400': '#FFC400', 
                'A700': '#FFAB00', 
            },

            'Orange': { 
                '50': '#FFF3E0', 
                '100': '#FFE0B2', 
                '200': '#FFCC80', 
                '300': '#FFB74D', 
                '400': '#FFA726', 
                '500': '#FF9800', 
                '600': '#FB8C00', 
                '700': '#F57C00', 
                '800': '#EF6C00', 
                '900': '#E65100', 
                'A100': '#FFD180', 
                'A200': '#FFAB40', 
                'A400': '#FF9100', 
                'A700': '#FF6D00', 
            },

            'Deep Orange': { 
                '50': '#FBE9E7', 
                '100': '#FFCCBC', 
                '200': '#FFAB91', 
                '300': '#FF8A65', 
                '400': '#FF7043', 
                '500': '#FF5722', 
                '600': '#F4511E', 
                '700': '#E64A19', 
                '800': '#D84315', 
                '900': '#BF360C', 
                'A100': '#FF9E80', 
                'A200': '#FF6E40', 
                'A400': '#FF3D00', 
                'A700': '#DD2C00', 
            },

            'Brown': { 
                '50': '#EFEBE9', 
                '100': '#D7CCC8', 
                '200': '#BCAAA4', 
                '300': '#A1887F', 
                '400': '#8D6E63', 
                '500': '#795548', 
                '600': '#6D4C41', 
                '700': '#5D4037', 
                '800': '#4E342E', 
                '900': '#3E2723', 
            },

            'Grey': { 
                '50': '#FAFAFA', 
                '100': '#F5F5F5', 
                '200': '#EEEEEE', 
                '300': '#E0E0E0', 
                '400': '#BDBDBD', 
                '500': '#9E9E9E', 
                '600': '#757575', 
                '700': '#616161', 
                '800': '#424242', 
                '900': '#212121', 
            },

            'Blue Grey': { 
                '50': '#ECEFF1', 
                '100': '#CFD8DC', 
                '200': '#B0BEC5', 
                '300': '#90A4AE', 
                '400': '#78909C', 
                '500': '#607D8B', 
                '600': '#546E7A', 
                '700': '#455A64', 
                '800': '#37474F', 
                '900': '#263238', 
            },
            'White': {'500': '#FFFFFF'},
        }
        // black
        // white
    

    };

    
        
    // PUBLIC OBJECT
    //
    return {
        outputPalette: outputPalette,
        constructColorFromHex: constructColorFromHex,
        constructColorFromRGB: constructColorFromRGB,
        
        getPaletteRaw: getPaletteRaw,
        getPaletteSuperColor: getPaletteSuperColor,
        paletteSuperColor: getPaletteSuperColor(),
        
        
        sortColorsByHue: sortColorsByHue,
        sortColorsByLuma: sortColorsByLuma,
				shuffleFromTop: shuffleFromTop,

        generatePalette: generatePalette,
        
        
    }
    
    
};
