import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
let user = uni.getStorageSync('user') || {};
let token = uni.getStorageSync('token') || '';
const store = new Vuex.Store({
  state: {
    user: user,
    token: token,
    address: {},
  },
  mutations: {
    login(state, data) {
      state.user = data.user;
      state.token = data.token;
      uni.setStorageSync('user', data.user);
      uni.setStorageSync('token', data.token);
    },
    updateUserInfo(state, user) {
      state.user = user;
      uni.setStorageSync('user', user);
    },
    logout(state) {
      state.user = {};
      state.token = '';
      uni.removeStorageSync('user');
      uni.removeStorageSync('token');
    },
    storeAddress(state, data) {
      state.address = data;
    },
  },
});

export default store;
