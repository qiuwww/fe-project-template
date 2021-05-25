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

class AddForm extends Component {
  formItemsConfigListAddRequired = (formItemsConfigList = []) => {
    let flag;
    return formItemsConfigList.map(item => {
      const { rules = [], label } = item;
      flag = rules.some(item => item.required === true || item.required === false);
      if (!flag) {
        rules.unshift({
          required: true,
          message: `${label}必填`,
        });
      }
      return { ...item, rules };
    });
  };
  handleSubmitWrap = values => {
    const { handleSubmit } = this.props;
    if (!handleSubmit) {
      message.info('AddForm handleSearch参数没有传递！');
      return;
    }
    // 筛选数据
    handleSubmit(values);
  };
  handleCancelWrap = () => {
    this.props.handleCancel();
  };
  render() {
    const { handleSubmitWrap, handleCancelWrap, props, formItemsConfigListAddRequired } = this;
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
    // 添加默认参数
    return (
      <FormItemGroup
        {...{
          okText,
          cancelText,
          handleOk: handleSubmitWrap,
          handleCancel: handleCancelWrap,
          formBaseLayout,
          colSpan,
          gutter,
          listData,
          btnsAlign,
          formItemsConfigList: formItemsConfigListAddRequired(formItemsConfigList),
          wrapComponentName: AddForm.name
        }}
      ></FormItemGroup>
    );
  }
}
AddForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  formItemsConfigList: PropTypes.array.isRequired,

  formBaseLayout: PropTypes.object,
  formBaseLayoutFull: PropTypes.object,
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
AddForm.defaultProps = {
  formBaseLayout: {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 14,
    },
  },
  okText: '提交',
  cancelText: '取消',
  colSpan: 12,
  gutter: 0,
  btnsAlign: 'center',
  listData: {},
};

export default AddForm;
