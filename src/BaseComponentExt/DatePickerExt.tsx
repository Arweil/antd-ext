import React, { PureComponent } from 'react';
import { DatePicker } from 'antd';
import { DatePickerProps } from 'antd/lib/date-picker/interface';

export default class DatePickerExt extends PureComponent<DatePickerProps, {}> {
  render(): JSX.Element {
    return (
      <DatePicker
        style={{ width: '100%' }}
        {...this.props}
      />
    );
  }
}
