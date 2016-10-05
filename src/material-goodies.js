/*!
 * Vue-drag-and-drop-list.js v0.8.1
 * (c) 2016 Hejx
 * Released under the MIT License.
 * https://github.com/Alex-fun/vue-drag-and-drop-list#readme
 */

  'use strict'

  var MaterialGoodies = {}

  MaterialGoodies.install = function (Vue) {
    // save status
//    var dndDropEffectWorkaround = {}
//    var dndDragTypeWorkaround = {}

    console.log('AHOY!')

    Vue.directive('goodies-ripple', {
      bind: function (el, binding, vnode) {
        console.log('jon')
        this.handle = function (event) {
          console.log('RIPPLE')
          event = event.originalEvent || event
          event._dndHandle = true
        }
        this.el.addEventListener('click', this.handle, false)
      },
      update: function (newValue, oldValue) {},
      unbind: function () {
        this.el.removeEventListener('click', this.handle, false)
      }
    })

    console.log('-HOY!')
  }

  module.exports = MaterialGoodies
/*
Vue.directive('demo', {
  bind: function (el, binding, vnode) {
    var s = JSON.stringify
    el.innerHTML =
      'name: '       + s(binding.name) + '<br>' +
      'value: '      + s(binding.value) + '<br>' +
      'expression: ' + s(binding.expression) + '<br>' +
      'argument: '   + s(binding.arg) + '<br>' +
      'modifiers: '  + s(binding.modifiers) + '<br>' +
      'vnode keys: ' + Object.keys(vnode).join(', ')
  }
})
*/
