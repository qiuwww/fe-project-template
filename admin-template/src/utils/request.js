import { message, notification } from 'antd';
import router from 'umi/router';
import { ENV } from '@/constants';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: response.statusText,
  });
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
function getLanguage() {
  const locale = localStorage.getItem('locale');
  if (locale === 'zhCN') {
    return 'zh';
  } else if (locale === 'enGB') {
    return 'eng';
  } else if (locale === 'idID') {
    return 'ind';
  }
  return 'zh';
}
export default function request(url, options) {
  const defaultOptions = {
    credentials: 'include',
    method: 'GET',
  };
  const token = localStorage.getItem('oversea_token');
  const locale = getLanguage();
  const newOptions = { ...defaultOptions, ...options };
  newOptions.headers = {
    basicParams: JSON.stringify({
      token: token,
      platform: 'web',
      path: localStorage.getItem('menu_selected_key'),
    }),
    Accept: '*/*',
    'Content-Type': 'application/json; charset=utf-8',
    'Accept-Language': locale,
    ...newOptions.headers,
  };
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    newOptions.body = JSON.stringify(newOptions.body);
  }
  const origin = ENV.ORIGIN;
  return fetch(/^http/.test(url) ? url : `${origin}${url}`, newOptions)
    .then(checkStatus)
    .then(response => {
      const promise = response.json();
      promise.then(result => {
        if (result.code === 700) {
          notification.error({
            message: result.msg,
            // description: sl('登录已失效，请刷新页面重新登录'),
          });
          localStorage.removeItem('oversea_token');
          localStorage.removeItem('oversea_userName');
          router.push('/auth/login');
        } else if (result.code !== 0) {
          if (result.msg) message.error(result.msg);
        }
      });
      return promise;
    })
    .catch(e => {});
}
