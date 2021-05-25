import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
class HeaderBack extends Component {
  static propTypes = {
    prop: PropTypes,
  };

  render() {
    return (
      <div>
        <Button>返回</Button>
      </div>
    );
  }
}

export default HeaderBack;
