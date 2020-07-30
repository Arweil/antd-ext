import React from 'react';
import { getLayoutElement } from './utils';
import DatePickerExt from '../BaseComponentExt/DatePickerExt';
import RangePickerExt from '../BaseComponentExt/RangePickerExt';
import { FDatePickerProps, FRangePickerProps } from './types';

function renderDatePicker(props: FDatePickerProps): React.ReactNode {
  const { decoratorOpt, rcform, key, formId, autoGetContainer, type, ...restProps } = props;

  return rcform.getFieldDecorator(key, decoratorOpt)(
    <DatePickerExt
      getCalendarContainer={(): HTMLElement => getLayoutElement(autoGetContainer ? formId : undefined)}
      {...restProps}
    />
  );
}

function renderRangePicker(props: FRangePickerProps): React.ReactNode {
  const { decoratorOpt, rcform, key, formId, autoGetContainer, type, ...restProps } = props;

  return rcform.getFieldDecorator(key, decoratorOpt)(
    <RangePickerExt
      getCalendarContainer={(): HTMLElement => getLayoutElement(autoGetContainer ? formId : undefined)}
      {...restProps}
    />
  );
}

export default function FDatePicker(props: FDatePickerProps | FRangePickerProps): React.ReactNode {
  // 运行前
  if (props.type === 'datePicker') {
    return renderDatePicker(props);
  }

  if (props.type === 'rangePicker') {
    return renderRangePicker(props);
  }

  return (): React.ReactNode => null;
}
