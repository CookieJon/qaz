// Imports
//
// Quasar/Vue defaults
import Vue from 'vue'
import VueTouch from 'vue-touch'
import Vuex from 'vuex'
// import VueResource from 'vue-resource'
import Quasar from 'quasar'
import Router from './router'

// Jon Custom additions
// import VueDragAndDropList from 'vue-drag-and-drop-list'
import MaterialGoodies from './material-goodies.js'

import Sortable from 'vue-sortable'
// Theme
//
require('./themes/app.' + __THEME + '.styl') // <-- Option 1. Override Quasar (custom styles/slower)
// require('quasar/dist/quasar.' + __THEME + '.css') // <-- Option 2. Use Quasar defaults (no custom styles/fast)
Quasar.theme.set(__THEME)

// Install Plugins
//
// Quasar/Vue defaults
Vue.use(VueTouch) // Touch events
Vue.use(Vuex) // State Management
// Vue.use(VueResource) // Ajax Requests
Vue.use(Quasar) // Install Quasar Framework

// Jon Custom additions
// Vue.use(VueDragAndDropList)
Vue.use(MaterialGoodies)
Vue.use(Sortable)

// Start Quasar in '#quasar-app'
//
Quasar.start(() => {
  Router.start(Vue.extend({}), '#quasar-app')
})
