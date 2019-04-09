import React from 'react';
import { DatePicker } from 'antd';
import { BaseCompType, FDatePickerMapComponent } from './types';

const { RangePicker } = DatePicker;

export default function FDatePicker<T extends BaseCompType>(props: T) {
  const { decoratorOpt, rcform, formItemKey, formClassName, formItemType, ...restProps } = props;

  const mapComponent: FDatePickerMapComponent = {
    datePicker: DatePicker,
    rangePicker: RangePicker,
  };

  const arrformQueryClass = formClassName.split(' ').map((item) => {
    return `.${item}`;
  });

  const FinFormItem = mapComponent[formItemType];

  return rcform.getFieldDecorator(formItemKey, decoratorOpt)(
    <FinFormItem
      style={{ width: '100%' }}
      getCalendarContainer={() => document.querySelector(arrformQueryClass.join('')) || document.body}
      {...restProps}
    />
  );
};
