import React from 'react';
import { Form } from 'antd';
import _ from 'lodash';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { FormItemProps } from 'antd/lib/form';
import {
  FItemInputProps, FItemSearchProps, FItemTextAreaProps, FItemDatePickerProps, FItemRangePickerProps,
  FItemSelectProps, FItemRadioGroupProps, FItemCheckboxGroupProps, FItemExtraProps, FInputProps, FSearchProps,
  FTextAreaProps, FDatePickerProps, FRangePickerProps, FSelectProps, FRadioGroupProps, FCheckboxGroupProps,
} from './types';
import FSelect from './FSelect';
import FInput from './FInput';
import FDatePicker from './FDatePicker';
import FRadioGroup from './FRadioGroup';
import FCheckboxGroup from './FCheckboxGroup';

type typeLayout = 'inline' | 'horizontal' | 'vertical';

export type NormalCompsType =
  FInputProps
  | FSearchProps
  | FTextAreaProps
  | FDatePickerProps
  | FRangePickerProps
  | FSelectProps
  | FRadioGroupProps
  | FCheckboxGroupProps;

export type NormalFItemCompsType =
  FItemInputProps | FItemSearchProps | FItemTextAreaProps |
  FItemDatePickerProps | FItemRangePickerProps |
  FItemSelectProps | FItemRadioGroupProps | FItemCheckboxGroupProps;

export type AllFItemCompsType = NormalFItemCompsType | FItemExtraProps;

const FormItem = Form.Item;

const defaultFormItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

function formItemSwitch(args: NormalCompsType): React.ReactNode {
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
    case 'radioGroup':
      return FRadioGroup(args);
    case 'checkboxGroup':
      return FCheckboxGroup(args);
    default: return null;
  }
}

// 渲染label
function renderLabel(label: React.ReactNode): React.ReactNode {
  let $label: React.ReactNode = label;
  // 如果label是数组
  if (_.isArray(label)) {
    $label = (
      <div style={{ display: 'inline-block', lineHeight: 'initial' }}>
        {
          label.map((item, index) => {
            if (index === label.length - 1) {
              return item;
            } else {
              return (
                <>
                  {item}
                  <br />
                </>
              );
            }
          })
        }
      </div>
    );
  }

  return $label;
}

function initColSpan(params: {
  noFormItemLayout?: boolean;
  resetProps: FormItemProps;
  layout?: typeLayout;
}): void {
  const { noFormItemLayout, layout, resetProps } = params;
  // FormItem 属性
  if (!noFormItemLayout) {
    if (layout !== 'inline' && layout !== 'vertical') {
      resetProps.labelCol = resetProps.labelCol || defaultFormItemLayout.labelCol;
      resetProps.wrapperCol = resetProps.wrapperCol || defaultFormItemLayout.wrapperCol;
    }
  } else {
    resetProps.className += ' antd-ext-form-item-flex';
    resetProps.labelCol = undefined;
    resetProps.wrapperCol = undefined;
  }
}

function renderNormalComp(
  { formItem, component }: NormalFItemCompsType,
  form: WrappedFormUtils,
  formId: string,
  autoGetContainer: boolean,
  layout?: typeLayout,
): JSX.Element {
  const {
    offset,
    span = 8,
    noFormItemLayout,
    label,
    ...resetProps
  } = formItem;
  const { type } = component;

  initColSpan({
    noFormItemLayout,
    resetProps,
    layout,
  });

  // datePicker 和 rangePicker 的 placeholder特殊处理
  // radioGroup、checkboxGroup 不存在 placeholder
  if (type !== 'datePicker'
    && type !== 'rangePicker'
    && component.type !== 'radioGroup'
    && component.type !== 'checkboxGroup') {
    // 如果没有placeholder 那么直接使用label
    component.placeholder = component.disabled ? '' : (component.placeholder || formItem.label);
  }

  const $label = renderLabel(label);

  // help 优先级
  // 1. 错误提示
  // 2. formItem.help
  const errors = form.getFieldError(component.key);
  resetProps.help = errors ? (
    <React.Fragment>
      {errors.join(',')}
      {resetProps.help ? `，${resetProps.help}` : null}
    </React.Fragment>
  ) : resetProps.help;
  resetProps.validateStatus = errors ? 'error' : resetProps.validateStatus;

  return (
    <FormItem label={$label} {...resetProps}>
      {
        formItemSwitch({
          formId,
          autoGetContainer,
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
  formId: string,
  layout?: typeLayout,
): JSX.Element {
  const { offset, span = 8, noFormItemLayout, label, ...resetProps } = formItem;
  const { key, decoratorOpt, compProps } = component;

  // FormItem 属性
  initColSpan({
    noFormItemLayout,
    resetProps,
    layout,
  });

  const $label = renderLabel(label);

  return (
    <FormItem label={$label} {...resetProps}>
      {
        component.render({ form, key, formId, decoratorOpt, compProps })
      }
    </FormItem>
  );
}

function createFormItem(
  { formItem, component }: AllFItemCompsType,
  form: WrappedFormUtils,
  formId: string,
  autoGetContainer: boolean,
  layout?: typeLayout,
): React.ReactNode {
  switch (component.type) {
    case 'input':
    case 'search':
    case 'textarea':
    case 'select':
    case 'datePicker':
    case 'rangePicker':
    case 'radioGroup':
    case 'checkboxGroup':
      // @ts-ignore TODO: fix component type
      return renderNormalComp({ formItem, component }, form, formId, autoGetContainer, layout);
    case 'extra':
      return renderExtraComp({ formItem, component }, form, formId, layout);
    default:
      return (): null => null;
  }
}

export { createFormItem };
