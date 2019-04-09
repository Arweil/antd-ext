import React from 'react';
import { Input } from 'antd';
import { BaseCompType, FInputMapComponent } from './types';

const { Search } = Input;
const { TextArea } = Input;

export default function FInput<T extends BaseCompType>(props: T) {
  const { decoratorOpt, rcform, formItemKey, formClassName, formItemType, ...restProps } = props;

  const mapComponent: FInputMapComponent = {
    search: Search,
    textarea: TextArea,
    input: Input,
  };

  const FinFormItem = mapComponent[formItemType];

  return rcform.getFieldDecorator(formItemKey, decoratorOpt)(
    <FinFormItem {...restProps} />
  );
};
