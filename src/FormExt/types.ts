import { InputProps, TextAreaProps, SearchProps } from 'antd/lib/input';
import { SelectProps } from 'antd/lib/select';
import { DatePickerProps, RangePickerProps } from 'antd/lib/date-picker/interface';
import { WrappedFormUtils, GetFieldDecoratorOptions, FormProps } from 'antd/lib/form/Form';
import { FormItemProps as AntdFormItemProps } from 'antd/lib/form/FormItem';
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
export interface FormScopeProps extends FormProps {
  gutter?: number | object;
  formItemList: Array<FItemInputProps | FItemTextAreaProps | FItemSearchProps | FItemSelectProps | FItemDatePickerProps | FItemRangePickerProps | FItemExtraProps>;
  className?: string;
  needBtnGroup?: boolean;
  btnSpan?: number;
  form: WrappedFormUtils,
  onSearch?: (values: FormValues) => void;
  onReset?: () => void;
}

// 表单项类型
interface FormItemProps extends AntdFormItemProps {
  span?: number;
  noFormItemLayout?: boolean;
}

interface CompExtendsProps {
  formItemType: string;
  formItemKey: string;
  decoratorOpt?: GetFieldDecoratorOptions;
}

// 使用装饰器包裹的组件拓展属性
interface CompDecoratorExtendsProps {
  rcform: WrappedFormUtils;
  formClassName: string;
}

interface BaseFormItemProps {
  formItem: FormItemProps;
}

// Input
interface InputExtendsProps extends CompExtendsProps, InputProps {
  formItemType: 'input';
}

export interface FInputProps extends InputExtendsProps, CompDecoratorExtendsProps {
}

export interface FItemInputProps extends BaseFormItemProps {
  component: InputExtendsProps;
}

// TextArea
interface TextAreaExtendsProps extends CompExtendsProps, TextAreaProps {
  formItemType: 'textarea'
}

export interface FTextAreaProps extends TextAreaExtendsProps, CompDecoratorExtendsProps {
}

export interface FItemTextAreaProps extends BaseFormItemProps {
  component: TextAreaExtendsProps;
}

// Search
interface SearchExtendsProps extends CompExtendsProps, SearchProps {
  formItemType: 'search'
}

export interface FSearchProps extends SearchExtendsProps, CompDecoratorExtendsProps {
}

export interface FItemSearchProps extends BaseFormItemProps {
  component: SearchExtendsProps;
}

// Select
interface FSelectPropsExt {
  dataMap?: {
    [key: string]: string;
    [key: number]: string;
  };
  dataList?: {
    code: string | number;
    name: string;
    disabled?: boolean;
    title?: string;
    className?: string;
  }[];
  optionAll?: boolean;
}

interface SelectExtendsProps extends CompExtendsProps, FSelectPropsExt, SelectProps {
  formItemType: 'select';
}

export interface FSelectProps extends SelectExtendsProps, CompDecoratorExtendsProps {
}

export interface FItemSelectProps extends BaseFormItemProps {
  component: SelectExtendsProps;
}

// FDatePicker map component
export interface FDatePickerMapComponent {
  datePicker: typeof DatePicker;
  rangePicker: React.ClassicComponentClass<RangePickerProps>;
}

// DatePicker
interface DatePickerExtendsProps extends CompExtendsProps, DatePickerProps {
  formItemType: 'datePicker';
}

export interface FDatePickerProps extends DatePickerExtendsProps, CompDecoratorExtendsProps {
}

export interface FItemDatePickerProps extends BaseFormItemProps {
  component: DatePickerExtendsProps;
}

// RangePicker
interface RangePickerExtendsProps extends CompExtendsProps, RangePickerProps {
  formItemType: 'rangePicker';
}

export interface FRangePickerProps extends RangePickerExtendsProps, CompDecoratorExtendsProps {
}

export interface FItemRangePickerProps extends BaseFormItemProps {
  component: RangePickerExtendsProps;
}

export interface ExtraExtendsProps {
  formItemType: 'extra',
  formItemKey: string,
  reactNode: ({ form, formItemKey, formClassName }: { form: WrappedFormUtils, formItemKey: string, formClassName: string }) => React.ReactNode;
};

// Extra component 自定义组件
export interface FItemExtraProps extends BaseFormItemProps {
  component: ExtraExtendsProps;
}
