// 高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，
// 它是一种基于 React 的组合特性而形成的设计模式。
// 具体而言，高阶组件是参数为组件，返回值为新组件的函数。
// 复用逻辑，不是ui
// 这里使用组合，相当于在FormItemGroup内判断

import React, { Component } from 'react';
import { FormItemGroup } from '@/components';
import { message } from 'antd';
import PropTypes from 'prop-types';
import styles from './index.less';

class SearchForm extends Component {
  handleSearchWrap = values => {
    const { handleSearch } = this.props;
    if (!handleSearch) {
      message.info('SearchForm handleSearch参数没有传递！');
      return;
    }
    // 筛选数据
    handleSearch({
      newParams: values,
      newPagination: {
        current: 1,
      },
    });
  };
  render() {
    const { handleSearchWrap, props } = this;
    const {
      formBaseLayout,
      okText,
      cancelText,
      colSpan,
      gutter,
      listData,
      formItemsConfigList,
      btnsAlign,
    } = props;
    return (
      <FormItemGroup
        {...{
          okText,
          cancelText,
          handleOk: handleSearchWrap,
          handleCancel: handleSearchWrap,
          formBaseLayout,
          colSpan,
          gutter,
          listData,
          btnsAlign,
          formItemsConfigList,
          wrapComponentName: SearchForm.name
        }}
      ></FormItemGroup>
    );
  }
}

SearchForm.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  formItemsConfigList: PropTypes.array.isRequired,

  formBaseLayout: PropTypes.object,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  colSpan: PropTypes.number,
  gutter: PropTypes.number,
  btnsAlign: PropTypes.string,
  listData: PropTypes.object,
};

// 指定 props 的默认值：
// 根据预定的值来分别定制组件
// 非必填的就需要有默认值
SearchForm.defaultProps = {
  formBaseLayout: {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  },
  okText: '筛选',
  cancelText: '重置',
  colSpan: 8,
  gutter: 24,
  btnsAlign: 'right',
  listData: {},
};

export default SearchForm;
