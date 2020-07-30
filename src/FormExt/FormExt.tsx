import React, { PureComponent, FormEvent } from 'react';
import { Form, Row, Col, Button } from 'antd';
import { getRandomId } from '@/utils/utils';

import {
  FormScopeState,
  FormScopeProps,
} from './types';

import { createFormItem } from './FormItem';

class FormScope extends PureComponent<FormScopeProps, FormScopeState> {
  private formId = '';

  constructor(props: Readonly<FormScopeProps>) {
    super(props);

    this.state = {
      btnSearchLoading: false,
      btnResetLoading: false,
    };

    this.formId = `antd-ext-form-${getRandomId()}`;

    this.onSearch = this.onSearch.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  onReset(): void {
    this.setState(
      {
        btnResetLoading: true,
      },
      async () => {
        const { form, onReset = (): undefined => undefined } = this.props;
        form.resetFields();
        await onReset();
        this.setState({ btnResetLoading: false });
      }
    );
  }

  onSearch(e: FormEvent<HTMLElement>): void {
    e.preventDefault();
    this.setState(
      {
        btnSearchLoading: true,
      },
      async () => {
        const { form, onSearch = (): undefined => undefined } = this.props;
        const values = form.getFieldsValue();
        await onSearch(values);
        this.setState({ btnSearchLoading: false });
      }
    );
  }

  render(): JSX.Element {
    const {
      gutter = 10,
      formItemList = [],
      needBtnGroup = true,
      btnSpan = 8,
      form,
      autoGetContainer = true,
      onSearch,
      onReset,
      onSubmit = this.onSearch,
      className = '',
      ...resetProps
    } = this.props;

    const { btnSearchLoading, btnResetLoading } = this.state;

    const $className = `${className} antd-ext-form`;

    return (
      <Form id={this.formId} className={$className} onSubmit={onSubmit} {...resetProps}>
        <Row gutter={gutter}>
          {formItemList.map((formItemProps) => {
            const { formItem, component } = formItemProps;
            const { offset, span = 8, hidden = false, visible = true } = formItem;
            const { key } = component;

            // 如果设置hidden 那么不渲染此项
            if (hidden) return null;

            return (
              <Col key={key} span={span} offset={offset} style={visible ? {} : { display: 'none' }}>
                {createFormItem(formItemProps, form, this.formId, autoGetContainer, resetProps.layout)}
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

const FormScopeWrapper = Form.create<FormScopeProps>({
  onFieldsChange: (props, changedFields) => props.onFieldsChange && props.onFieldsChange(props, changedFields),
  onValuesChange: (props, changedValues, allValues) => props.onValuesChange && props.onValuesChange(props, changedValues, allValues),
})(FormScope);

export default FormScopeWrapper;
