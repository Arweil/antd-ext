import React, { PureComponent } from 'react';
import { Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import { setStateAsync } from '@/utils/reactExt';


export interface ModalExtProps extends ModalProps {
}

export default class ModalExt extends PureComponent<ModalExtProps, {
  fetching: boolean;
}> {
  private isClick: boolean;

  constructor(props: Readonly<ModalExtProps>) {
    super(props);

    this.state = {
      fetching: false,
    };

    this.isClick = false; // 防止重复点击

    this.onOk = this.onOk.bind(this);
  }

  async onOk(e: React.MouseEvent<any>) {
    if (this.isClick) {
      return;
    }

    this.isClick = true;
    const { onOk } = this.props;
    if (!onOk) {
      return;
    }

    try {
      await setStateAsync(this, {
        fetching: true,
      });

      await onOk(e);
    } catch (ex) {
      console.warn(ex);
    } finally {
      await setStateAsync(this, {
        fetching: false,
      });
    }

    this.isClick = false;
  }

  render() {
    const { onOk, ...restProps } = this.props;
    const { fetching } = this.state;

    return (
      <Modal
        closable={false}
        maskClosable={false}
        style={{
          top: 20,
        }}
        bodyStyle={{
          overflowY: 'scroll',
          maxHeight: window.innerHeight - 150,
        }}
        okButtonProps={{
          loading: fetching,
        }}
        cancelButtonProps={{
          disabled: fetching,
        }}
        onOk={onOk ? this.onOk : undefined}
        {...restProps}
      >
        {this.props.children}
      </Modal>
    )
  }
}

