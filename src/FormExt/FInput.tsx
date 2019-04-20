import React from 'react';
import { Input } from 'antd';
import { FInputProps, FSearchProps, FTextAreaProps } from './types';

const { Search } = Input;
const { TextArea } = Input;

function renderInput(props: FInputProps) {
  const { decoratorOpt, rcform, key, formClassName, type, ...restProps } = props;
  restProps.autoComplete = 'off';
  return rcform.getFieldDecorator(key, decoratorOpt)(
    <Input {...restProps} />
  );
}

function renderSearch(props: FSearchProps) {
  const { decoratorOpt, rcform, key, formClassName, type, ...restProps } = props;
  return rcform.getFieldDecorator(key, decoratorOpt)(
    <Search {...restProps} />
  );
}

function renderTextArea(props: FTextAreaProps) {
  const { decoratorOpt, rcform, key, formClassName, type, ...restProps } = props;
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

  return () => null;
};
