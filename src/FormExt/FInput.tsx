import React from 'react';
import { Input } from 'antd';
import InputExt from '../BaseComponentExt/InputExt';
import { FInputProps, FSearchProps, FTextAreaProps } from './types';

const { Search } = Input;
const { TextArea } = Input;

function renderInput(props: FInputProps): React.ReactNode {
  const { decoratorOpt, rcform, key, formId, autoGetContainer, type, ...restProps } = props;
  return rcform.getFieldDecorator(key, decoratorOpt)(
    <InputExt {...restProps} />
  );
}

function renderSearch(props: FSearchProps): React.ReactNode {
  const { decoratorOpt, rcform, key, formId, autoGetContainer, type, ...restProps } = props;
  return rcform.getFieldDecorator(key, decoratorOpt)(
    <Search {...restProps} />
  );
}

function renderTextArea(props: FTextAreaProps): React.ReactNode {
  const { decoratorOpt, rcform, key, formId, autoGetContainer, type, ...restProps } = props;
  return rcform.getFieldDecorator(key, decoratorOpt)(
    <TextArea {...restProps} />
  );
}

export default function FInput(props: FInputProps | FSearchProps | FTextAreaProps): React.ReactNode {
  // 运行前
  if (props.type === 'input') {
    return renderInput(props);
  }

  if (props.type === 'search') {
    return renderSearch(props);
  }

  if (props.type === 'textarea') {
    return renderTextArea(props);
  }

  return (): React.ReactNode => null;
}
