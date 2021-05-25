// 基于反向继承：拦截生命周期、state、渲染过程
// 渲染劫持，操作state

// 这里的注册、忘记密码、账号激活三部分的结构类似，所一封装以下共用方法，且分别渲染页面
import React, { Component } from 'react';
import { Form, Icon, Input, Button, Select, message, Row, Col } from 'antd';
import { connect } from 'dva';
import styles from './RegisterIIHoc.less';

const FormItem = Form.Item;

// 设置组件展示的名称
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const RegisterIIHoc = WrappedComponent => {
  console.log('RegisterIIHoc封装的原组件: ', WrappedComponent);
  class iiHOC extends WrappedComponent {
    static displayName = `HOC(${getDisplayName(WrappedComponent)})`;
    state = {
      count: 0,
      type: -1,
    };
    // 等于在构造函数内this.interval
    interval = undefined;
    // 拦截生命周期
    componentWillMount() {
      console.log('iiHOC this.state', this.state, iiHOC.displayName);
      let type = -1;
      switch (iiHOC.displayName) {
        case 'HOC(Register)':
          type = 1;
          break;
        case 'HOC(ForgetPassword)':
          type = 2;
          break;
        case 'HOC(AccountActivation)':
          type = 3;
          break;
        default:
          type = -1;
      }
      this.setState({
        type,
      });
    }
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields(['accounts', 'password'], (err, values) => {
        if (err) {
          return;
        }
        // request('/admin/login', {
        //   body: { login: { ...values, password: values.password } },
        // }).then(res => {
        //   if (res.code) {
        //     // message.error(res.msg);
        //     return;
        //   } else {
        //     const data = res.data;
        //     localStorage.setItem('oversea_token', data.token);
        //     localStorage.setItem('oversea_userName', data.adminName);
        //     router.push({ pathname: '/empty' });
        //   }
        // });
      });
    };

    onGetCaptcha = () => {
      let count = 59;
      this.setState({
        count,
      });
      this.interval = window.setInterval(() => {
        count -= 1;
        this.setState({
          count,
        });

        if (count === 0) {
          clearInterval(this.interval);
        }
      }, 1000);
    };
    render() {
      // 如果 this.props.loggedIn 是 true，这个高阶组件会原封不动地渲染 WrappedComponent，如果不是 true 则不渲染
      // 直接调用原render函数，这里也可以更改渲染视图
      const { getFieldDecorator } = this.props.form;
      const { count, type } = this.state;

      return (
        <Form onSubmit={this.handleSubmit} className="user-form">
          {super.render()}
          <FormItem>
            {getFieldDecorator('accounts', {
              rules: [
                { required: true, message: '请输入账户!' },
                {
                  pattern: /^\d{11}$/,
                  message: '手机号格式错误！',
                },
              ],
            })(<Input prefix={<Icon type="team" />} placeholder={'请输入账户'} />)}
          </FormItem>
          <FormItem>
            <Row>
              <Col span={15}>
                {getFieldDecorator('captcha', {
                  rules: [
                    {
                      required: true,
                      message: '请输入验证码！',
                    },
                  ],
                })(
                  <Input
                    prefix={<Icon type="safety-certificate" />}
                    size="large"
                    placeholder="请输入验证码"
                  />,
                )}
              </Col>
              <Col span={8} offset={1}>
                <Button
                  size="large"
                  disabled={!!count}
                  className={styles.getCaptcha}
                  onClick={this.onGetCaptcha}
                  type="primary"
                >
                  {count ? `${count} s` : '发送'}
                </Button>
              </Col>
            </Row>
          </FormItem>
          {type === 1 ? (
            <FormItem>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入联系人姓名' }],
              })(<Input prefix={<Icon type="solution" />} placeholder={'请输入联系人姓名'} />)}
            </FormItem>
          ) : null}
          {type === 2 ? (
            <FormItem>
              {getFieldDecorator('newPassword', {
                rules: [{ required: true, message: '请输入新密码' }],
              })(
                <Input
                  prefix={<Icon type="lock" />}
                  type="password"
                  placeholder={'请输入新密码'}
                />,
              )}
            </FormItem>
          ) : null}
          <FormItem>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              {type === 1 ? '申请注册' : '立即登录'}
            </Button>
          </FormItem>
        </Form>
      );
      // if (this.props.loggedIn) {
      //   return (
      //     <div>
      //       {/* 高阶组件可以 『读取、修改、删除』WrappedComponent 实例的 state，如果需要也可以添加新的 state。 */}
      //       <h2>HOC Debugger Component</h2>
      //       <p>Props</p> <pre>{JSON.stringify(this.props, null, 2)}</pre>
      //       <p>State</p>
      //       <pre>{JSON.stringify(this.state, null, 2)}</pre>
      //       {super.render()}
      //     </div>
      //   );
      // } else {
      //   return (
      //     <div style={{ border: "3px solid green" }}>
      //       你还没有登录!{this.props.name}
      //     </div>
      //   );
      // }
    }
  }
  return Form.create()(iiHOC);
};

