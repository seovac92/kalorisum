import { createStore } from 'vuex'

export default createStore({
  state: {
    userStatus:false
  },
  getters: {
  },
  mutations: {
    SET_USERSTATUS(state,payload){
      state.userStatus=payload
    }
  },
  actions: {
    setUserStatus(store,payload){
      store.commit("SET_USERSTATUS",payload)
    }
  },
  modules: {
  }
})
