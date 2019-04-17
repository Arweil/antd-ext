import React, { PureComponent, FormEvent } from 'react';
import { Form, Row, Col, Button } from 'antd';

import {
  FormScopeState,
  FormScopeProps,
  FInputProps,
  FTextAreaProps,
  FSearchProps,
  FDatePickerProps,
  FRangePickerProps,
  FSelectProps,
} from './types';
import FSelect from './FSelect';
import FInput from './FInput';
import FDatePicker from './FDatePicker';

const FormItem = Form.Item;

const defaultFormItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

function formItemSwitch(args: FInputProps | FSearchProps | FTextAreaProps | FSelectProps | FDatePickerProps | FRangePickerProps) {
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

// function isExtra(component: InputExtensProps | TextAreaExtendsProps | SearchExtendsProps | SelectExtendsProps | DatePickerExtendsProps | RangePickerExtendsProps | ExtraExtendsProps): component is ExtraExtendsProps {
//   return component.formItemType === 'extra';
// }

class FormScope extends PureComponent<FormScopeProps, FormScopeState> {
  constructor(props: Readonly<FormScopeProps>) {
    super(props);

    this.state = {
      btnSearchLoading: false,
      btnResetLoading: false,
    };

    this.onSearch = this.onSearch.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  onReset() {
    this.setState(
      {
        btnResetLoading: true,
      },
      async () => {
        const { form, onReset = () => { } } = this.props;
        form.resetFields();
        await onReset();
        this.setState({ btnResetLoading: false });
      }
    );
  }

  onSearch(e: FormEvent<Button>) {
    e.preventDefault();
    this.setState(
      {
        btnSearchLoading: true,
      },
      async () => {
        const { form, onSearch = () => { } } = this.props;
        const values = form.getFieldsValue();
        await onSearch(values);
        this.setState({ btnSearchLoading: false });
      }
    );
  }

  render() {
    const {
      gutter = 10,
      formItemList = [],
      needBtnGroup = true,
      btnSpan = 8,
      form,
    } = this.props;

    let {
      formClassName = '',
    } = this.props;

    const { btnSearchLoading, btnResetLoading } = this.state;

    formClassName += 'antd-ext-form';

    return (
      <Form className={formClassName} onSubmit={this.onSearch}>
        <Row gutter={gutter}>
          {formItemList.map(({ formItem, component }) => {
            const { span = 8, noFormItemLayout, ...resetProps } = formItem;
            const { formItemKey, formItemType } = component;

            // FormItem 属性
            if (!noFormItemLayout) {
              resetProps.labelCol = resetProps.labelCol || defaultFormItemLayout.labelCol;
              resetProps.wrapperCol = resetProps.wrapperCol || defaultFormItemLayout.wrapperCol;
            } else {
              resetProps.className += ' antd-ext-form-item-flex';
            }

            // if (isExtra(component)) {
            //   return (
            //     <Col key={formItemKey} span={span}>
            //       <FormItem {...resetProps}>
            //         {component.reactNode({ form, formClassName })}
            //       </FormItem>
            //     </Col>
            //   )
            // }

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
          })}
          {
            needBtnGroup ? (
              <Col span={btnSpan} className="antd-ext-form-btn-group-right antd-ext-form-flex-cnt-right">
                {/*
                  // @ts-ignore  */}
                <Button loading={btnResetLoading} onClick={this.onReset}>
                  重置
                </Button>
                {/*
                  // @ts-ignore  */}
                <Button type="primary" loading={btnSearchLoading} htmlType="submit">
                  查询
                </Button>
              </Col>
            ) : null
          }
        </Row>
      </Form>
    );
  }
}

export { FormScope };

const FormScopeWrapper = Form.create()(FormScope);

export default FormScopeWrapper;
