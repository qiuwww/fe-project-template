import React, { Component } from 'react';
import { connect } from 'dva';

// import pathToRegexp from 'path-to-regexp';
import Link from 'umi/link';
import { Layout, Menu, Icon } from 'antd';
import styles from './index.less';
// const { Sider } = Layout;
const { SubMenu } = Menu;
// function urlToList(url) {
//   const urllist = url.split('/').filter(i => i);
//   return urllist.map((urlItem, index) => {
//     return `/${urllist.slice(0, index + 1).join('/')}`;
//   });
// }
// export const getFlatMenuKeys = menu =>
//   menu.reduce((keys, item) => {
//     keys.push(item.path);
//     if (item.children) {
//       return keys.concat(getFlatMenuKeys(item.children));
//     }
//     return keys;
//   }, []);

// @connect(({ global }) => ({
//   global: global,
//   menuList: global.menuList,
// }))
class MenuComponent extends Component {
  state = {
    openKeys: [],
  };
  // submenu keys of first level
  // rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
  //   constructor(props) {
  //     super(props);
  //     this.flatMenuKeys = getFlatMenuKeys(this.getMenuList(props));
      // this.state = {
      //   openKeys: this.getDefaultCollapsedSubMenus(props),
      //   selectedKeys: [localStorage.getItem('menu_selected_key')] || [props.location.pathname],
      // };
  //   }

