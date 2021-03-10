import Vue from 'vue';
import App from './App';
import uView from 'uview-ui';
// 使用uview-ui全端组件
Vue.use(uView);

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
  ...App,
});
app.$mount();
