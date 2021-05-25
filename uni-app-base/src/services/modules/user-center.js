// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
let hotSearchUrl = '/ebapi/store_api/hot_search';
let indexUrl = '/ebapi/public_api/index';

// 此处没有使用传入的params参数
const getSearch = (params = {}) =>
  vm.$u.get(hotSearchUrl, {
    id: 2,
  });

export default getSearch;

// 此处使用了传入的params参数，一切自定义即可
export const getInfo = (params = {}) => vm.$u.post(indexUrl, params);

// export const getSearch =
