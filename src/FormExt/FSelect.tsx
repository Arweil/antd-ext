import React from 'react';
import { getLayoutElement } from './utils';
import SelectExt from '../BaseComponentExt/SelectExt';
import { FSelectProps } from './types';

export default function FSelect(props: FSelectProps): React.ReactNode {
  const {
    decoratorOpt,
    rcform,
    key,
    formId,
    autoGetContainer,
    ...restProps
  } = props;

  return rcform.getFieldDecorator(key, decoratorOpt)(
    <SelectExt
      getPopupContainer={(): HTMLElement => getLayoutElement(autoGetContainer ? formId : undefined)}
      {...restProps}
    />
  );
}
