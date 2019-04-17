import React from 'react';
import { DatePicker } from 'antd';
import { FDatePickerProps, FRangePickerProps } from './types';
import { getLayoutElement } from './utils';

const { RangePicker } = DatePicker;

export default function FDatePicker(props: FDatePickerProps | FRangePickerProps) {
  const { decoratorOpt, rcform, formItemKey, formClassName, formItemType, ...restProps } = props;

  const mapComponent = {
    datePicker: DatePicker,
    rangePicker: RangePicker,
  };

  const FinFormItem = mapComponent[formItemType];

  return rcform.getFieldDecorator(formItemKey, decoratorOpt)(
    // @ts-ignore
    <FinFormItem
      style={{ width: '100%' }}
      getCalendarContainer={() => getLayoutElement(formClassName)}
      {...restProps}
    />
  );
};
