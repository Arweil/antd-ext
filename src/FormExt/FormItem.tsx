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
  const { key, type } = component;

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
    <Col key={key} span={span}>
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
  const { key } = component;

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
    <Col key={key} span={span}>
      <FormItem {...resetProps}>
        {
          component.render({ form, key, formClassName })
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
