import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const onFilterOption = (input, option) => {
  return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

export default (props) => {
  const {
    decoratorOpt,
    form,
    formItemKey,
    formClassName,
    dataMap = {}, // 数据绑定 数据源
    optionAll = true, // 是否有 "全部"
    optionFilterProp = 'children',
    filterOption = onFilterOption,
    ...restProps
  } = props;

  const arrformQueryClass = formClassName.split(' ').map((item) => {
    return `.${item}`;
  });

  return form.getFieldDecorator(formItemKey, decoratorOpt)(
    <Select
      optionFilterProp={optionFilterProp}
      filterOption={filterOption}
      getPopupContainer={() => document.querySelector(arrformQueryClass.join(''))}
      {...restProps}
    >
      {
        optionAll ? <Option value="all">全部</Option> : null
      }
      {Object.keys(dataMap).map((item) => {
        return (
          <Option key={item} value={item}>
            {dataMap[item]}
          </Option>
        );
      })}
    </Select>
  );
};
