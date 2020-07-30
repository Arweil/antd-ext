import React from 'react';
import CheckboxGroupExt from '../BaseComponentExt/CheckboxGroupExt';
import { FCheckboxGroupProps } from './types';

export default function FCheckboxGroup(props: FCheckboxGroupProps): React.ReactNode {
  const {
    decoratorOpt,
    rcform,
    key,
    formId,
    autoGetContainer,
    ...restProps
  } = props;

  return rcform.getFieldDecorator(key, decoratorOpt)(
    <CheckboxGroupExt {...restProps} />
  );
}
