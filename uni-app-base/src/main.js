import Vue from 'vue';
import App from './App';
import uView from 'uview-ui';
import Request from './utils/Request';

let $host = 'http://121.36.129.150:83/'; // 接口地址
Vue.prototype.$host = $host;

let $uniHost = 'http://121.36.129.150:83'; // uni端访问地址，用于分享H5地址
Vue.prototype.$uniHost = $uniHost;
const $deviceType = 'app';
// 使用uview-ui全端组件
Vue.use(uView);

Vue.config.productionTip = false;

App.mpType = 'app';

// 请求接口
let $request = new Request({
  host: $host,
  device_type: $deviceType,
});
Vue.prototype.$request = $request;

const app = new Vue({
  ...App,
});

// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from '@/services/uView-http.interceptor.js';
Vue.use(httpInterceptor, app);

// http接口API集中管理引入部分
import httpApi from '@/services/uView-http.js';
Vue.use(httpApi, app);

app.$mount();
