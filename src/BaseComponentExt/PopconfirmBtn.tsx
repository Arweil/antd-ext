import React, { PureComponent } from 'react';
import { Popconfirm } from 'antd';
import { PopconfirmProps } from 'antd/lib/popconfirm';
import { setStateAsync } from '@/utils/reactExt';
import { ButtonProps } from 'antd/lib/button';
import ButtonExt from './ButtonExt';

interface PopconfirmBtnProps extends PopconfirmProps {
  isAsyncClick?: boolean;
  btnProps?: ButtonProps;
}

interface PopconfirmBtnState {
  fetching: boolean;
}

export default class PopconfirmBtn extends PureComponent<PopconfirmBtnProps, PopconfirmBtnState> {
  constructor(props: Readonly<PopconfirmBtnProps>) {
    super(props);

    this.state = {
      fetching: false,
    };

    this.onConfirm = this.onConfirm.bind(this);
  }

  async onConfirm(): Promise<void> {
    const { isAsyncClick, onConfirm } = this.props;

    if (!onConfirm) {
      return;
    }

    if (isAsyncClick) {
      try {
        await setStateAsync(this, { fetching: true });
        await onConfirm();
      } catch (ex) {
        console.warn(ex);
      } finally {
        await setStateAsync(this, { fetching: false });
      }
    } else {
      onConfirm();
    }
  }

  render(): JSX.Element {
    const { children, onConfirm, btnProps, ...restProps } = this.props;
    const { onClick, loading, ...restBtnProps } = btnProps as ButtonProps;
    const { fetching } = this.state;
    return (
      <Popconfirm {...restProps} onConfirm={onConfirm ? this.onConfirm : undefined}>
        <ButtonExt
          loading={fetching || loading}
          {...restBtnProps}
        >
          {children}
        </ButtonExt>
      </Popconfirm>
    );
  }
}
