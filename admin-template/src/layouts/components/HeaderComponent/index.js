import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Select, Menu, Icon, Spin, Dropdown, Avatar } from 'antd';
import styles from './index.less';

const Option = Select.Option;

@connect(({ global }) => ({
  global,
}))
class HeaderComponent extends Component {
  state = {};
  componentWillMount = () => {};
  // 这里切换左侧栏
  toggle = () => {
    const { collapsed } = this.props.global;
    this.props.dispatch({
      type: 'global/save',
      payload: {
        collapsed: !collapsed,
      },
    });
  };
  handleLogout = () => {
    localStorage.clear();
    router.push('/auth/login');
  };
  languageHandleChange = value => {
    this.props.dispatch({
      type: 'global/changeLanguage',
      payload: value,
      callback: () => {
        window.location.reload();
      },
    });
  };
  logout = () => {
    debugger;
  };
  render() {
    const {
      global: { collapsed },
    } = this.props;

    console.log('collapsed', collapsed);
    const userName = localStorage.getItem('oversea_userName');
    const menu = (
      <Menu className={styles.menu}>
        <Menu.Item key="logout" onClick={this.handleLogout}>
          <Icon type="logout" />
          退出登录
        </Menu.Item>
      </Menu>
    );
    return (
      <div className={styles.header}>
        <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
          style={{ display: 'inline-block' }}
        />
        {collapsed && <h3 className={styles.title}>XX广告投放平台</h3>}

        <div className={styles.right}>
          {/* <div className={styles.userMsg}> */}
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            size="large"
            alt="用户头像"
          />
          <span className={styles.userName}>{userName || 'userName'}</span>
          <Icon type="logout" className={styles.logoutIcon} onClick={this.logout} />
          {/* <Icon type="exit"></Icon>

            <span className={`${styles.action} ${styles.account}`}>
              <Icon type="user" style={{ marginRight: 10 }} />
            </span> */}
          {/* </div> */}
        </div>
      </div>
    );
  }
}
export default HeaderComponent;
