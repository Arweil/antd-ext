import React from 'react';
import { Input } from 'antd';
import { FInputProps, FSearchProps, FTextAreaProps } from './types';

const { Search } = Input;
const { TextArea } = Input;

function isFInputProps(params: FInputProps | FSearchProps | FTextAreaProps): params is FInputProps {
  return params.formItemType === 'input';
}

function isFSearchProps(params: FInputProps | FSearchProps | FTextAreaProps): params is FSearchProps {
  return params.formItemType === 'search';
}

function isFTextAreaProps(params: FInputProps | FSearchProps | FTextAreaProps): params is FTextAreaProps {
  return params.formItemType === 'textarea';
}

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
  if (isFInputProps(props)) {
    return renderInput(props);
  }

  if (isFSearchProps(props)) {
    return renderSearch(props);
  }

  if (isFTextAreaProps(props)) {
    return renderTextArea(props);
  }

  return () => null;
};
