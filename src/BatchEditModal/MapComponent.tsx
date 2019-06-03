import React from 'react';
import _ from 'lodash';
import { FieldConf, EnumType, CompProps } from './types';
import { Select, Cascader, DatePicker } from 'antd';
import { OptionProps } from 'antd/lib/select';
import { CascaderOptionType } from 'antd/lib/cascader';
import { SelectInput, SelectSelect, InputExt } from '../BaseComponentExt';

const SelectOption = Select.Option;

// 字段类型
export const dicFieldType = Object.seal({
  Select: 'Select', // 下拉列表
  SelectSearch: 'SelectSearch', // 下拉异步搜索框
  SelectMultiple: 'SelectMultiple', // 下拉多选
  SelectSearchInput: 'SelectSearchInput', // 下拉异步搜索框 + 文本框
  SelectSearchSelect: 'SelectSearchSelect', // 下拉异步搜索框 + 搜索
  Cascader: 'Cascader', // 级联选择
  Input: 'Input', // 输入框
  DatePicker: 'DatePicker', // 日期选择
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
  compProps: CompProps;
  enumItems: { [key: string]: EnumType | CascaderOptionType[] | undefined };
  onSearch?: (params: { field: string; value: string; }) => void;
}) {
  const { key, fieldConfList, enumItems, onSearch, compProps } = props;

  const element = fieldConfList.find((item) => {
    return item.field === key;
  });

  if (!element) {
    return null;
  }

  const { compType } = element;
  const dataSource = enumItems[key];

  async function _onSearch(value: string) {
    if (onSearch) {
      await onSearch({ field: key, value });
    }
  }

  switch (compType) {
    case dicFieldType.Select:
      return (
        <Select
          dropdownMatchSelectWidth={false}
          placeholder="请选择"
          {...compProps.Select}
          optionFilterProp="children"
          filterOption={onFilterOption}
          showSearch
        >
          {isEnumType(dataSource) ? getOptions(dataSource) : null}
        </Select>
      );
    case dicFieldType.SelectSearch:
      return (
        <Select
          placeholder="请选择"
          dropdownMatchSelectWidth={false}
          {...compProps.Select}
          showSearch
          filterOption={false}
          onSearch={_onSearch}
        >
          {isEnumType(dataSource) ? getOptions(dataSource) : null}
        </Select>
      );
    case dicFieldType.SelectMultiple:
      return (
        <Select
          placeholder="请选择"
          dropdownMatchSelectWidth={false}
          {...compProps.Select}
          showSearch
          optionFilterProp="children"
          filterOption={onFilterOption}
          mode="multiple"
        >
          {isEnumType(dataSource) ? getOptions(dataSource) : null}
        </Select>
      );
    case dicFieldType.Cascader:
      return (
        <Cascader
          placeholder="请选择"
          {...compProps.Cascader}
          options={isCascaderOptionType(dataSource) ? dataSource : []}
        />
      );
    case dicFieldType.Input:
      return (
        <InputExt
          placeholder="请输入"
          {...compProps.Input}
        />
      );
    case dicFieldType.DatePicker:
      return (
        <DatePicker
          placeholder="请选择"
          {...compProps.DatePicker}
          style={{ width: '100%' }}
        />
      );
    case dicFieldType.SelectSearchInput:
      if (compProps.SelectSearchInput) {
        compProps.SelectSearchInput.selectProps = {
          dataMap: {},
          dropdownMatchSelectWidth: false,
        }
      }

      compProps.SelectSearchInput = _.merge(compProps.SelectSearchInput, {
        selectProps: {
          showSearch: true,
          onSearch: _onSearch,
          dataMap: isEnumType(dataSource) ? dataSource : {},
        }
      });

      return (
        <SelectInput
          {...compProps.SelectSearchInput}
        />
      );
    case dicFieldType.SelectSearchSelect:
      if (compProps.SelectSearchSelect) {
        if (!compProps.SelectSearchSelect.selectPropsBefore) {
          compProps.SelectSearchSelect.selectPropsBefore = {
            dataMap: {},
            dropdownMatchSelectWidth: false,
          };
        }
        if (!compProps.SelectSearchSelect.selectPropsAfter) {
          compProps.SelectSearchSelect.selectPropsAfter = {
            dropdownMatchSelectWidth: false,
          };
        }
      }

      compProps.SelectSearchSelect = _.merge(compProps.SelectSearchSelect, {
        selectPropsBefore: {
          showSearch: true,
          onSearch: _onSearch,
          dataMap: isEnumType(dataSource) ? dataSource : {},
        },
        selectPropsAfter: {
          showSearch: true,
        }
      });

      return (
        <SelectSelect
          {...compProps.SelectSearchSelect}
        />
      );
    default:
      return null;
  }
}
