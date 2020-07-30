import React, { PureComponent } from 'react';
import { Input } from 'antd';
import { SelectValue } from 'antd/lib/select';
import { InputProps } from 'antd/lib/input';
import SelectExt, { SelectExtend } from './SelectExt';
import InputExt from './InputExt';

const InputGroup = Input.Group;

type InputValueType = string | number | string[];

export interface SelectInputProps<SelectValueType = SelectValue> {
  value?: { // 默认值
    selectValue?: SelectValueType;
    inputValue?: InputValueType;
  };
  selectProps?: SelectExtend<SelectValueType>; // select组件属性
  inputProps?: InputProps; // input组件属性
  showSelect?: boolean; // 是否显示Select
  showInput?: boolean; // 是否显示Input
  onChange?: (params: { selectValue?: SelectValueType; inputValue?: InputValueType }) => void; // 重写onChange事件
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
    };

    this.onSelectChange = this.onSelectChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps: any): any {
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  onSelectChange(value: SelectValueType, option: React.ReactElement<any> | React.ReactElement<any>[]): void {
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

  onInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { inputProps } = this.props;
    const { selectValue } = this.state;

    const { value } = e.target;

    inputProps && inputProps.onChange && inputProps.onChange(e);

    if (!('value' in this.props)) {
      this.setState({ inputValue: value }, () => {
        this.onChange({ selectValue, inputValue: value });
      });
    } else {
      this.onChange({ selectValue, inputValue: value });
    }
  }

  onChange(params: { selectValue?: SelectValueType; inputValue?: InputValueType }): void {
    const { onChange } = this.props;
    onChange && onChange(params);
  }

  render(): JSX.Element {
    const { selectProps, inputProps, showSelect, showInput } = this.props;
    const { selectValue, inputValue } = this.state;

    const $showSelect = showSelect === undefined || showSelect;
    const $showInput = showInput === undefined || showInput;

    return (
      <InputGroup compact>
        {
          $showSelect ? (
            <SelectExt<SelectValueType>
              style={{ width: $showInput ? '50%' : '100%' }}
              optionAll={false}
              value={selectValue}
              {...selectProps}
              onChange={this.onSelectChange}
            />
          ) : null
        }
        {
          $showInput ? (
            <InputExt
              style={{ width: $showSelect ? '50%' : '100%' }}
              value={inputValue}
              {...inputProps}
              onChange={this.onInputChange}
            />
          ) : null
        }
      </InputGroup>
    );
  }
}
