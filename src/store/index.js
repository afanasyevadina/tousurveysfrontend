import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    user(state) {
      return state.user
    }
  },
  mutations: {
    login(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    logout(state) {
      state.user = null
      localStorage.removeItem('user')
    },
    restoreUser(state) {
      if(localStorage.getItem('user')) {
        state.user = JSON.parse(localStorage.getItem('user'))
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
