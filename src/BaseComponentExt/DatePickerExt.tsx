import React from 'react'
import { DatePicker } from 'antd';
import { DatePickerProps } from 'antd/lib/date-picker/interface';

export default function DatePickerExt(props: DatePickerProps) {
  return (
    <DatePicker
      style={{ width: '100%' }}
      {...props}
    />
  )
}
