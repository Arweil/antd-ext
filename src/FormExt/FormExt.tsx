import React, { PureComponent, FormEvent } from 'react';
import { Form, Row, Col, Button } from 'antd';

import {
  FormScopeState,
  FormScopeProps,
} from './types';

import { createFormItem } from './FormItem';

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

  onSearch(e: FormEvent<HTMLElement>) {
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
    let {
      gutter = 10,
      formItemList = [],
      needBtnGroup = true,
      btnSpan = 8,
      form,
      onSearch,
      onReset,
      onSubmit = this.onSearch,
      className = '',
      ...resetProps
    } = this.props;

    const { btnSearchLoading, btnResetLoading } = this.state;

    className += ' antd-ext-form';

    return (
      <Form className={className} onSubmit={onSubmit} {...resetProps}>
        <Row gutter={gutter}>
          {formItemList.map((formItemProps) => {
            const { formItem, component } = formItemProps;
            const { offset, span = 8, hidden = false, } = formItem;
            const { key } = component;

            // 如果设置hidden 那么不渲染此项
            if (hidden) return null;

            return (
              <Col key={key} span={span} offset={offset}>
                {createFormItem(formItemProps, form, className, resetProps.layout)}
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

const FormScopeWrapper = Form.create<FormScopeProps>()(FormScope);

export default FormScopeWrapper;
