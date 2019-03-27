import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

export default (props) => {
  const { decoratorOpt, form, formItemKey, formClassName, ...restProps } = props;

  return form.getFieldDecorator(formItemKey, decoratorOpt)(
    <Search autoComplete="off" {...restProps} />
  );
};
