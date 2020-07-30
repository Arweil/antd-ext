import React, { PureComponent } from 'react';
import { DatePicker } from 'antd';
import { DatePickerProps } from 'antd/lib/date-picker/interface';
import { Moment } from 'moment';

interface DatePickerDatePickerProps {
  value?: [Moment | undefined, Moment | undefined];
  onChange?: (params: [Moment | undefined, Moment | undefined]) => void;
  datePickerProps?: DatePickerProps;
}

interface DatePickerDatePickerState {
  startValue?: Moment;
  endValue?: Moment;
}

export default class DatePickerDatePicker extends PureComponent<DatePickerDatePickerProps, DatePickerDatePickerState> {
  constructor(props: Readonly<DatePickerDatePickerProps>) {
    super(props);

    this.state = {
      startValue: undefined,
      endValue: undefined,
    };

    this.onStartChange = this.onStartChange.bind(this);
    this.onEndChange = this.onEndChange.bind(this);
    this.disabledStartDate = this.disabledStartDate.bind(this);
    this.disabledEndDate = this.disabledEndDate.bind(this);
  }

  static getDerivedStateFromProps(nextProps: Readonly<DatePickerDatePickerProps>): DatePickerDatePickerState | null {
    if ('value' in nextProps) {
      if (nextProps.value && nextProps.value.length > 0) {
        return {
          startValue: nextProps.value[0],
          endValue: nextProps.value[1],
        };
      } else {
        return {
          startValue: undefined,
          endValue: undefined,
        };
      }
    }

    return null;
  }

  onStartChange(date: Moment): void {
    if (!('value' in this.props)) {
      this.setState({ startValue: date }, () => {
        const { endValue } = this.state;
        this.onChange([date, endValue]);
      });
    } else {
      const { endValue } = this.state;
      this.onChange([date, endValue]);
    }
  }

  onEndChange(date: Moment): void {
    if (!('value' in this.props)) {
      this.setState({ endValue: date }, () => {
        const { startValue } = this.state;
        this.onChange([startValue, date]);
      });
    } else {
      const { startValue } = this.state;
      this.onChange([startValue, date]);
    }
  }

  onChange(params: [Moment | undefined, Moment | undefined]): void {
    const { onChange } = this.props;
    onChange && onChange(params);
  }

  disabledStartDate(startValue?: Moment): boolean {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  disabledEndDate(endValue?: Moment): boolean {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  render(): JSX.Element {
    const { datePickerProps } = this.props;
    const { startValue, endValue } = this.state;

    return (
      <div className="flex-cnt">
        <DatePicker
          {...datePickerProps}
          disabledDate={this.disabledStartDate}
          value={startValue}
          placeholder="开始时间"
          onChange={this.onStartChange}
        />
        <span className="ant-calendar-range-picker-separator"> ~ </span>
        <DatePicker
          {...datePickerProps}
          disabledDate={this.disabledEndDate}
          value={endValue}
          placeholder="结束时间"
          onChange={this.onEndChange}
        />
      </div>
    );
  }
}
