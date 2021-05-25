import React, { Component } from 'react';
import { Table } from 'antd';
import styles from './index.less';

class TableList extends Component {
  // 默认添加居中，也就是默认都居中
  columnsAddCenterStyle = (columns = []) => {
    return columns.map(item => {
      return { align: 'center', ...item };
    });
  };
  handleChangePagination = (current, pageSize) => {
    if (this.props.handleFetch) this.props.handleFetch({ newPagination: { current, pageSize } });
  };
  render() {
    const { pagination, dataSource, tableProps, columns } = this.props;
    const { rowKeyProp, otherTableProps } = tableProps;
    const columnsAddCenterStyle = this.columnsAddCenterStyle(columns);
    return (
      <Table
        style={{ background: '#fff' }}
        bordered={true}
        rowKey={(record, index) => {
          return record[rowKeyProp] || index;
        }}
        pagination={{
          // 默认配置
          showTotal: (total, range) => `当前显示${range[0]}-${range[1]} 条，总共 ${total} 条`,
          onChange: this.handleChangePagination,
          onShowSizeChange: this.handleChangePagination,
          showSizeChanger: true,
          showQuickJumper: true,
          hideOnSinglePage: true,
          pageSizeOptions: ['10', '20', '30', '40', '50'],
          current: 1,
          defaultPageSize: 10,
          total: 500,
          // 外部覆盖
          ...pagination,
        }}
        dataSource={dataSource}
        columns={columnsAddCenterStyle}
        {...otherTableProps}
      />
    );
  }
}

export default TableList;
