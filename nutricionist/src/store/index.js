import { createStore } from 'vuex'

export default createStore({
  state: {
    userStatus:false,
    userLevel:null
  },
  getters: {
  },
  mutations: {
    SET_USERSTATUS(state,payload){
      state.userStatus=payload
    },
    SET_USERLEVEL(state,payload){
      state.userLevel=payload
    }
  },
  actions: {
    setUserStatus(store,payload){
      store.commit("SET_USERSTATUS",payload)
    },
    setUserLevel(store,payload){
      store.commit("SET_USERLEVEL",payload)
    }
  },
  modules: {
  }
})
