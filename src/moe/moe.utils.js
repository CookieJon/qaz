var Utils = {

	isUndefined: function (obj) {
		return obj === undefined;
	},

	isNull: function (obj) {
		return obj === null;
	},

	isNaN: function (obj) {
		return obj !== obj;
	},

	isArray: Array.isArray || function (obj) {
		return obj.constructor === Array;
	},

	isObject: function (obj) {
		return obj === Object(obj);
	},

	isNumber: function (obj) {
		return obj === obj + 0;
	},

	isString: function (obj) {
		return obj === obj + '';
	},

	isBoolean: function (obj) {
		return obj === false || obj === true;
	},

	isFunction: function (obj) {
		return Object.prototype.toString.call(obj) === '[object Function]';
	},


	/* prettyPrint 
	   http://stackoverflow.com/questions/4810841/how-can-i-pretty-print-json-using-javascript
	*/
	prettyPrint: function (obj) {

		return $("<pre />").html(this.syntaxHighlight(obj));
	},

	syntaxHighlight: function (json) {

		if (typeof json != 'string') {
			json = JSON.stringify(json, undefined, 2);
		}
		json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
			var cls = 'number';
			if (/^"/.test(match)) {
				if (/:$/.test(match)) {
					cls = 'key';
				} else {
					cls = 'string';
				}
			} else if (/true|false/.test(match)) {
				cls = 'boolean';
			} else if (/null/.test(match)) {
				cls = 'null';
			}
			return '<span class="' + cls + '">' + match + '</span>';
		});
	},

	deepValue: function _deepValue(object, propertyPath) {
		for (var i = 0, obj = object, path = propertyPath.split('.'), len = path.length; i < len; i++) {
			obj = obj[path[i]];
		};
		return obj;
	},

	extend: function _extend(obj) {
		/* 	More robust version of $.extend, which takes into account property Descriptors, and
		    doesn't turn (gs)etters into plain ol' values during the copy */
		Array.prototype.slice.call(arguments, 1).forEach(function (source) {
			var descriptor, prop;
			if (source) {
				for (prop in source) {
					descriptor = Object.getOwnPropertyDescriptor(source, prop);
					Object.defineProperty(obj, prop, descriptor);
				}
			}
		});
		return obj;
	}



};









var Color = function Color() { //define a Color class for the color objects
	//   this.hex = hexVal;
};



//Object.prototype.deepValue = function(path){
// DEPRECATED: MOVED TO TEMPLATE object.
//	obj = this;
//    for (var i=0, path=path.split('.'), len=path.length; i<len; i++) {
//        obj = obj[path[i]];
//    }
//    return obj;
//};

constructColor = function (color) {

	//  var hex = colorObj.hex.substring(1);
	/ Get the RGB values to calculate the Hue. */
	// var r = parseInt(hex.substring(0, 2), 16) / 255;
	//  var g = parseInt(hex.substring(2, 4), 16) / 255;
	//  var b = parseInt(hex.substring(4, 6), 16) / 255;

	var colorObj = {};

	colorObj.rgb = color;

	var r = color.r;
	var g = color.g;
	var b = color.b;

	colorObj.hex = "#" + toHex(r) + toHex(g) + toHex(b);

	/* Getting the Max and Min values for Chroma. */
	var max = Math.max.apply(Math, [r, g, b]);
	var min = Math.min.apply(Math, [r, g, b]);


	/* Variables for HSV value of hex color. */
	var chr = max - min;
	var hue = 0;
	var val = max;
	var sat = 0;


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
	colorObj.chroma = chr;
	colorObj.hue = hue;
	colorObj.sat = sat;
	colorObj.val = val;
	colorObj.luma = 0.3 * r + 0.59 * g + 0.11 * b;
	colorObj.red = r;
	colorObj.green = g;
	colorObj.blue = b;
	colorObj.r = r;
	colorObj.g = g;
	colorObj.b = b;
	return colorObj;
};

sortColorsByHue = function (colors) {
	return colors.sort(function (a, b) {
		return (a.hue != b.hue) ? a.hue - b.hue : a.chroma - b.chroma;

	});
};

