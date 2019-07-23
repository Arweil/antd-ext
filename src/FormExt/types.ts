import { WrappedFormUtils, GetFieldDecoratorOptions, FormProps, FormComponentProps } from 'antd/lib/form/Form';
import { FormItemProps as AntdFormItemProps } from 'antd/lib/form/FormItem';
import { ColProps } from 'antd/lib/col';
import { FItemInputProps, FItemTextAreaProps, FItemSearchProps, FItemSelectProps, FItemDatePickerProps, FItemRangePickerProps, FItemExtraProps } from './FormItem';

export interface FormScopeState {
  btnSearchLoading: boolean;
  btnResetLoading: boolean;
}

interface FormValues {
  [field: string]: any;
}

export type FItemCompsType = 
  FItemInputProps
  | FItemTextAreaProps
  | FItemSearchProps
  | FItemSelectProps
  | FItemDatePickerProps
  | FItemRangePickerProps
  | FItemExtraProps;

// FormExt props
export interface FormScopeProps extends FormProps, FormComponentProps {
  gutter?: number | object;
  formItemList: Array<FItemCompsType>;
  className?: string;
  needBtnGroup?: boolean;
  btnSpan?: number;
  form: WrappedFormUtils;
  onSearch?: (values: FormValues) => void;
  onReset?: () => void;
}

// 表单项类型
interface FormItemProps extends AntdFormItemProps, ColProps {
  noFormItemLayout?: boolean;
  hidden?: boolean;
}

export interface CompExtendsProps {
  type: string;
  key: string;
  decoratorOpt?: GetFieldDecoratorOptions;
}

// 使用装饰器包裹的组件拓展属性
export interface CompDecoratorExtendsProps {
  rcform: WrappedFormUtils;
  formClassName: string;
}

export interface BaseFormItemProps {
  formItem: FormItemProps;
}
