import React, { PureComponent } from 'react';
import { DatePicker } from 'antd';
import { DatePickerProps } from 'antd/lib/date-picker/interface';

export default class DatePickerExt extends PureComponent<DatePickerProps, {}> {
  constructor(props: Readonly<DatePickerProps>) {
    super(props);
  }

  render() {
    return (
      <DatePicker
        style={{ width: '100%' }}
        {...this.props}
      />
    )
  }
}
