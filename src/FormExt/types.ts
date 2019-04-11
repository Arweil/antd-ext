import Input, { InputProps, TextAreaProps, SearchProps } from 'antd/lib/input';
import { SelectProps } from 'antd/lib/select';
import { DatePickerProps, RangePickerProps, PickerProps } from 'antd/lib/date-picker/interface';
import { FormComponentProps, WrappedFormUtils, GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import Search from 'antd/lib/input/Search';
import TextArea from 'antd/lib/input/TextArea';
import { DatePicker } from 'antd';
import React from 'react';

export interface FormScopeState {
  btnSearchLoading: boolean;
  btnResetLoading: boolean;
}

interface FormValues {
  [field: string]: any;
}

// FormExt props
export interface FormScopeProps extends FormComponentProps {
  gutter?: number | object;
  formItemList: Array<FItemInputProps | FItemTextAreaProps | FItemSearchProps | FItemSelectProps | FItemDatePickerProps | FItemRangePickerProps>;
  formItemLayout?: { labelCol: number, wrapperCol: number };
  formClassName?: string;
  needBtnGroup?: boolean;
  btnSpan?: number;
  onSearch?: (values: FormValues) => void;
  onReset?: () => void;
}

// 基础的类型
export interface BaseCompType {
  decoratorOpt?: GetFieldDecoratorOptions;
  rcform: WrappedFormUtils;
  formItemType: string;
  formItemKey: string;
  formClassName: string;
}

// 表单项类型
interface FormItemProps {
  label: string;
  span?: number;
  noFormItemLayout?: boolean;
  rcform?: WrappedFormUtils;
  formItemType: string;
  formItemKey: string;
  decoratorOpt?: GetFieldDecoratorOptions;
}

// FInput map component
export interface FInputMapComponent {
  search: typeof Search;
  textarea: typeof TextArea;
  input: typeof Input;
  [key: string]: React.ComponentClass | React.SFC;
}

// Input
export interface FInputProps extends BaseCompType, InputProps {}

export interface FItemInputProps extends FormItemProps, InputProps {
  formItemType: 'input';
}

// TextArea
export interface FTextAreaProps extends BaseCompType, TextAreaProps {}

export interface FItemTextAreaProps extends FormItemProps, TextAreaProps {
  formItemType: 'textarea'
}

// Search
export interface FSearchProps extends BaseCompType, SearchProps {}

export interface FItemSearchProps extends FormItemProps, SearchProps {
  formItemType: 'search';
}

// Select
interface FSelectPropsExt {
  dataMap?: {
    [key: string]: string;
    [key: number]: string;
  };
  optionAll?: boolean;
}

export interface FSelectProps extends BaseCompType, FSelectPropsExt, SelectProps {}

export interface FItemSelectProps extends FormItemProps, FSelectPropsExt, SelectProps {
  formItemType: 'select';
}

// FDatePicker map component
export interface FDatePickerMapComponent {
  datePicker: typeof DatePicker;
  rangePicker: React.ClassicComponentClass<RangePickerProps>;
  [key: string]: React.ComponentClass<PickerProps> | React.SFC<PickerProps>;
}

// DatePicker
export interface FDatePickerProps extends BaseCompType, DatePickerProps {}

export interface FItemDatePickerProps extends FormItemProps, DatePickerProps {
  formItemType: 'datePicker';
}

// RangePicker
export interface FRangePickerProps extends BaseCompType, RangePickerProps {}

export interface FItemRangePickerProps extends FormItemProps, RangePickerProps {
  formItemType: 'rangePicker';
}

export interface FormMapComponent {
  [key: string]: React.ReactNode;
}
