import React from 'react';
import { Select } from 'antd';
import { OptionProps } from 'antd/lib/select';
import { FSelectProps } from './types';
import { getLayoutElement } from './utils';

const { Option } = Select;

const onFilterOption = (input: string, option: React.ReactElement<OptionProps>) => {
  if (typeof option.props.children === 'string') {
    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  }
  return option;
};

export default function FSelect(props: FSelectProps) {
  const {
    decoratorOpt,
    rcform,
    key,
    formClassName,
    dataMap = {}, // 数据源 对象
    dataList = [], // 数据源 数组
    optionAll = true, // 是否有 "全部"
    optionFilterProp = 'children',
    filterOption = onFilterOption,
    ...restProps
  } = props;

  return rcform.getFieldDecorator(key, decoratorOpt)(
    <Select
      optionFilterProp={optionFilterProp}
      filterOption={filterOption}
      getPopupContainer={() => getLayoutElement(formClassName)}
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
      {
        dataList.map((item) => {
          const { code, name, ...restOptionProps } = item;
          return (
            <Option key={code} {...restOptionProps}>
              {name}
            </Option>
          );
        })
      }
    </Select>
  );
};
