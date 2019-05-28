import React from 'react'
import { Select } from 'antd';
import { OptionProps, SelectValue, SelectProps } from 'antd/lib/select';

interface FSelectPropsExt {
  dataMap?: {
    [key: string]: string;
    [key: number]: string;
  };
  dataList?: {
    code: string | number;
    name: string;
    disabled?: boolean;
    title?: string;
    className?: string;
  }[];
  optionAll?: boolean;
}

export interface SelectExtend<T> extends FSelectPropsExt, SelectProps<T> { }

const { Option } = Select;

const onFilterOption = (input: string, option: React.ReactElement<OptionProps>) => {
  if (typeof option.props.children === 'string') {
    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  }
  return option;
};

export default function SelectExt<T = SelectValue>(props: SelectExtend<T>) {
  const {
    dataMap = {}, // 数据源 对象
    dataList = [], // 数据源 数组
    optionAll = true, // 是否有 "全部"
    optionFilterProp = 'children',
    filterOption = onFilterOption,
    ...restProps
  } = props;
  return (
    // @ts-ignore
    <Select
      optionFilterProp={optionFilterProp}
      filterOption={filterOption}
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
            // @ts-ignore
            <Option key={code} {...restOptionProps}>
              {name}
            </Option>
          );
        })
      }
    </Select>
  )
}
