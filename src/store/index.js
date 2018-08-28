import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import routing from './modules/routing'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    user,
    routing
  }
})
