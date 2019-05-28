import React from 'react';
import { FieldConf, EnumType } from './types';
import { Select, Spin, Cascader, Input, DatePicker } from 'antd';
import { OptionProps } from 'antd/lib/select';
import { CascaderOptionType } from 'antd/lib/cascader';

const SelectOption = Select.Option;

// 字段类型
export const dicFieldType = Object.seal({
  dropDownList: 'dropDownList', // 下拉列表
  dropDownListSearch: 'dropDownListSearch', // 下拉异步搜索框
  dropDownListMultiple: 'dropDownListMultiple', // 下拉多选
  cascader: 'cascader', // 级联选择
  entryField: 'entryField', // 输入框
  datePicker: 'datePicker', // 日期选择
});

function getOptions(enumOption?: EnumType) {
  return enumOption && Object.keys(enumOption).map((item) => {
    return <SelectOption key={item}>{enumOption[item]}</SelectOption>;
  });
}

const onFilterOption = (input: string, option: React.ReactElement<OptionProps>) => {
  if (typeof option.props.children === 'string') {
    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  }
  return option;
};

// 枚举类型
function isEnumType(params: any): params is EnumType {
  return Object.prototype.toString.call(params) === '[object Object]';
}

// 级联类型
function isCascaderOptionType(params: any): params is Array<CascaderOptionType> {
  return Object.prototype.toString.call(params) === '[object Array]';
}

export default function mapComponent(props: {
  key: string;
  fieldConfList: FieldConf[];
  searching: boolean;
  enumItems: { [key: string]: EnumType | CascaderOptionType[] };
  onSearch?: (params: { field: string, value: string }) => void;
}) {
  const { key, fieldConfList, enumItems, onSearch, searching } = props;

  const element = fieldConfList.find((item) => {
    return item.field === key;
  });

  if (!element) {
    return null;
  }

  const { compType } = element;
  const dataSource = enumItems[key];

  if (!dataSource) {
    return null;
  }

  switch (compType) {
    case dicFieldType.dropDownList:
      return (
        <Select
          showSearch
          optionFilterProp="children"
          filterOption={onFilterOption}
          dropdownMatchSelectWidth={false}
          placeholder="请选择"
        >
          {isEnumType(dataSource) ? getOptions(dataSource) : {}}
        </Select>
      );
    case dicFieldType.dropDownListSearch:
      return (
        <Select
          showSearch
          filterOption={false}
          dropdownMatchSelectWidth={false}
          notFoundContent={searching ? <Spin size="small" /> : null}
          placeholder="请选择"
          onSearch={async (value) => {
            if (onSearch) {
              await onSearch({ field: key, value });
            }
          }}
        >
          {isEnumType(dataSource) ? getOptions(dataSource) : {}}
        </Select>
      );
    case dicFieldType.dropDownListMultiple:
      return (
        <Select
          showSearch
          optionFilterProp="children"
          filterOption={onFilterOption}
          dropdownMatchSelectWidth={false}
          mode="multiple"
          placeholder="请选择"
        >
          {isEnumType(dataSource) ? getOptions(dataSource) : {}}
        </Select>
      );
    case dicFieldType.cascader:
      return (
        <Cascader
          placeholder="请选择"
          options={isCascaderOptionType(dataSource) ? dataSource : undefined} />
      );
    case dicFieldType.entryField:
      return (
        <Input placeholder="请输入" />
      );
    case dicFieldType.datePicker:
      return (
        <DatePicker placeholder="请选择" style={{ width: '100%' }} />
      );
    default:
      return null;
  }
}
