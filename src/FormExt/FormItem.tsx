import React from 'react';
import { Col, Form } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import {
  FInputProps,
  FTextAreaProps,
  FSearchProps,
  FDatePickerProps,
  FRangePickerProps,
  FSelectProps,

  FItemInputProps,
  FItemTextAreaProps,
  FItemSearchProps,
  FItemSelectProps,
  FItemDatePickerProps,
  FItemRangePickerProps,
  FItemExtraProps,
} from "./types";

import FSelect from './FSelect';
import FInput from './FInput';
import FDatePicker from './FDatePicker';

const FormItem = Form.Item;

const defaultFormItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

function formItemSwitch(args:
  FInputProps | FSearchProps | FTextAreaProps |
  FDatePickerProps | FRangePickerProps |
  FSelectProps
) {
  switch (args.formItemType) {
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
  { formItem, component }:
    FItemInputProps | FItemSearchProps | FItemTextAreaProps |
    FItemDatePickerProps | FItemRangePickerProps |
    FItemSelectProps,
  form: WrappedFormUtils,
  formClassName: string
) {
  const {
    span = 8,
    noFormItemLayout,
    ...resetProps
  } = formItem;
  const { formItemKey, formItemType } = component;

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
  if (formItemType !== 'datePicker' && formItemType !== 'rangePicker') {
    // 如果没有placeholder 那么直接使用label
    component.placeholder = component.disabled ? '' : (component.placeholder || formItem.label);
  }

  return (
    <Col key={formItemKey} span={span}>
      <FormItem {...resetProps}>
        {
          formItemSwitch({
            formClassName,
            rcform: form,
            ...component,
          })
        }
      </FormItem>
    </Col>
  );
}

function renderExtraComp(
  { formItem, component }: FItemExtraProps,
  form: WrappedFormUtils,
  formClassName: string
) {
  const { span = 8, noFormItemLayout, ...resetProps } = formItem;
  const { formItemKey } = component;

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
    <Col key={formItemKey} span={span}>
      <FormItem {...resetProps}>
        {
          component.reactNode({ form, formItemKey, formClassName })
        }
      </FormItem>
    </Col>
  );
}

function createFormItem(
  { formItem, component }:
    FItemInputProps | FItemTextAreaProps | FItemSearchProps
    | FItemDatePickerProps | FItemRangePickerProps
    | FItemSelectProps
    | FItemExtraProps,
  form: WrappedFormUtils,
  formClassName: string
): React.ReactNode {
  if (component.formItemType === 'input') {
    return renderNormalComp({ formItem, component }, form, formClassName);
  }

  if (component.formItemType === 'search') {
    return renderNormalComp({ formItem, component }, form, formClassName);
  }

  if (component.formItemType === 'textarea') {
    return renderNormalComp({ formItem, component }, form, formClassName);
  }

  if (component.formItemType === 'select') {
    return renderNormalComp({ formItem, component }, form, formClassName);
  }
  
  if (component.formItemType === 'datePicker') {
    return renderNormalComp({ formItem, component }, form, formClassName);
  }

  if (component.formItemType === 'rangePicker') {
    return renderNormalComp({ formItem, component }, form, formClassName);
  }

  if (component.formItemType === 'extra') {
    return renderExtraComp({ formItem, component }, form, formClassName);
  }

  return () => null;
}

export { createFormItem };
