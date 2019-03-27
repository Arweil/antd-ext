import React from 'react';
import { Input } from 'antd';

export default (props) => {
  const { decoratorOpt, form, formItemKey, formClassName, ...restProps } = props;
  return form.getFieldDecorator(formItemKey, decoratorOpt)(
    <Input autoComplete="off" {...restProps} />
  );
};
