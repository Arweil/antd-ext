import React from 'react';
import { DatePicker } from 'antd';
import { FDatePickerProps, FRangePickerProps } from './types';
import { getLayoutElement } from './utils';

const { RangePicker } = DatePicker;

function renderDatePicker(props: FDatePickerProps) {
  const { decoratorOpt, rcform, formItemKey, formClassName, formItemType, ...restProps } = props;

  return rcform.getFieldDecorator(formItemKey, decoratorOpt)(
    <DatePicker
      style={{ width: '100%' }}
      getCalendarContainer={() => getLayoutElement(formClassName)}
      {...restProps}
    />
  );
}

function renderRangePicker(props: FRangePickerProps) {
  const { decoratorOpt, rcform, formItemKey, formClassName, formItemType, ...restProps } = props;

  return rcform.getFieldDecorator(formItemKey, decoratorOpt)(
    <RangePicker
      style={{ width: '100%' }}
      getCalendarContainer={() => getLayoutElement(formClassName)}
      {...restProps}
    />
  );
}

export default function FDatePicker(props: FDatePickerProps | FRangePickerProps): React.ReactNode {
  // 运行前
  if (props.formItemType === 'datePicker') {
    return renderDatePicker(props);
  }

  if (props.formItemType === 'rangePicker') {
    return renderRangePicker(props);
  }

  return () => null;
};
