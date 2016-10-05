/*!
 vue-material-goodiesjs v0.8.1
 * (c) 2016 CookieJon
 * Released under the MIT License.
 * https://github.com/Alex-fun/vue-drag-and-drop-list#readme
 */

  'use strict'

  var MaterialGoodies = {}

  MaterialGoodies.install = function (Vue) {
    // save status
    // var dndDropEffectWorkaround = {}
    // var dndDragTypeWorkaround = {}

    Vue.directive('goodies-ripple', {

      bind: function (el, binding, vnode) {
        this.doRipple = function (e) {
          var target = this.el
          console.log(target, 'target')
            // if (target.tagName.toLowerCase() !== 'button') return false;
          var rect = target.getBoundingClientRect()
          var ripple = target.querySelector('.ripple')
          if (!ripple) {
            ripple = document.createElement('span')
            ripple.className = 'ripple'
            ripple.style.height = ripple.style.width = (Math.max(rect.width, rect.height) * 2) + 'px'
            target.appendChild(ripple)
          }
          ripple.classList.remove('show')
          var top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop
          var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft
          ripple.style.top = top + 'px'
          ripple.style.left = left + 'px'
          ripple.classList.add('show')
          return false
        }.bind(this)

        this.el.addEventListener('click', this.doRipple, false)
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
      'nam e: '       + s(binding.name) + '<br>' +
      'value: '      + s(binding.value) + '<br>' +
      'expression: ' + s(binding.expression) + '<br>' +
      'argument: '   + s(binding.arg) + '<br>' +
      'modifiers: '  + s(binding.modifiers) + '<br>' +
      'vnode keys: ' + Object.keys(vnode).join(', ')
  }
})
*/
