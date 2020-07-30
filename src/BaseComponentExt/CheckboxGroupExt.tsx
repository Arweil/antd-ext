import React from 'react';
import { Checkbox } from 'antd';
import { CheckboxGroupProps, CheckboxOptionType } from 'antd/lib/checkbox';

const CheckboxGroup = Checkbox.Group;

export interface CheckboxGroupExtProps extends CheckboxGroupProps {
  dataMap?: {
    [key: string]: string;
    [key: number]: string;
  };
  dataList?: {
    code: string | number;
    name: string;
    disabled?: boolean;
  }[];
}

export default function CheckboxGroupExt(props: CheckboxGroupExtProps): JSX.Element {
  const { dataMap = {}, dataList = [], options, ...restProps } = props;

  const optionsDataMap: CheckboxOptionType[] = Object.keys(dataMap).map((item) => {
    return {
      label: dataMap[item],
      value: item,
    };
  });

  const optionsDataList: CheckboxOptionType[] = dataList.map((item) => {
    return {
      label: item.name,
      value: `${item.code}`,
      disabled: item.disabled,
    };
  });

  return (
    <CheckboxGroup
      {...restProps}
      options={[
        ...optionsDataMap,
        ...optionsDataList,
      ]}
    />
  );
}
