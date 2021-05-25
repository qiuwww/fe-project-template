import React, { Component } from 'react';
import { Form, Icon, Input, Button, Select, message } from 'antd';
import Link from 'umi/link';

import { connect } from 'dva';
import { request } from '@/utils';
import styles from './index.less';

import router from 'umi/router';
const FormItem = Form.Item;

@Form.create()
@connect(({ globals }) => ({
  // globals,
}))
class Login extends Component {
  componentDidMount() {
    console.log('Login: ', this);
    console.log('switchLanguage: ', window.switchLanguage);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(['accounts', 'password'], (err, values) => {
      if (err) {
        return;
      }
      request('/admin/login', {
        body: { login: { ...values, password: values.password } },
      }).then(res => {
        if (res.code) {
          // message.error(res.msg);
          return;
        } else {
          const data = res.data;
          localStorage.setItem('oversea_token', data.token);
          localStorage.setItem('oversea_userName', data.adminName);
          router.push({ pathname: '/empty' });
        }
      });
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="user-form">
        <FormItem>
          {getFieldDecorator('accounts', {
            rules: [{ required: true, message: '请输入账户!' }],
          })(<Input prefix={<Icon type="team" />} placeholder={'请输入账户'} />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
          })(<Input prefix={<Icon type="lock" />} type="password" placeholder={'请输入密码'} />)}
        </FormItem>
        <FormItem className={styles['forgot-register']}>
          <Link className={styles.forgetPassword} to="/user/forget-password">
            忘记密码
          </Link>
          <Link className={styles['to-register']} to="/user/register">
            立即注册
          </Link>
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            立即登录
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Login;
