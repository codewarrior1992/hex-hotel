import Vue from 'vue'
import Vuex from 'vuex'

import roomModules from './room.js';
import userModules from './user.js';
import orderModules from './order.js'
import calculateModules from './calculate';

Vue.use(Vuex)

export default new Vuex.Store({
  strict : true,
  state: {
    isLoading : false,
    messages : [],
  },
  actions: {
    updateLoading(context, payload){
      context.commit('LOADING', payload)
    },
    showMessage(context, payload){
      context.commit('SHOW_MESSAGE', payload);
    },
    removeMessage(context, timestamp){
      setTimeout(()=>{
        context.commit('REMOVE_MESSAGE', timestamp)
      },6000)
    },
  },
  mutations: {
    LOADING(state, payload){
      state.isLoading = payload
    },
    SHOW_MESSAGE(state, payload){
      state.messages.push(payload)
    },
    REMOVE_MESSAGE(state,timestamp){
      state.messages = state.messages.filter((item) => !item.timestamp == timestamp)
    },
  },
  getters: {
    isLoading(state){
      return state.isLoading
    },
    messages(state){
      return state.messages
    },
  },
  modules: {
    roomModules,
    userModules,
    orderModules,
    calculateModules,
  }
})
