import React, { PureComponent } from 'react';
import { Input } from 'antd';
import SelectExt, { SelectExtend } from './SelectExt';
import InputExt from './InputExt';
import { SelectValue } from 'antd/lib/select';
import { InputProps } from 'antd/lib/input';

const InputGroup = Input.Group;

type InputValueType = string | number | string[];

interface SelectInputProps<SelectValueType> {
  value?: { // 默认值
    selectValue?: SelectValueType,
    inputValue?: InputValueType,
  };
  selectProps?: SelectExtend<SelectValueType>; // select组件属性
  inputProps?: InputProps; // input组件属性
  showSelect?: boolean; // 是否显示Select
  showInput?: boolean; // 是否显示Input
  onChange?: (params: { selectValue?: SelectValueType; inputValue?: InputValueType } ) => void; // 重写onChange事件
}

interface SelectInputState<SelectValueType> {
  selectValue?: SelectValueType;
  inputValue?: InputValueType;
}

export default class SelectInput<
    SelectValueType = SelectValue,
  >
  extends PureComponent<
    SelectInputProps<SelectValueType>,
    SelectInputState<SelectValueType>
  > {
  constructor(props: Readonly<SelectInputProps<SelectValueType>>) {
    super(props);

    this.state = {
      selectValue: undefined,
      inputValue: undefined,
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

  onSelectChange = (value: SelectValueType, option: React.ReactElement<any> | React.ReactElement<any>[]) => {
    const { selectProps } = this.props;
    const { inputValue } = this.state;

    selectProps && selectProps.onChange && selectProps.onChange(value, option);

    if (!('value' in this.props)) {
      this.setState({ selectValue: value }, () => {
        this.onChange({ selectValue: value, inputValue });
      });
    } else {
      this.onChange({ selectValue: value, inputValue });
    }
  }

  onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { inputProps } = this.props;
    const { selectValue } = this.state;

    const value = e.target.value;

    inputProps && inputProps.onChange && inputProps.onChange(e);

    if (!('value' in this.props)) {
      this.setState({ inputValue: value }, () => {
        this.onChange({ selectValue, inputValue: value });
      });
    } else {
      this.onChange({ selectValue, inputValue: value });
    }
  }

  onChange(params: { selectValue?: SelectValueType; inputValue?: InputValueType }) {
    const { onChange } = this.props;
    onChange && onChange(params);
  }

  render() {
    const { selectProps, inputProps, showSelect, showInput } = this.props;

    return (
      <InputGroup compact>
        {
          showSelect === undefined || showSelect ? (
            <SelectExt<SelectValueType>
              style={{ width: '50%' }}
              optionAll={false}
              {...selectProps}
              onChange={this.onSelectChange}
            />
          ) : null
        }
        {
          showInput === undefined || showInput ? (
            <InputExt
              style={{ width: '50%' }}
              {...inputProps}
              onChange={this.onInputChange}
            />
          ) : null
        }
      </InputGroup>
    )
  }
}

