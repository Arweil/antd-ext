import React, { useState } from 'react';
import { Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal';

export interface ModalExtProps extends ModalProps {
  children?: React.ReactNode;
}

export default function ModalExt(props: ModalExtProps) {
  const [fetching, setFetchingState] = useState(false);

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
      cancelButtonDisabled={fetching}
      {...props}
    >
      {props.children}
    </Modal>
  )
}
