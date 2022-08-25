import Vue from 'vue'
import Vuex from 'vuex'
import {getAllUsers} from '@/services/account.services'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allUsers:[],
    nav:false
  },
  getters: {
    allUsers: (state) => state.allUsers
  },
  mutations: {
    setAllUsers(state,allUsers){
        state.allUsers = allUsers
    }
  },
  actions: {
    async getAllUsers({commit}) {
        const allUsers = await getAllUsers();
        commit('setAllUsers',allUsers)
    }
  },
  modules: {
  }
})
 