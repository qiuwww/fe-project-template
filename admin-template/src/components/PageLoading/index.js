import React from 'react';
import { Spin } from 'antd';
import IEVersion from '@/utils/ieVersion';

// loading components from code split
// https://umijs.org/plugin/umi-plugin-react.html#dynamicimport
export default () => {
  return (
    <div style={{ paddingTop: 100, textAlign: 'center' }}>
      {IEVersion() ? <div>加载中...</div> : <Spin size="large" />}
    </div>
  );
};
