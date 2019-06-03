import React from 'react';
import { CompExtendsProps, CompDecoratorExtendsProps } from './types';
import { getLayoutElement } from './utils';
import DatePickerExt from '../BaseComponentExt/DatePickerExt';
import RangePickerExt from '../BaseComponentExt/RangePickerExt';
import { DatePicker } from 'antd';
import { RangePickerProps, DatePickerProps } from 'antd/lib/date-picker/interface';

// FDatePicker map component
export interface FDatePickerMapComponent {
  datePicker: typeof DatePicker;
  rangePicker: React.ClassicComponentClass<RangePickerProps>;
}

// DatePicker
export interface DatePickerExtendsProps extends CompExtendsProps, DatePickerProps {
  type: 'datePicker';
}

export interface FDatePickerProps extends DatePickerExtendsProps, CompDecoratorExtendsProps {
}

// RangePicker
export interface RangePickerExtendsProps extends CompExtendsProps, RangePickerProps {
  type: 'rangePicker';
}

export interface FRangePickerProps extends RangePickerExtendsProps, CompDecoratorExtendsProps {
}

function renderDatePicker(props: FDatePickerProps) {
  const { decoratorOpt, rcform, key, formClassName, type, ...restProps } = props;

  return rcform.getFieldDecorator(key, decoratorOpt)(
    <DatePickerExt
      getCalendarContainer={() => getLayoutElement(formClassName)}
      {...restProps}
    />
  );
}

function renderRangePicker(props: FRangePickerProps) {
  const { decoratorOpt, rcform, key, formClassName, type, ...restProps } = props;

  return rcform.getFieldDecorator(key, decoratorOpt)(
    <RangePickerExt
      getCalendarContainer={() => getLayoutElement(formClassName)}
      {...restProps}
    />
  );
}

export default function FDatePicker(props: FDatePickerProps | FRangePickerProps): React.ReactNode {
  // 运行前
  if (props.type === 'datePicker') {
    return renderDatePicker(props);
  }

  if (props.type === 'rangePicker') {
    return renderRangePicker(props);
  }

  return () => null;
};
