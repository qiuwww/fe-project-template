import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Button, Form, Input, Row, Col, Divider } from 'antd';
import { SearchForm, TableList, ModalCom, AddForm, HeaderBack } from '@/components';

const modalItemLayoutFull = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@Form.create()
@connect(({ management, loading }) => ({
  // 设置一个变量loading，在事件执行前是false，执行中是true，执行之后是false
  loading: loading.effects['management/fetchMovieList'],
  management,
}))
class Media extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {},
      pagination: {
        current: 1,
        pageSize: 10,
      },
      addMediaModal: {
        visible: false,
        title: '新建媒体',
      },
    };
    // 这里的laoding，是umi默认注入进去的，dva-loading组件
    console.log('loading', this.props.loading);
  }
  // 配置
  static defaultProps = {
    searchConfigList: [
      {
        type: 'input',
        label: '借款编号',
        name: 'tradeNo',
        initialValue: 123,
        col: 16,
        itemLayout: {
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 20,
          },
        },
        // extra: '123'
      },
      // {
      //   type: 'reactNode',
      //   reactNode: <div style={{height: '20px', width: '100%', backgroundColor: 'red'}}></div>,
      // },
      {
        type: 'checkbox',
        name: 'industryType',
        label: '行业类型',
        options: [
          {
            label: '金融',
            value: 1,
          },
          {
            label: '游戏',
            value: 2,
          },
          {
            label: '文具',
            value: 3,
          },
        ],
        initialValue: ['A', 'B'],
        col: 16,
        itemLayout: {
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 20,
          },
        },
      },
      {
        type: 'input',
        label: '姓名',
        name: 'name',
      },
      {
        type: 'switch',
        label: '状态',
        name: 'status',
        childrenTips: ['开', '关'],
        initialValue: '开',
      },
      {
        type: 'formItem',
        name: 'password',
        label: '密码',
        reactNode: (
          <Row>
            <Col span={12}>
              <Input type="text" value="123" />
            </Col>
            <Col span={12}>
              <Button>123</Button>
            </Col>
          </Row>
        ),
      },
      {
        type: 'radioButton',
        label: '日期',
        name: 'date',
        initialValue: 1,
        list: [
          {
            label: '今日',
            value: 1,
          },
          {
            label: '昨日',
            value: 2,
          },
          {
            label: '近7日',
            value: 3,
          },
        ],
      },
      {
        type: 'rangePicker',
        label: '申请日期',
        name: 'startDate_endDate',
      },
      {
        type: 'select',
        label: '状态',
        name: 'status',
      },
    ],
    addMediaConfigList: [
      {
        type: 'input',
        label: '媒体名称',
        name: 'name',
        // initialValue: 123,
        // col: 16,
        // itemLayout: {
        //   labelCol: {
        //     span: 4,
        //   },
        //   wrapperCol: {
        //     span: 20,
        //   },
        // },
      },
      {
        type: 'input',
        label: '包名',
        name: 'pkgName',
      },
      {
        type: 'select',
        label: '平台',
        name: 'plateform',
        list: [
          {
            label: 'ios',
            value: 1,
          },
          {
            label: 'android',
            value: 2,
          },
        ],
      },
      {
        type: 'select',
        label: '接入方式',
        name: 'accessMethod',
        list: [
          {
            label: 'api',
            value: 1,
          },
          {
            label: 'api2',
            value: 2,
          },
        ],
      },
      {
        type: 'select',
        label: '行业',
        name: 'industry',
        list: [
          {
            label: '软件',
            value: 'soft',
          },
          {
            label: '电子',
            value: 'electronic',
          },
        ],
      },
      {
        type: 'select',
        label: '支持deeplink',
        name: 'deeplink',
        list: [
          {
            label: '是',
            value: 1,
          },
          {
            label: '否',
            value: 2,
          },
        ],
      },
      {
        type: 'inputTags',
        label: '关键字',
        name: 'keywords',
        col: 24,
        itemLayout: modalItemLayoutFull,
      },
      {
        type: 'input',
        label: '下载地址',
        name: 'downloadUrl',
        col: 24,
        itemLayout: modalItemLayoutFull,
        rules: [
          {
            required: false,
            message: `非必填`,
          },
        ],
      },
      {
        type: 'textarea',
        label: '简介',
        name: 'introduction',
        col: 24,
        rows: 5,
        itemLayout: modalItemLayoutFull,
      },
    ],
  };

  componentWillMount = () => {
    // 初始化默认值，从searchPropsCombination()的结果中读取
    this.getEnumList();
    this.setDefaultProps(() => {
      this.handleFetch();
    });
  };

  getEnumList = () => {
    this.props.dispatch({
      type: 'management/statusEnumList',
      payload: {},
    });
  };
  setDefaultProps = (callback = () => {}) => {
    const searchConfigList = this.props.searchConfigList || [];
    const paramsDefault = {};
    searchConfigList.forEach(item => {
      const { name, initialValue } = item;
      if (initialValue) {
        paramsDefault[name] = initialValue;
      }
    });
    this.setState(
      {
        params: paramsDefault,
      },
      () => {
        callback();
      },
    );
  };

  handleFetch = ({ newParams = {}, newPagination = {} } = {}) => {
    const { params, pagination } = this.state;
    const paramsCombination = {
      ...params,
      ...newParams,
    };
    const paginationCombination = {
      ...pagination,
      ...newPagination,
    };
    this.setState(
      {
        params: paramsCombination,
        pagination: paginationCombination,
      },
      () => {
        this.props.dispatch({
          type: 'management/fetchMovieList',
          payload: {
            pagination: paginationCombination,
            params: paramsCombination,
          },
        });
      },
    );
  };

  // 新增媒体
  addMediaOpen = () => {
    this.setState({
      addMediaModal: {
        ...this.state.addMediaModal,
        visible: true,
      },
    });
  };
  addMediaCancel = () => {
    this.setState({
      addMediaModal: {
        ...this.state.addMediaModal,
        visible: false,
      },
    });
  };
  addMediaOk = values => {
    console.log('addMediaOk', values);
    this.addMediaCancel();
  };

  render() {
    const { addMediaCancel, addMediaOk } = this;
    const { pagination, addMediaModal } = this.state;
    const {
      searchConfigList,
      addMediaConfigList,
      management: { movieListData, statusListData },
      loading,
    } = this.props;
    const handleFetch = this.handleFetch;
    const { data = [], total = 0 } = movieListData;
    const columns = [
      {
        title: '媒体ID',
        dataIndex: 'id',
      },
      {
        title: '媒体名称',
        dataIndex: 'name',
      },
      {
        title: '包名',
        dataIndex: 'pkgname',
      },
      {
        title: '平台',
        dataIndex: 'platform',
      },
      {
        title: '支持deeplink',
        dataIndex: 'deeplink',
        render: value => <span>{value ? '是' : '否'}</span>,
      },
      {
        title: '状态',
        dataIndex: 'status',
      },
      {
        title: '广告位数',
        dataIndex: 'num',
      },
      {
        title: '上架时间',
        dataIndex: 'addedTime',
      },
      {
        title: '操作',
        width: 200,
        render: record => (
          <>
            <Button type="link">查看</Button>
            <Button type="link">编辑</Button>
          </>
        ),
      },
    ];
    console.log('loading', loading);
    return (
      <>
        <HeaderBack />
        <Card style={{ marginBottom: '20px' }}>
          <SearchForm
            {...{
              formItemsConfigList: searchConfigList,
              handleSearch: handleFetch,
              listData: {
                statusListData,
              },
            }}
          />
        </Card>
        <Card>
          <div style={{ textAlign: 'right', marginBottom: '10px' }}>
            <Button
              type="primary"
              icon="plus"
              style={{ cursor: 'pointer' }}
              onClick={this.addMediaOpen}
            >
              新建媒体
            </Button>
          </div>

          <TableList
            {...{
              columns,
              dataSource: data,
              loading,
              pagination: { ...pagination, total },
              handleFetch: handleFetch,
              tableProps: {
                rowKeyProp: 'id',
                otherTableProps: {
                  loading,
                },
              },
            }}
          />
        </Card>
        {/* 通过addMediaModalDetail为一般对象或者null来控制组件渲染 */}
        {addMediaModal.visible && (
          <ModalCom
            {...{
              detail: addMediaModal,
              handleCancle: addMediaCancel,
              width: 600,
            }}
          >
            <AddForm
              {...{
                handleSubmit: addMediaOk,
                handleCancel: addMediaCancel,
                formItemsConfigList: addMediaConfigList,
              }}
            />
          </ModalCom>
        )}
      </>
    );
  }
}

export default Media;
