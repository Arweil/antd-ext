import React from 'react';
import { Form } from 'antd';
import { WrappedFormUtils, GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import {
  BaseFormItemProps, CompExtendsProps,
} from "./types";

import FSelect, { SelectExtendsProps, FSelectProps } from './FSelect';
import FInput, { InputExtendsProps, TextAreaExtendsProps, SearchExtendsProps, FInputProps, FSearchProps, FTextAreaProps } from './FInput';
import FDatePicker, { DatePickerExtendsProps, RangePickerExtendsProps, FDatePickerProps, FRangePickerProps } from './FDatePicker';

export interface ExtraExtendsProps extends CompExtendsProps {
  type: 'extra',
  compProps?: any,
  render: (params: { form: WrappedFormUtils; key: string; formClassName: string; decoratorOpt?: GetFieldDecoratorOptions; compProps?: any; }) => React.ReactNode;
};

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

// Extra component 自定义组件
export interface FItemExtraProps extends BaseFormItemProps {
  component: ExtraExtendsProps;
}

export type NormalCompsType =
  FInputProps
  | FSearchProps
  | FTextAreaProps
  | FDatePickerProps
  | FRangePickerProps
  | FSelectProps;

export type NormalFItemCompsType = 
  FItemInputProps | FItemSearchProps | FItemTextAreaProps |
  FItemDatePickerProps | FItemRangePickerProps |
  FItemSelectProps;

export type AllFItemCompsType = NormalFItemCompsType | FItemExtraProps;

const FormItem = Form.Item;

const defaultFormItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

function formItemSwitch(args: NormalCompsType) {
  switch (args.type) {
    case 'input':
    case 'search':
    case 'textarea':
      return FInput(args);
    case 'select':
      return FSelect(args);
    case 'datePicker':
    case 'rangePicker':
      return FDatePicker(args);
  }
}

function renderNormalComp(
  { formItem, component }: NormalFItemCompsType,
  form: WrappedFormUtils,
  formClassName: string
) {
  const {
    offset,
    span = 8,
    noFormItemLayout,
    ...resetProps
  } = formItem;
  const { type } = component;

  // FormItem 属性
  if (!noFormItemLayout) {
    resetProps.labelCol = resetProps.labelCol || defaultFormItemLayout.labelCol;
    resetProps.wrapperCol = resetProps.wrapperCol || defaultFormItemLayout.wrapperCol;
  } else {
    resetProps.className += ' antd-ext-form-item-flex';
    resetProps.labelCol = undefined;
    resetProps.wrapperCol = undefined;
  }

  // datePicker 和 rangePicker 的 placeholder特殊处理
  if (type !== 'datePicker' && type !== 'rangePicker') {
    // 如果没有placeholder 那么直接使用label
    component.placeholder = component.disabled ? '' : (component.placeholder || formItem.label);
  }

  return (
    <FormItem {...resetProps}>
      {
        formItemSwitch({
          formClassName,
          rcform: form,
          ...component,
        })
      }
    </FormItem>
  );
}

function renderExtraComp(
  { formItem, component }: FItemExtraProps,
  form: WrappedFormUtils,
  formClassName: string
) {
  const { offset, span = 8, noFormItemLayout, ...resetProps } = formItem;
  const { key, decoratorOpt, compProps } = component;

  // FormItem 属性
  if (!noFormItemLayout) {
    resetProps.labelCol = resetProps.labelCol || defaultFormItemLayout.labelCol;
    resetProps.wrapperCol = resetProps.wrapperCol || defaultFormItemLayout.wrapperCol;
  } else {
    resetProps.className += ' antd-ext-form-item-flex';
    resetProps.labelCol = undefined;
    resetProps.wrapperCol = undefined;
  }

  return (
    <FormItem {...resetProps}>
      {
        component.render({ form, key, formClassName, decoratorOpt, compProps })
      }
    </FormItem>
  );
}

function createFormItem(
  { formItem, component }: AllFItemCompsType,
  form: WrappedFormUtils,
  formClassName: string,
): React.ReactNode {
  if (component.type === 'input') {
    return renderNormalComp({ formItem, component }, form, formClassName);
  }

  if (component.type === 'search') {
    return renderNormalComp({ formItem, component }, form, formClassName);
  }

  if (component.type === 'textarea') {
    return renderNormalComp({ formItem, component }, form, formClassName);
  }

  if (component.type === 'select') {
    return renderNormalComp({ formItem, component }, form, formClassName);
  }
  
  if (component.type === 'datePicker') {
    return renderNormalComp({ formItem, component }, form, formClassName);
  }

  if (component.type === 'rangePicker') {
    return renderNormalComp({ formItem, component }, form, formClassName);
  }

  if (component.type === 'extra') {
    return renderExtraComp({ formItem, component }, form, formClassName);
  }

  return () => null;
}

export { createFormItem };
