import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/user'
import settings from './settings'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    settings
  }
})