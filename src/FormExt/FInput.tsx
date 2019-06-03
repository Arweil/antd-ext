import React from 'react';
import { Input } from 'antd';
import { CompExtendsProps, CompDecoratorExtendsProps } from './types';
import InputExt from '../BaseComponentExt/InputExt';
import { InputProps, TextAreaProps, SearchProps } from 'antd/lib/input';

const { Search } = Input;
const { TextArea } = Input;

// Input
export interface InputExtendsProps extends CompExtendsProps, InputProps {
  type: 'input';
}

export interface FInputProps extends InputExtendsProps, CompDecoratorExtendsProps {
}

// TextArea
export interface TextAreaExtendsProps extends CompExtendsProps, TextAreaProps {
  type: 'textarea'
}

export interface FTextAreaProps extends TextAreaExtendsProps, CompDecoratorExtendsProps {
}

// Search
export interface SearchExtendsProps extends CompExtendsProps, SearchProps {
  type: 'search'
}

export interface FSearchProps extends SearchExtendsProps, CompDecoratorExtendsProps {
}

function renderInput(props: FInputProps) {
  const { decoratorOpt, rcform, key, formClassName, type, ...restProps } = props;
  return rcform.getFieldDecorator(key, decoratorOpt)(
    <InputExt {...restProps} />
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
