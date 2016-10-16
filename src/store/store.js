// store.js

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// the root, initial state object
const state = {
  bitmaps: [],
  activeBitmap: {},
  notes: [],
  imgUrls: [
    '/statics/img/resource/bg/more1.png',
    '/statics/img/resource/bg/more2.png',
    '/statics/img/resource/bg/bg2.png',
    '/statics/img/resource/bg/bg10.png',
    '/statics/img/resource/bg/bitmap1.bmp',
    '/statics/img/resource/bg/bitmap2.bmp',
    '/statics/img/resource/bg/bitmap3.bmp',
    '/statics/img/resource/bg/bitmap4.bmp'
  ]
}

//
const actions = {
  addBitmap: ({ commit }, payload) => {
    commit('ADD_BITMAP', '/statics/img/resource/bg/more1.png')
      // return callPromiseAPI(payload).then(res => {
      //   commit('ADD_BITMAP', { res })
      // })
  }
}

// define the possible mutations that can be applied to our state
const mutations = {
  ADD_BITMAP (state, src) {
    var bitmap = {
      id: 'bitmap-' + state.bitmaps.length,
      src: src,
      name: 'Untitled ' + state.bitmaps.length
    }
    // only mutators can mutate the state
    state.bitmaps.push(bitmap)
    state.activeBitmap = bitmap
  },

  DELETE_BITMAP (state) {

  },

  SET_ACTIVE_BITMAP (state, bitmap) {
    state.activeBitmap = bitmap
  }
}

const getters = {
  all: state => state,
  bitmaps: state => state.bitmaps
}

// create the Vuex instance by combining the state and mutations objects
// then export the Vuex store for use by our components
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
