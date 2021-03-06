import { Alert, Checkbox, Icon } from 'antd';
import React, { Component } from 'react';
import Link from 'umi/link';
import { connect } from 'dva';
import LoginComponents from './components/Login';
import styles from './style.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginComponents;

@connect(({ userAndlogin, loading }) => ({
  // userAndlogin,
  // submitting: loading.effects['userAndlogin/login'],
}))
class Login extends Component {
  loginForm = undefined;

  state = {
    type: 'account',
    autoLogin: true,
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;

    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'userAndlogin/login',
        payload: { ...values, type },
      });
    }
  };

  onTabChange = type => {
    this.setState({
      type,
    });
  };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      if (!this.loginForm) {
        return;
      }

      this.loginForm.validateFields(['mobile'], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;
          dispatch({
            type: 'userAndlogin/getCaptcha',
            payload: values.mobile,
          })
            .then(resolve)
            .catch(reject);
        }
      });
    });

  renderMessage = content => (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );

  render() {
    const { userAndlogin, submitting } = this.props;
    const { status, type: loginType } = userAndlogin;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <LoginComponents
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab="??????????????????">
            {status === 'error' &&
              loginType === 'account' &&
              !submitting &&
              this.renderMessage('????????????????????????admin/ant.design???')}
            <UserName
              name="userName"
              placeholder={`${'?????????'}: admin or user`}
              rules={[
                {
                  required: true,
                  message: '??????????????????!',
                },
              ]}
            />
            <Password
              name="password"
              placeholder={`${'??????'}: ant.design`}
              rules={[
                {
                  required: true,
                  message: '??????????????????',
                },
              ]}
              onPressEnter={e => {
                e.preventDefault();
                this.loginForm.validateFields(this.handleSubmit);
              }}
            />
          </Tab>
          <Tab key="mobile" tab="???????????????">
            {status === 'error' &&
              loginType === 'mobile' &&
              !submitting &&
              this.renderMessage('???????????????')}
            <Mobile
              name="mobile"
              placeholder="?????????"
              rules={[
                {
                  required: true,
                  message: '?????????????????????',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '????????????????????????',
                },
              ]}
            />
            <Captcha
              name="captcha"
              placeholder="?????????"
              countDown={120}
              onGetCaptcha={this.onGetCaptcha}
              getCaptchaButtonText="???????????????"
              getCaptchaSecondText="???"
              rules={[
                {
                  required: true,
                  message: '?????????????????????',
                },
              ]}
            />
          </Tab>
          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              ????????????
            </Checkbox>
            <a
              style={{
                float: 'right',
              }}
              href=""
            >
              ????????????
            </a>
          </div>
          <Submit loading={submitting}>??????</Submit>
          <div className={styles.other}>
            ??????????????????
            <Icon type="alipay-circle" className={styles.icon} theme="outlined" />
            <Icon type="taobao-circle" className={styles.icon} theme="outlined" />
            <Icon type="weibo-circle" className={styles.icon} theme="outlined" />
            <Link className={styles.register} to="/user/register">
              ????????????
            </Link>
          </div>
        </LoginComponents>
      </div>
    );
  }
}

export default Login;
