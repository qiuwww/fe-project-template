import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    vuex_token: '123654789',
  },
  mutations: {
    // payload为用户传递的值，可以是单一值或者对象
    modifyToken(state, payload) {
      state.vuex_token = payload.token;
    },
  },
});

export default store;
