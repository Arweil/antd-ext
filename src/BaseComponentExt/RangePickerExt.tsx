import React from 'react';
import { DatePicker } from 'antd';
import { RangePickerProps } from 'antd/lib/date-picker/interface';

const { RangePicker } = DatePicker;

export default function RangePickerExt(props: RangePickerProps) {
  return (
    <RangePicker
      style={{ width: '100%' }}
      {...props}
    />
  )
}