export default RegisterIIHoc;

// import React, { Component } from 'react';

// import Link from 'umi/link';

// import { request } from '@/utils';

// import router from 'umi/router';

// @Form.create()
// @connect(({ globals }) => ({
//   // globals,
// }))
// class Register extends Component {
//   state = {
//     count: 0,
//   };
//   // 等于在构造函数内this.interval
//   interval = undefined;

//   componentDidMount() {}

//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.form.validateFields(['accounts', 'password'], (err, values) => {
//       if (err) {
//         return;
//       }
//       // request('/admin/login', {
//       //   body: { login: { ...values, password: values.password } },
//       // }).then(res => {
//       //   if (res.code) {
//       //     // message.error(res.msg);
//       //     return;
//       //   } else {
//       //     const data = res.data;
//       //     localStorage.setItem('oversea_token', data.token);
//       //     localStorage.setItem('oversea_userName', data.adminName);
//       //     router.push({ pathname: '/empty' });
//       //   }
//       // });
//     });
//   };

//   onGetCaptcha = () => {
//     let count = 59;
//     this.setState({
//       count,
//     });
//     this.interval = window.setInterval(() => {
//       count -= 1;
//       this.setState({
//         count,
//       });

//       if (count === 0) {
//         clearInterval(this.interval);
//       }
//     }, 1000);
//   };
//   render() {
//     const { getFieldDecorator } = this.props.form;
//     const { count } = this.state;
//     return (
//       <Form onSubmit={this.handleSubmit} className="user-form">
//         <FormItem>
//           {getFieldDecorator('accounts', {
//             rules: [
//               { required: true, message: '请输入账户!' },
//               {
//                 pattern: /^\d{11}$/,
//                 message: '手机号格式错误！',
//               },
//             ],
//           })(<Input prefix={<Icon type="team" />} placeholder={'请输入账户'} />)}
//         </FormItem>
//         <FormItem>
//           <Row>
//             <Col span={15}>
//               {getFieldDecorator('captcha', {
//                 rules: [
//                   {
//                     required: true,
//                     message: '请输入验证码！',
//                   },
//                 ],
//               })(
//                 <Input
//                   prefix={<Icon type="safety-certificate" />}
//                   size="large"
//                   placeholder="请输入验证码"
//                 />,
//               )}
//             </Col>
//             <Col span={8} offset={1}>
//               <Button
//                 size="large"
//                 disabled={!!count}
//                 className={styles.getCaptcha}
//                 onClick={this.onGetCaptcha}
//                 type="primary"
//               >
//                 {count ? `${count} s` : '发送'}
//               </Button>
//             </Col>
//           </Row>
//         </FormItem>
//         <FormItem>
//           {getFieldDecorator('name', {
//             rules: [{ required: true, message: '请输入联系人姓名' }],
//           })(<Input prefix={<Icon type="solution" />} placeholder={'请输入联系人姓名'} />)}
//         </FormItem>
//         <FormItem>
//           {getFieldDecorator('newPassword', {
//             rules: [{ required: true, message: '请输入新密码' }],
//           })(<Input prefix={<Icon type="lock" />} type="password" placeholder={'请输入新密码'} />)}
//         </FormItem>
//         <FormItem>
//           <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
//             立即登录
//           </Button>
//         </FormItem>
//       </Form>
//     );
//   }
// }

// export default Register;
