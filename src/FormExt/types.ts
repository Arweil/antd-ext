import { WrappedFormUtils, GetFieldDecoratorOptions, FormProps, FormComponentProps } from 'antd/lib/form/Form';
import { FormItemProps as AntdFormItemProps } from 'antd/lib/form/FormItem';
import { ColProps } from 'antd/lib/col';
import { InputProps, TextAreaProps, SearchProps } from 'antd/lib/input';
import { DatePicker } from 'antd';
import { RangePickerProps, DatePickerProps } from 'antd/lib/date-picker/interface';
import { RangePickerExtProps } from '@/BaseComponentExt/RangePickerExt';
import { SelectProps } from 'antd/lib/select';
import { RadioGroupExtProps } from '@/BaseComponentExt/RadioGroupExt';
import { CheckboxGroupExtProps } from '@/BaseComponentExt/CheckboxGroupExt';

export interface FItemInputProps extends BaseFormItemProps {
  component: InputExtendsProps;
}

export interface FItemTextAreaProps extends BaseFormItemProps {
  component: TextAreaExtendsProps;
}

export interface FItemSearchProps extends BaseFormItemProps {
  component: SearchExtendsProps;
}

export interface FItemDatePickerProps extends BaseFormItemProps {
  component: DatePickerExtendsProps;
}

export interface FItemRangePickerProps extends BaseFormItemProps {
  component: RangePickerExtendsProps;
}

export interface FItemSelectProps extends BaseFormItemProps {
  component: SelectExtendsProps;
}

export interface FItemRadioGroupProps extends BaseFormItemProps {
  component: RadioGroupExtendsProps;
}

export interface FItemCheckboxGroupProps extends BaseFormItemProps {
  component: CheckboxGroupExtendsProps;
}

// Extra component 自定义组件
export interface FItemExtraProps extends BaseFormItemProps {
  component: ExtraExtendsProps;
}

// Input
export interface InputExtendsProps extends CompExtendsProps, InputProps {
  type: 'input';
}

export interface FInputProps extends InputExtendsProps, CompDecoratorExtendsProps {
}

// TextArea
export interface TextAreaExtendsProps extends CompExtendsProps, TextAreaProps {
  type: 'textarea';
}

export interface FTextAreaProps extends TextAreaExtendsProps, CompDecoratorExtendsProps {
}

// Search
export interface SearchExtendsProps extends CompExtendsProps, SearchProps {
  type: 'search';
}

export interface FSearchProps extends SearchExtendsProps, CompDecoratorExtendsProps {
}

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
export interface RangePickerExtendsProps extends CompExtendsProps, RangePickerExtProps {
  type: 'rangePicker';
}

export interface FRangePickerProps extends RangePickerExtendsProps, CompDecoratorExtendsProps {
}

// Select
export interface FSelectPropsExt {
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

export interface SelectExtendsProps extends CompExtendsProps, FSelectPropsExt, SelectProps {
  type: 'select';
}

export interface FSelectProps extends SelectExtendsProps, CompDecoratorExtendsProps {
}

export interface RadioGroupExtendsProps extends CompExtendsProps, RadioGroupExtProps {
  type: 'radioGroup';
}

export interface FRadioGroupProps extends RadioGroupExtendsProps, CompDecoratorExtendsProps {
}

export interface CheckboxGroupExtendsProps extends CompExtendsProps, CheckboxGroupExtProps {
  type: 'checkboxGroup';
}

export interface FCheckboxGroupProps extends CheckboxGroupExtendsProps, CompDecoratorExtendsProps {
}

export interface ExtraExtendsProps extends CompExtendsProps {
  type: 'extra';
  compProps?: any;
  render: (
    params: {
      form: WrappedFormUtils;
      key: string;
      formId: string;
      decoratorOpt?: GetFieldDecoratorOptions;
      compProps?: any;
    }) => React.ReactNode;
}

export interface FormScopeState {
  btnSearchLoading: boolean;
  btnResetLoading: boolean;
}

export interface FormValues {
  [field: string]: any;
}

export type FItemCompsType =
  FItemInputProps
  | FItemTextAreaProps
  | FItemSearchProps
  | FItemSelectProps
  | FItemDatePickerProps
  | FItemRangePickerProps
  | FItemExtraProps
  | FItemRadioGroupProps
  | FItemCheckboxGroupProps;

// FormExt props
export interface FormScopeProps<T = FormValues> extends FormProps, FormComponentProps {
  gutter?: number | object;
  formItemList: Array<FItemCompsType>;
  className?: string;
  needBtnGroup?: boolean;
  btnSpan?: number;
  form: WrappedFormUtils;
  autoGetContainer?: boolean;
  onSearch?: (values: T) => void;
  onReset?: () => void;
  onFieldsChange?: (props: FormScopeProps<FormValues>, changedFields: any) => void;
  onValuesChange?: (props: FormScopeProps<FormValues>, changedValues: any, allValues: any) => void;
}

// 表单项类型
interface FormItemProps extends AntdFormItemProps, ColProps {
  noFormItemLayout?: boolean;
  hidden?: boolean;
  visible?: boolean;
}

export interface CompExtendsProps {
  type: string;
  key: string;
  decoratorOpt?: GetFieldDecoratorOptions;
}

// 使用装饰器包裹的组件拓展属性
export interface CompDecoratorExtendsProps {
  rcform: WrappedFormUtils;
  formId: string;
  autoGetContainer: boolean;
}

export interface BaseFormItemProps {
  formItem: FormItemProps;
}
