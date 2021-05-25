// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F

// get | post | put | delete(url, params, header).then(res => {}).catch(res => {})

// 读取modules下的所有定义接口

const createService = () => {
  const context = require.context('./modules', false, /\.js$/);
  console.log('context', context, context.keys());

  const fetchApi = context.keys().reduce((total, path) => {
    const filename = path.replace(/\.\/|\.js/g, '');
    total[filename] = context(path).default;
    return total;
  }, {});

  console.log('fetchApi', fetchApi);
};

const install = (Vue, vm) => {
  // 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
  vm.$u.api = {};
};

// 这里需要通过Vue.use引入
export default {
  install,
};