sortColorsByLuma = function (colors) {
	return colors.sort(function (a, b) {
		return a.luma - b.luma;
	});
};

makePalette = function (inputPalette) {

	var palette = [];

	$.each(inputPalette, function (i, v) {
		var color = constructColor(v);
		palette.push(color);
	});

	return palette;

}


oSutputPalette = function (palette, domClass) {

	// sortColorsByHue(palette);

	var out = $("#palette");
	out.html("");

	var info = $("<div class='info'>");
	info.append("#COLORS: " + palette.length);
	out.append(info);
	out.append(" <div style='clear: both;' ></div>");


	for (i = 0; i < palette.length; i++) {
		var block = $('<div class="block" id=' + i + '></div>')
			.css({
				'background': "#" + palette[i].hex
			})
			//  .html(parseInt(palette[i].hue))
			.html("H:" + parseInt(palette[i].hue) + " <br />L: " + parseInt(palette[i].luma) + "<br/>");

		block.on("click", clickPalette);
		block.data("index", i);

		out.append(block);
	}
	out.append(" <div style='clear: both;' ></div>");

};

function clickPalette(event) {

	console.log("Clicked" + $(event.target).data("index"), "Button " + event.which);


	event.preventDefault();
	event.stopPropagation();



}

function toHex(n) {
	n = parseInt(n, 10);
	if (isNaN(n)) return "00";
	n = Math.max(0, Math.min(n, 255));
	return "0123456789ABCDEF".charAt((n - n % 16) / 16) + "0123456789ABCDEF".charAt(n % 16);
}





var rgbToHex = function (r, g, b) {
	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


var hexToRgb = function (hex) {
	// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, function (m, r, g, b) {
		return r + r + g + g + b + b;
	});

	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}



function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}









/**
 *
 * 		MISC. UTILS & TEST 
 * 
 */

function shufflePalette() {



}


function writePalette() {

	var pal = PALETTE;

	//
	str = "";
	for (var i = 0; i < pal.length; i++) {
		color = pal[i];


		str += "[" + color.red + ", " + color.green + ", " + color.blue + "], ";


	}

	console.log(str);


}

function test() {

	var pal = PALETTE;

	for (var i = 0; i < pal.length; i++) {



	}


}



/**
 *
 * DOM & SHORT-CUTS
 * 
 */
function el(id) {
	return document.getElementById(id);
}

function log(string) {
	//console.log(string);
}

