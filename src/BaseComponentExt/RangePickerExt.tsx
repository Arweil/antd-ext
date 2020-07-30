import React, { PureComponent } from 'react';
import { DatePicker } from 'antd';
import { RangePickerProps, RangePickerValue } from 'antd/lib/date-picker/interface';

const { RangePicker } = DatePicker;

export interface RangePickerExtProps extends RangePickerProps {
  needExt?: boolean;
}

export default class RangePickerExt extends PureComponent<RangePickerExtProps> {
  constructor(props: Readonly<RangePickerExtProps>) {
    super(props);

    this.onCalendarChange = this.onCalendarChange.bind(this);
  }

  // 选择日期触发
  onCalendarChange(dates: RangePickerValue, dateStrings: [string, string]): void {
    const { onCalendarChange, onChange } = this.props;
    onCalendarChange && onCalendarChange(dates, dateStrings);
    onChange && onChange(dates, dateStrings);
  }

  render(): JSX.Element {
    const { needExt, ...resetProps } = this.props;

    if (needExt) {
      resetProps.onCalendarChange = this.onCalendarChange;
    }

    return (
      <RangePicker
        style={{ width: '100%' }}
        {...resetProps}
      />
    );
  }
}
