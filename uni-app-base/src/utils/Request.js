import store from '../store';
export default class Request {
  constructor(obj) {
    this.host = obj.host + '/api/';
    this.plugin = obj.host + '/plugin/';
    this.device_type = obj.device_type;
  }
  post(options) {
    options.method = 'POST';
    options.url = this.host + options.url;
    this.request(options);
  }
  get(options) {
    options.method = 'GET';
    options.url = this.host + options.url;
    this.request(options);
  }
  pay(options) {
    options.method = 'POST';
    options.url = this.plugin + options.url;
    this.request(options);
  }
  request(options) {
    uni.request({
      url: options.url,
      data: options.data,
      method: options.method,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'XX-Token': store.state.token,
        'XX-Device-Type': this.device_type,
        'XX-Api-Version': '1.1.0',
      },
      success: (res) => {
        options.success(res.data);
      },
      fail: (res) => {
        uni.showToast({
          icon: 'none',
          title: '网络错误~',
        });
      },
      complete: options.complete ? options.complete : null,
    });
  }
  // 文件上传
  uploadFile(options) {
    options.url = this.host + options.url;
    let oldSuccess = options.success;
    options.success = function(res) {
      oldSuccess(JSON.parse(res.data));
    };
    options.complete = options.complete ? options.complete : null;
    options.header = {
      'XX-Token': store.state.token,
      'XX-Device-Type': this.device_type,
    };
    uni.uploadFile(options);
  }

  /**
   * 发送验证码
   * username @string 手机号或者邮箱
   * aciton @function 发送成功后的操作
   */
  getVerifiCode(username = '', aciton) {
    uni.showLoading();
    this.post({
      url: 'user/verification_code/send',
      data: {
        username: username,
      },
      success: (res) => {
        if (res.code === 1) {
          aciton;
        } else {
          uni.showToast({
            icon: 'none',
            title: res.msg || '网络错误~',
          });
        }
      },
      complete: () => {
        uni.hideLoading();
      },
    });
  }
}
