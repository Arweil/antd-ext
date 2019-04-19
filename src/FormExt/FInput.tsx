import React from 'react';
import { Input } from 'antd';
import { FInputProps, FSearchProps, FTextAreaProps } from './types';

const { Search } = Input;
const { TextArea } = Input;

function renderInput(props: FInputProps) {
  const { decoratorOpt, rcform, formItemKey, formClassName, formItemType, ...restProps } = props;
  restProps.autoComplete = 'off';
  return rcform.getFieldDecorator(formItemKey, decoratorOpt)(
    <Input {...restProps} />
  );
}

function renderSearch(props: FSearchProps) {
  const { decoratorOpt, rcform, formItemKey, formClassName, formItemType, ...restProps } = props;
  return rcform.getFieldDecorator(formItemKey, decoratorOpt)(
    <Search {...restProps} />
  );
}

function renderTextArea(props: FTextAreaProps) {
  const { decoratorOpt, rcform, formItemKey, formClassName, formItemType, ...restProps } = props;
  return rcform.getFieldDecorator(formItemKey, decoratorOpt)(
    <TextArea {...restProps} />
  );
}

export default function FInput(props: FInputProps | FSearchProps | FTextAreaProps): React.ReactNode {
  // 运行前
  if (props.formItemType === 'input') {
    return renderInput(props);
  }

  if (props.formItemType === 'search') {
    return renderSearch(props);
  }

  if (props.formItemType === 'textarea') {
    return renderTextArea(props);
  }

  return () => null;
};
