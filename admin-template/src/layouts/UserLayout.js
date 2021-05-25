import React, { Component } from 'react';
import styles from './UserLayout.less';
import logo from '@/assets/imgs/logo.png';
import door from '@/assets/imgs/door.png';
import Link from 'umi/link';

class UserLayout extends Component {
  state = {
    actionName: '',
    jumpUrl: '/',
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    const pathname = nextProps.location.pathname;
    let actionName, jumpUrl;
    // eslint-disable-next-line default-case
    switch (pathname) {
      case '/user/login':
        actionName = '账户激活传送门';
        jumpUrl = '/user/account-activation';
        break;
      case '/user/register':
        actionName = '登陆传送门';
        jumpUrl = '/user/login';
        break;
      case '/user/forget-password':
        actionName = '登陆/注册传送门';
        jumpUrl = '/user/login';
        break;
      case '/user/account-activation':
        actionName = '登陆/注册传送门';
        jumpUrl = '/user/login';
        break;
    }
    return { actionName, jumpUrl };
  }
  render() {
    const { children } = this.props;
    const { actionName, jumpUrl } = this.state;
    return (
      <div className={styles.UserLayout}>
        <div className={styles.userPanel}>
          <img className={styles.logo} src={logo} alt="logo" />
          {children}
        </div>
        <Link to={jumpUrl} className={styles.userJumpLink}>
          <img src={door} alt="door" />
          {actionName}
        </Link>
      </div>
    );
  }
}

export default UserLayout;
