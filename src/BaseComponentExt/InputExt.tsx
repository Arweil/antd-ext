import React, { PureComponent } from 'react';
import { Input, Icon, Tooltip, message, Divider } from 'antd';
import { InputProps } from 'antd/lib/input';

export default class InputExt extends PureComponent<InputProps> {
  render(): JSX.Element {
    return (
      <Input
        autoComplete="off"
        {...this.props}
      />
    );
  }
}

function copyText(value: string): void {
  const input = document.createElement('input');
  document.body.appendChild(input);
  input.setAttribute('value', value);
  input.setAttribute('readonly', 'readonly');
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
  message.success('复制成功');
}

export class InputCopy extends PureComponent<InputProps> {
  render(): JSX.Element {
    const { addonAfter, ...resetProps } = this.props;

    return (
      <InputExt
        addonAfter={
          <React.Fragment>
            <Tooltip title="复制">
              <Icon
                type="copy"
                onClick={(): void => copyText(resetProps.value as string)}
              />
            </Tooltip>
            {
              addonAfter ? (
                <React.Fragment>
                  <Divider type="vertical" style={{ color: '#d9d9d9' }} />
                  {addonAfter}
                </React.Fragment>
              ) : null
            }
          </React.Fragment>
        }
        {...resetProps}
      />
    );
  }
}

export class InputCopyToolTip extends PureComponent<InputProps> {
  render(): JSX.Element {
    const { value } = this.props;
    return (
      <Tooltip title={value}>
        <InputCopy {...this.props} />
      </Tooltip>
    );
  }
}