  //   componentWillMount = () => {};
  //   componentWillReceiveProps(nextProps) {
  //     const { menuList } = this.props;
  //     if (nextProps.menuList.length !== menuList.length) {
  //       this.setState({
  //         openKeys: this.getDefaultCollapsedSubMenus(nextProps),
  //       });
  //     }
  //   }
  //   getMenuList = (props = this.props) => {
  //     return props.menuList || [];
  //   };
  //   getDefaultCollapsedSubMenus = props => {
  //     // const { location: { pathname } } = props || this.props;
  //     const selectPath = localStorage.getItem('menu_selected_key') || props.location.pathname;
  //     const menuList = this.getMenuList(props);
  //     let keys = [];
  //     menuList.filter(menu => {
  //       menu.children &&
  //         menu.children.filter(item => {
  //           if (item.path === selectPath) {
  //             keys.push(menu.path);
  //           }
  //         });
  //     });
  //     return keys;
  //   };
  //   getDefaultselectedKeys = props => {};
  //   getMenuMatchKeys = (flatMenuKeys, paths) => {
  //     return paths.reduce(
  //       (matchKeys, path) =>
  //         matchKeys.concat(flatMenuKeys.filter(item => pathToRegexp(item).test(path))),
  //       [],
  //     );
  //   };
  //   getSelectedMenuKeys = () => {
  //     const {
  //       location: { pathname },
  //     } = this.props;
  //     return this.getMenuMatchKeys(this.flatMenuKeys, urlToList(pathname));
  //   };
  conversionPath = path => {
    if (path && path.indexOf('http') === 0) {
      return path;
    } else {
      return `/${path || ''}`.replace(/\/+/g, '/');
    }
  };
  //   getMenuItemPath = item => {
  //     const itemPath = this.conversionPath(item.path);
  //     const icon = this.getIcon(item.icon);
  //     const { target, name } = item;
  //     // Is it a http link
  //     if (/^https?:\/\//.test(itemPath)) {
  //       return (
  //         <a href={itemPath} target={target}>
  //           {icon}
  //           <span>{sl(name)}</span>
  //         </a>
  //       );
  //     }
  //     const { location, isMobile } = this.props;
  //     return (
  //       <Link
  //         to={itemPath}
  //         target={target}
  //         replace={itemPath === location.pathname}
  //         // onClick={
  //         //   isMobile
  //         //     ? () => {
  //         //         onCollapse(true);
  //         //       }
  //         //     : undefined
  //         // }
  //       >
  //         {/*icon*/}
  //         <span>{sl(name)}</span>
  //       </Link>
  //     );
  //   };
  //     return icon;
  //   };
  // checkPermissionItem = (authority, ItemDom) => {
  //   const { Authorized } = this.props;
  //   if (Authorized && Authorized.check) {
  //     const { check } = Authorized;
  //     return check(authority, ItemDom);
  //   }
  //   return ItemDom;
  // };
  getMenuItemPath = item => {
    const itemPath = this.conversionPath(item.path);
    const icon = this.getIcon(item.icon);
    const { target, name } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      );
    }
    const { location, isMobile } = this.props;
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === location.pathname}
        // onClick={
        //   isMobile
        //     ? () => {
        //         onCollapse(true);
        //       }
        //     : undefined
        // }
      >
        {/*icon*/}
        <span>{name}</span>
      </Link>
    );
  };

  getIcon = icon => {
    if (typeof icon === 'string') {
      if (icon.indexOf('http') === 0) {
        return <img src={icon} alt="icon" className={`${styles.icon} sider-menu-item-img`} />;
      }
      return <Icon type={icon} />;
    }
    return icon;
  };

  renderMenuList = (list = []) => {
    if (!list.length) {
      return null;
    }
    return list
      .filter(item => item.name && !item.hideInMenu)
      .map(item => {
        // const ItemDom = this.getSubMenuOrItem(item);
        // return this.checkPermissionItem(item.authority, ItemDom);
        if (item.children) {
          return this.renderSubMenu(item);
        } else {
          return this.renderItem(item);
        }
      });
  };
  renderSubMenu = item => {
    const { icon, name, path } = item;
    const childrenList = item.children || [];
    const isAbleRender = childrenList.some(child => child.name);
    if (!isAbleRender) {
      return null;
    }
    return (
      <SubMenu
        title={
          icon ? (
            <span>
              <Icon type={icon} />
              <span>{name}</span>
            </span>
          ) : (
            name
          )
        }
        key={path}
      >
        {childrenList.map(_item => {
          return this.renderItem(_item);
        })}
      </SubMenu>
    );
  };
  renderItem = item => {
    return <Menu.Item key={item.path}>{item.name}</Menu.Item>;
  };

  getSubMenuOrItem = item => {
    if (item.children && item.children.some(child => child.name)) {
      const childrenItems = this.renderSubMenu(item.children);
      // 当无子菜单时就不展示菜单
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            title={
              item.icon ? (
                <span>
                  {this.getIcon(item.icon)}
                  <span>{item.name}</span>
                </span>
              ) : (
                window.sl(item.name)
              )
            }
            key={item.path}
          >
            {childrenItems}
          </SubMenu>
        );
      }
      return null;
    } else {
      return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
    }
  };
  //   isMainMenu = key => {
  //     const menuList = this.getMenuList();
  //     return menuList.some(item => key && (item.key === key || item.path === key));
  //   };
  //   handleOpenChange = openKeys => {
  //     const lastOpenKey = openKeys[openKeys.length - 1];
  //     const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
  //     this.setState({
  //       openKeys: moreThanOne ? [lastOpenKey] : [...openKeys],
  //       // openKeys: [...openKeys],
  //     });
  //   };

  //   // onCollapse = () =>{
  //   // }
  //   handleSelect = menu => {
  //     localStorage.setItem('menu_selected_key', menu.selectedKeys);
  //     this.setState({
  //       selectedKeys: menu.selectedKeys,
  //     });
  //   };
  //   render() {
  //     const {
  //       location: { pathname },
  //       global: { collapsed },
  //     } = this.props;
  //     const { openKeys, selectedKeys } = this.state;
  //     const menuList = this.getMenuList();

  //     const menuProps = collapsed
  //       ? {}
  //       : {
  //           openKeys,
  //         };
  //     return (
  //       <Sider
  //         trigger={null}
  //         collapsible
  //         collapsed={collapsed}
  //         // onCollapse={this.onCollapse}
  //         width={256}
  //         className={styles.sider}
  //       >
  //         <div className={styles.menu_title}>
  //           <h2>XX广告投放平台</h2>
  //         </div>
  //         <Menu
  //           key="Menu"
  //           mode="inline"
  //           {...menuProps}
  //           selectedKeys={selectedKeys}
  //           onSelect={this.handleSelect}
  //           onOpenChange={this.handleOpenChange}
  //           style={{ width: '100%' }}
  //         >
  //           {this.renderSubMenu(menuList)}
  //         </Menu>
  //       </Sider>
  //     );
  //   }
  handleClick = e => {
    console.log('click ', e);
  };

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };
  render() {
    const { menuList } = this.props;
    console.log('menuList', menuList);
    return (
      <Menu
        onClick={this.handleClick}
        className={styles.menuStyle}
        // openKeys={this.state.openKeys}
        // onOpenChange={this.onOpenChange}
        mode="inline"
        theme="light"
      >
        {this.renderMenuList(menuList)}
      </Menu>
    );
  }
}

export default MenuComponent;