String.prototype.toSentenceCase = function () {

	var out = this.replace(/\w+/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
	return out;
}



Math.clamp = function (number, min, max) {
	return Math.max(min, Math.min(number, max));
}




// Populate Array on creation.  
//	e.g. var myArray = [].repeat(what, howmanyTimes)
//
Array.prototype.repeat = function (what, L) {
	while (L) this[--L] = what;
	return this;
}


function clone(obj) {
	return JSON.parse(JSON.stringify(obj));
}


/**
 *
 * COLOR CONVERSION
 * 
 * Color conversion formulas. Previously I used the d3.js library since they
 * have a fantastic API for this. My first profile showed that d3 had the
 * biggest performance hit on my code, so I moved the code to local functions.
 *
 * I didn't test if the d3 functions were optimized by the JiT compiler. I did,
 * however, verify the functions below were optimized properly by the compiler.
 *
 */
var pow = Math.pow;

window.de76 = function (a, b, c, d, e, f) {
	return Math.sqrt(pow(d - a, 2) + pow(e - b, 2) + pow(f - c, 2))
};

window.de76slow = function (lab1, lab2) {
	return Math.sqrt(pow(lab2[0] - lab1[0], 2) + pow(lab2[1] - lab1[1], 2) + pow(lab2[2] - lab1[2], 2))
};

Uint32Array.prototype.getPixelRGB = function (x, y, canvasWidth) {
	var pixel = this[x + (y * canvasWidth)];
	return [(pixel) & 0xff, (pixel >> 8) & 0xff, (pixel >> 16) & 0xff];
}

Uint32Array.prototype.getPixelLAB = function (x, y, canvasWidth) {
	var pixel = this[x + (y * canvasWidth)];
	var rgb = [(pixel) & 0xff, (pixel >> 8) & 0xff, (pixel >> 16) & 0xff];
	var xyz = rgbToXyz(rgb[0], rgb[1], rgb[2]);
	return xyzToLab(xyz[0], xyz[1], xyz[2]);
}

function rgbToLab(r, g, b) {
	var xyz = rgbToXyz(r, g, b);
	return xyzToLab(xyz[0], xyz[1], xyz[2]);
}

function rgbToXyz(r, g, b) {
	var _r = (r / 255);
	var _g = (g / 255);
	var _b = (b / 255);

	if (_r > 0.04045) {
		_r = Math.pow(((_r + 0.055) / 1.055), 2.4);
	} else {
		_r = _r / 12.92;
	}

	if (_g > 0.04045) {
		_g = Math.pow(((_g + 0.055) / 1.055), 2.4);
	} else {
		_g = _g / 12.92;
	}

	if (_b > 0.04045) {
		_b = Math.pow(((_b + 0.055) / 1.055), 2.4);
	} else {
		_b = _b / 12.92;
	}

	_r = _r * 100;
	_g = _g * 100;
	_b = _b * 100;

	X = _r * 0.4124 + _g * 0.3576 + _b * 0.1805;
	Y = _r * 0.2126 + _g * 0.7152 + _b * 0.0722;
	Z = _r * 0.0193 + _g * 0.1192 + _b * 0.9505;

	return [X, Y, Z];
}

function xyzToLab(x, y, z) {

	var ref_X = 95.047;
	var ref_Y = 100.000;
	var ref_Z = 108.883;

	var _X = x / ref_X;
	var _Y = y / ref_Y;
	var _Z = z / ref_Z;

	if (_X > 0.008856) {
		_X = Math.pow(_X, (1 / 3));
	} else {
		_X = (7.787 * _X) + (16 / 116);
	}

	if (_Y > 0.008856) {
		_Y = Math.pow(_Y, (1 / 3));
	} else {
		_Y = (7.787 * _Y) + (16 / 116);
	}

	if (_Z > 0.008856) {
		_Z = Math.pow(_Z, (1 / 3));
	} else {
		_Z = (7.787 * _Z) + (16 / 116);
	}

	var CIE_L = (116 * _Y) - 16;
	var CIE_a = 500 * (_X - _Y);
	var CIE_b = 200 * (_Y - _Z);

	return [CIE_L, CIE_a, CIE_b];
}


// easing functions
var Ease = {

	smoothStep: function (t) {
		return t * t * (3 - 2 * t)
	},

	smootherStep: function (t) {
		return t * t * t * (t * (6 * t - 15) + 10)
	},


	// no easing, no acceleration
	linear: function (t) {
		return t
	},
	// accelerating from zero velocity
	easeInQuad: function (t) {
		return t * t
	},
	// decelerating to zero velocity
	easeOutQuad: function (t) {
		return t * (2 - t)
	},
	// acceleration until halfway, then deceleration
	easeInOutQuad: function (t) {
		return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t
	},
	// accelerating from zero velocity 
	easeInCubic: function (t) {
		return t * t * t
	},
	// decelerating to zero velocity 
	easeOutCubic: function (t) {
		return (--t) * t * t + 1
	},
	// acceleration until halfway, then deceleration 
	easeInOutCubic: function (t) {
		return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
	},
	// accelerating from zero velocity 
	easeInQuart: function (t) {
		return t * t * t * t
	},
	// decelerating to zero velocity 
	easeOutQuart: function (t) {
		return 1 - (--t) * t * t * t
	},
	// acceleration until halfway, then deceleration
	easeInOutQuart: function (t) {
		return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
	},
	// accelerating from zero velocity
	easeInQuint: function (t) {
		return t * t * t * t * t
	},
	// decelerating to zero velocity
	easeOutQuint: function (t) {
		return 1 + (--t) * t * t * t * t
	},
	// acceleration until halfway, then deceleration 
	easeInOutQuint: function (t) {
		return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
	}
}





/**
 *
 * 		POLYFILLS
 * 
 */

//
// requestAnimationFrame() polyfill http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
//
/*
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
*/