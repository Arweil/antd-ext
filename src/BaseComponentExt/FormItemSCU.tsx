import _ from 'lodash';
import React, { Component } from 'react';
import { Form } from 'antd';
import { WrappedFormUtils, GetFieldDecoratorOptions } from 'antd/lib/form/Form';
import { getRandomId } from '@/utils/utils';

interface FormItemProps {
  id: string;
  form: WrappedFormUtils;
  decoratorOpt?: GetFieldDecoratorOptions;
  [otherProps: string]: any;
}

export default class FormItemSCU extends Component<FormItemProps> {
  private cacheVal: string;

  constructor(props: Readonly<FormItemProps>) {
    super(props);

    this.cacheVal = getRandomId();
  }

  shouldComponentUpdate(nextProps: FormItemProps): boolean {
    const hasError = nextProps.form.getFieldError(nextProps.id);
    const value = nextProps.form.getFieldValue(nextProps.id);

    const notOtherProps = ['id', 'form', 'decoratorOpt', 'children'];
    const nextResetProps = _.omit(nextProps, notOtherProps);
    const resetProps = _.omit(this.props, notOtherProps);

    if (!_.isEqual(value, this.cacheVal) || hasError || !_.isEqual(resetProps, nextResetProps)) {
      this.cacheVal = value;
      return true;
    }

    return false;
  }

  render(): JSX.Element {
    const { id, form, decoratorOpt, children } = this.props;

    return (
      <Form.Item style={{ margin: 0 }}>
        {
          form.getFieldDecorator(id, decoratorOpt)(children)
        }
      </Form.Item>
    );
  }
}
