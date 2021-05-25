import React, { Component, Children } from 'react';
import { Layout, Menu, Icon } from 'antd';
import styles from './BasicLayout.less';
import MenuComponent from './components/MenuComponent';
import HeaderComponent from './components/HeaderComponent';
import { connect } from 'dva';

import logo from '@/assets/imgs/logo2.png';

const { Header, Sider, Content } = Layout;

@connect(({ global }) => ({
  global,
}))
class BasicLayout extends Component {
  state = {};
  render() {
    const {
      children,
      global: { menuList, collapsed },
    } = this.props;
    return (
      <Layout className={styles.BasicLayout}>
        <Sider trigger={null} collapsible collapsed={collapsed} width={256} theme="light">
          <div className={styles.logoWrap}>
            <img src={logo} className={styles.logo} alt="logo" />
            {!collapsed && <h3 className={styles.title}>XX广告投放平台</h3>}
          </div>
          <MenuComponent menuList={menuList}></MenuComponent>
        </Sider>
        <Layout>
          <Header className={styles.header}>
            <HeaderComponent></HeaderComponent>
          </Header>
          <Content className={styles.content}>{children}</Content>
        </Layout>
      </Layout>
    );
  }
}
export default BasicLayout;
