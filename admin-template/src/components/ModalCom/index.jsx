import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

class ModalCom extends Component {
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  render() {
    const {
      detail: { title },
      handleCancle,
      children,
      width,
    } = this.props;
    return (
      <Modal width={width} title={title} visible={true} onCancel={handleCancle} footer={null}>
        {children}
      </Modal>
    );
  }
}

ModalCom.propTypes = {
  width: PropTypes.number.isRequired,
  detail: PropTypes.object.isRequired,
  handleCancle: PropTypes.func.isRequired,
};
ModalCom.defaultProps = {
  width: 600,
};

export default ModalCom;
