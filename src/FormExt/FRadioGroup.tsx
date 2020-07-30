import React from 'react';
import RadioGroupExt from '../BaseComponentExt/RadioGroupExt';
import { FRadioGroupProps } from './types';

export default function FRadioGroup(props: FRadioGroupProps): React.ReactNode {
  const {
    decoratorOpt,
    rcform,
    key,
    formId,
    autoGetContainer,
    ...restProps
  } = props;

  return rcform.getFieldDecorator(key, decoratorOpt)(
    <RadioGroupExt {...restProps} />
  );
}
