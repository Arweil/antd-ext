import React, { PureComponent } from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { setStateAsync } from '@/utils/reactExt';

export interface ButtonExtProps extends ButtonProps {
  isAsyncClick: boolean;
}

export default class ButtonExt extends PureComponent<ButtonExtProps, {
  fetching: boolean;
}> {
  constructor(props: Readonly<ButtonExtProps>) {
    super(props);

    this.state = {
      fetching: false,
    };

    this.onClick = this.onClick.bind(this);
  }

  async onClick(event: React.MouseEvent<any, MouseEvent>) {
    const { isAsyncClick, onClick } = this.props;
    if (!onClick) {
      return; 
    }

    // 如果标记异步，那么自动加入loading
    if (isAsyncClick) {
      await setStateAsync(this, { fetching: true });
      await onClick(event);
      await setStateAsync(this, { fetching: false });
    } else {
      onClick(event);
    }
  }

  render() {
    const { isAsyncClick, onClick, loading, ...restProps } = this.props;
    const { fetching } = this.state;
    return (
      <Button
        onClick={onClick ? this.onClick : undefined}
        loading={fetching || loading}
        {...restProps}
      >
        {this.props.children}
      </Button>
    )
  }
}
