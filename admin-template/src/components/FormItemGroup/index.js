// 封装一个表单的基础结构
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Row,
  Col,
  Select,
  Radio,
  DatePicker,
  Input,
  Button,
  message,
  Switch,
  Checkbox,
} from 'antd';
import styles from './index.less';

const { RangePicker } = DatePicker;
const Option = Select.Option;
const FormItem = Form.Item;
const Search = Input.Search;
const { TextArea } = Input;

@Form.create()
class FormItemGroup extends Component {
  componentWillMount() {
    this.props.form.resetFields();
  }
  // 过滤数据，预处理，需要默认处理的数据
  filterFormData = values => {
    const params = values;
    Object.keys(params).forEach((item, index) => {
      if (item.indexOf('_') > -1) {
        const value = params[item];
        // 默认不存在包含下划线的字段
        const nameArr = item.split('_');
        if (value && value.length > 0) {
          params[nameArr[0]] = params[item][0].format('YYYY-MM-DD');
          params[nameArr[1]] = params[item][1].format('YYYY-MM-DD');
        } else {
          params[nameArr[0]] = '';
          params[nameArr[1]] = '';
        }
        delete params[item];
      }
    });
    return params;
  };
  validateFieldsData = callback => {
    const filterFormData = this.filterFormData;
    // 获取表单数据
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (errors) {
        message.error(errors);
        return;
      }
      // 筛选数据
      callback(filterFormData(values));
    });
  };
  handleOkClick = () => {
    const { handleOk } = this.props;
    if (!handleOk) {
      message.info('FormItemGroup handleOk参数没有传递！');
      return;
    }
    this.validateFieldsData(handleOk);
  };
  handleCancelClick = () => {
    console.log('wrapComponentName', this.props.wrapComponentName);

    const { handleCancel, form } = this.props;
    if (!handleCancel) {
      message.info('FormItemGroup handleOk参数没有传递！');
      return;
    }
    if (this.props.wrapComponentName === 'SearchForm') {
      // 重置表单，并重置数据
      form.resetFields();
      // 重置数据为无条件搜索的结果
      this.validateFieldsData(handleCancel);
    } else {
      handleCancel();
    }
  };
  render() {
    const props = this.props;
    const {
      formItemsConfigList,
      form: { getFieldDecorator },
      formBaseLayout,
      okText,
      cancelText,
      colSpan,
      gutter,
      btnsAlign,
      listData,
    } = props;

    let reactNode;
    return (
      <Form layout="horizontal">
        <Row gutter={gutter} style={{ display: 'flex', flexWrap: 'wrap' }}>
          {formItemsConfigList.map((item, index) => {
            /**
             * formItemLayout: 局部样式控制
             * list: 当是一个select的时候，需要选择项的内容
             * col: 单独设置的占比
             * initialValue: 初始值
             * name: 字段名，如果需要读取list，默认的list名称`listData[`${name}ListData`]`
             * itemLayout: 表单自己的布局
             * rules: 校验规则
             * label: 显示label名称
             */
            const { type, label, name, itemLayout = {}, col, list } = item;
            let valuePropName = 'value';

            const listArr = list || listData[`${name}ListData`] || [];

            switch (type) {
              case 'input':
                reactNode = <Input placeholder={`请输入${label}`} />;
                break;
              case 'textarea':
                reactNode = <TextArea rows={item.rows} placeholder={`请输入${label}`} />;
                break;
              case 'inputTags':
                reactNode = (
                  <Select
                    placeholder={`请输入${label}，完成后enter，可输入多个`}
                    mode="tags"
                  ></Select>
                );
                break;
              case 'switch':
                valuePropName = 'checked';
                reactNode = (
                  <Switch
                    checkedChildren={item.childrenTips[0]}
                    unCheckedChildren={item.childrenTips[1]}
                  />
                );
                break;
              case 'search':
                reactNode = <Search placeholder={`请输入${label}`} enterButton={false}></Search>;
                break;
              case 'select':
                reactNode = (
                  <Select allowClear placeholder={`请选择${label}`}>
                    {listArr.map(_item => (
                      <Option key={_item.label} value={_item.value}>
                        {_item.label}
                      </Option>
                    ))}
                  </Select>
                );
                break;
              case 'rangePicker':
                reactNode = <RangePicker allowClear={false} />;
                break;
              case 'radioButton':
                reactNode = (
                  <Radio.Group>
                    {listArr.map(_item => (
                      <Radio.Button key={_item.label} value={_item.value}>
                        {_item.label}
                      </Radio.Button>
                    ))}
                  </Radio.Group>
                );
                break;
              case 'checkbox':
                const options = item.options;
                reactNode = <Checkbox.Group options={options} />;
                break;
              case 'formItem':
                reactNode = item.reactNode;
                break;
              case 'reactNode':
                return item.reactNode;
                break;
              default:
                reactNode = null;
            }
            return reactNode ? (
              <Col span={col || colSpan} key={item.name} title={`Col-${index}`}>
                <FormItem
                  {...formBaseLayout}
                  {...itemLayout}
                  label={label}
                  labelAlign="right"
                  extra={item.extra || ''}
                >
                  {getFieldDecorator(name, {
                    valuePropName: valuePropName,
                    initialValue: item.initialValue,
                    rules: item.rules || [],
                  })(reactNode)}
                </FormItem>
              </Col>
            ) : null;
          })}
          <Col style={{ flex: 1, textAlign: btnsAlign, paddingTop: '4px' }}>
            <Button style={{ marginRight: 20 }} onClick={this.handleCancelClick}>
              {cancelText}
            </Button>
            <Button type="primary" onClick={this.handleOkClick}>
              {okText}
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

FormItemGroup.propTypes = {
  formItemsConfigList: PropTypes.array.isRequired,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  formBaseLayout: PropTypes.object.isRequired,
  okText: PropTypes.string.isRequired,
  cancelText: PropTypes.string.isRequired,
  colSpan: PropTypes.number.isRequired,
  gutter: PropTypes.number.isRequired,
  btnsAlign: PropTypes.string.isRequired,
  listData: PropTypes.object.isRequired,
};
FormItemGroup.defaultProps = {};
export default FormItemGroup;
