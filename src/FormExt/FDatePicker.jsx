import React from 'react';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

export default (props) => {
  // restProps 不包含 placeholder
  const { decoratorOpt, form, formItemKey, formClassName, type, placeholder, ...restProps } = props;

  const mapComponent = {
    datePicker: DatePicker,
    rangePicker: RangePicker,
  };

  const arrformQueryClass = formClassName.split(' ').map((item) => {
    return `.${item}`;
  });

  const FinFormItem = mapComponent[type];

  if (!FinFormItem) {
    return null;
  }

  return form.getFieldDecorator(formItemKey, decoratorOpt)(
    <FinFormItem
      style={{ width: '100%' }}
      getCalendarContainer={() => document.querySelector(arrformQueryClass.join(''))}
      {...restProps}
    />
  );
};
