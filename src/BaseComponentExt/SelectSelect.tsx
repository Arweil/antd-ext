import React, { PureComponent } from 'react';
import { Input } from 'antd';
import SelectExt, { SelectExtend } from './SelectExt';
import { SelectValue } from 'antd/lib/select';

const InputGroup = Input.Group;

interface SelectInputProps<SelectValueBeforeType, SelectValueAfterType> {
  value?: { // 默认值
    selectValueBefore?: SelectValueBeforeType,
    selectValueAfter?: SelectValueAfterType,
  };
  selectPropsBefore?: SelectExtend<SelectValueBeforeType>; // select组件属性
  selectPropsAfter?: SelectExtend<SelectValueAfterType>; // input组件属性
  showSelectBefore?: boolean; // 是否显示Select
  showSelectAfter?: boolean; // 是否显示Input
  onChange?: (params: { selectValueBefore?: SelectValueBeforeType; selectValueAfter?: SelectValueAfterType }) => void; // 重写onChange事件
}

interface SelectInputState<SelectValueBeforeType, SelectValueAfterType> {
  selectValueBefore?: SelectValueBeforeType;
  selectValueAfter?: SelectValueAfterType;
}

export default class SelectInput<
  SelectValueBeforeType = SelectValue,
  SelectValueAfterType = SelectValue,
  >
  extends PureComponent<
  SelectInputProps<SelectValueBeforeType, SelectValueAfterType>,
  SelectInputState<SelectValueBeforeType, SelectValueAfterType>
  > {
  constructor(props: Readonly<SelectInputProps<SelectValueBeforeType, SelectValueAfterType>>) {
    super(props);

    this.state = {
      selectValueBefore: undefined,
      selectValueAfter: undefined,
    }
  }

  static getDerivedStateFromProps(nextProps: any) {
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  // onSelectChange = (value: SelectValueType, option: React.ReactElement<any> | React.ReactElement<any>[]) => {
  //   const { selectProps } = this.props;
  //   const { inputValue } = this.state;

  //   selectProps && selectProps.onChange && selectProps.onChange(value, option);

  //   if (!('value' in this.props)) {
  //     this.setState({ selectValue: value }, () => {
  //       this.onChange({ selectValue: value, inputValue });
  //     });
  //   } else {
  //     this.onChange({ selectValue: value, inputValue });
  //   }
  // }

  // onChange(params: { selectValue?: SelectValueType; inputValue?: InputValueType }) {
  //   const { onChange } = this.props;
  //   onChange && onChange(params);
  // }

  render() {
    const { selectPropsBefore, selectPropsAfter, showSelectBefore, showSelectAfter } = this.props;

    return (
      <InputGroup compact>
        {
          showSelectBefore === undefined || showSelectBefore ? (
            <SelectExt<SelectValueBeforeType>
              style={{ width: '50%' }}
              optionAll={false}
              {...selectPropsBefore}
              // onChange={this.onSelectChange}
            />
          ) : null
        }
        {
          showSelectAfter === undefined || showSelectAfter ? (
            <SelectExt<SelectValueAfterType>
              style={{ width: '50%' }}
              optionAll={false}
              {...selectPropsAfter}
              // onChange={this.onSelectChange}
            />
          ) : null
        }
      </InputGroup>
    )
  }
}
