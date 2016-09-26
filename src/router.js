import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

/*
  Avoid lazy loading while in dev mode
  to benefit from HMR
 */
function load (name) {
  if (process.env.NODE_ENV === 'development') {
    return require('components/' + name + '.vue')
  }
  else {
    return (resolve) => {
      require('bundle?lazy!components/' + name + '.vue')(resolve)
    }
  }
}

let routes = {
  // Not found
  '*': {
    component: load('error404')
  },

  // Default / index
  '/': {
    name: 'index',
    component: load('layouts/layout-main'),
    subRoutes: {
      '/': {component: load('views/view-panels')}
    }
  },

  // Default
  '/view-panels': {
    name: 'panels',
    component: load('layouts/layout-main'),
    subRoutes: {
      '/': {component: load('views/view-panels')}
    }
  },

  // Default
  '/view-sortable': {
    name: 'index',
    component: load('layouts/layout-main'),
    subRoutes: {
      '/': {component: load('views/view-sortable')}
    }
  },

  // Default
  '/view-editor': {
    name: 'index',
    component: load('layouts/layout-main'),
    subRoutes: {
      '/': {component: load('views/view-editor')}
    }
  }

}

let Router = new VueRouter()
Router.map(routes)

export default Router
