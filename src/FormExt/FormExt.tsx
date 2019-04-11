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
} from './types';
import FSelect from './FSelect';
import FInput from './FInput';
import FDatePicker from './FDatePicker';
import { FormMapComponent, BaseCompType } from './types';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

function formItemSwitch(args: BaseCompType) {
  const mapComponent: FormMapComponent = {
    input: () => FInput<FInputProps>(args),
    search: () => FInput<FSearchProps>(args),
    textarea: () => FInput<FTextAreaProps>(args),
    select: () => FSelect(args),
    datePicker: () => FDatePicker<FDatePickerProps>(args),
    rangePicker: () => FDatePicker<FRangePickerProps>(args),
  };

  // formItemType在枚举中
  if (Object.keys(mapComponent).indexOf(args.formItemType) > -1) {
    // @ts-ignore
    return mapComponent[args.formItemType]();
  }
  
  return null;
}

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
      formClassName = 'antd-ext-form',
      needBtnGroup = true,
      btnSpan = 8,
      form,
    } = this.props;

    const { btnSearchLoading, btnResetLoading } = this.state;

    return (
      <Form className={formClassName} onSubmit={this.onSearch}>
        <Row gutter={gutter}>
          {formItemList.map((formItem) => {
            const { label, span = 8, noFormItemLayout, formItemKey, ...restProps } = formItem;

            // 如果没有placeholder 那么直接使用label
            restProps.placeholder = restProps.disabled ? '' : (restProps.placeholder || label);
            // 初始化表单项规则
            restProps.decoratorOpt = restProps.decoratorOpt || {};

            // FormItem 属性
            const args = {
              label,
            };
            if (!noFormItemLayout) {
              Object.assign(args, formItemLayout);
            } else {
              Object.assign(args, {
                className: 'antd-ext-form-item-flex',
              });
            }

            return (
              <Col key={formItemKey} span={span}>
                <FormItem {...args}>
                  {
                    formItemSwitch({
                      formItemKey,
                      formClassName,
                      rcform: form,
                      ...restProps,
                    })
                  }
                </FormItem>
              </Col>
            );
          })}
          {
            needBtnGroup ? (
              <Col span={btnSpan} className="antd-ext-form-btn-group-right antd-ext-form-flex-cnt-right">
                <Button loading={btnResetLoading} onClick={this.onReset}>
                  重置
                </Button>
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
