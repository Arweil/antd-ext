import React from 'react';
import { CompExtendsProps, CompDecoratorExtendsProps } from './types';
import { getLayoutElement } from './utils';
import SelectExt from '../BaseComponentExt/SelectExt';
import { SelectProps } from 'antd/lib/select';

// Select
interface FSelectPropsExt {
  dataMap?: {
    [key: string]: string;
    [key: number]: string;
  };
  dataList?: {
    code: string | number;
    name: string;
    disabled?: boolean;
    title?: string;
    className?: string;
  }[];
  optionAll?: boolean;
}

export interface SelectExtendsProps extends CompExtendsProps, FSelectPropsExt, SelectProps {
  type: 'select';
}

export interface FSelectProps extends SelectExtendsProps, CompDecoratorExtendsProps {
}

export default function FSelect(props: FSelectProps) {
  const {
    decoratorOpt,
    rcform,
    key,
    formClassName,
    ...restProps
  } = props;

  return rcform.getFieldDecorator(key, decoratorOpt)(
    <SelectExt
      getPopupContainer={() => getLayoutElement(formClassName)}
      {...restProps}
    />
  );
};
