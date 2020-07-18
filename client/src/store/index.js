import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    slider_show: true,
    slider_left: 0,
    search_show:false,
    adminUser:{}  //管理员信息
  },
  mutations: {
    slider_toggle(state,arg){
      if(arg==false){
        state.slider_show=false
      }else{
        state.slider_show=!state.slider_show
      }
      if(state.slider_show==true){
        state.slider_left = 0
      }else{
        state.slider_left = -4.75
      }
    },
    search_toggle(state,arg){
      if(arg==true){
        state.search_show=arg
      }else if(arg==false){
        state.search_show=arg
      }
    },
    setUser(state,arg){
      if(arg){
        state.adminUser=arg;
      }
    }
  },
  actions: {
    slider_toggle(store,arg){
      store.commit('slider_toggle',arg)
    },
    search_toggle(store,arg){
      store.commit('search_toggle',arg)
    },
    setUser({commit},arg){
      commit('setUser',arg);
    }
  },
  getters : {
    adminUser:state=> state.adminUser
  },
  modules: {
  }
})
