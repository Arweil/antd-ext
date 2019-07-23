import React, { PureComponent } from 'react';
import { Input } from 'antd';
import SelectExt, { SelectExtend } from './SelectExt';
import { SelectValue } from 'antd/lib/select';

const InputGroup = Input.Group;

export interface SelectSelectProps<SelectValueBeforeType = SelectValue, SelectValueAfterType = SelectValue> {
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

interface SelectSelectState<SelectValueBeforeType, SelectValueAfterType> {
  selectValueBefore?: SelectValueBeforeType;
  selectValueAfter?: SelectValueAfterType;
}

export default class SelectSelect<
  SelectValueBeforeType = SelectValue,
  SelectValueAfterType = SelectValue,
  >
  extends PureComponent<
  SelectSelectProps<SelectValueBeforeType, SelectValueAfterType>,
  SelectSelectState<SelectValueBeforeType, SelectValueAfterType>
  > {
  constructor(props: Readonly<SelectSelectProps<SelectValueBeforeType, SelectValueAfterType>>) {
    super(props);

    this.state = {
      selectValueBefore: undefined,
      selectValueAfter: undefined,
    }

    this.onSelectBeforeChange = this.onSelectBeforeChange.bind(this);
    this.onSelectAfterChange = this.onSelectAfterChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps: any) {
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  // 前一个Select onChange
  onSelectBeforeChange(value: SelectValueBeforeType, option: React.ReactElement<any> | React.ReactElement<any>[]) {
    const { selectPropsBefore } = this.props;
    const { selectValueAfter } = this.state;

    selectPropsBefore && selectPropsBefore.onChange && selectPropsBefore.onChange(value, option);

    if (!('value' in this.props)) {
      this.setState({ selectValueBefore: value }, () => {
        this.onChange({ selectValueBefore: value, selectValueAfter });
      });
    } else {
      this.onChange({ selectValueBefore: value, selectValueAfter });
    }
  }

  // 后一个Select onChange
  onSelectAfterChange(value: SelectValueAfterType, option: React.ReactElement<any> | React.ReactElement<any>[]) {
    const { selectPropsAfter } = this.props;
    const { selectValueBefore } = this.state;

    selectPropsAfter && selectPropsAfter.onChange && selectPropsAfter.onChange(value, option);

    if (!('value' in this.props)) {
      this.setState({ selectValueAfter: value }, () => {
        this.onChange({ selectValueBefore, selectValueAfter: value });
      });
    } else {
      this.onChange({ selectValueBefore, selectValueAfter: value });
    }
  }

  onChange(params: { selectValueBefore?: SelectValueBeforeType; selectValueAfter?: SelectValueAfterType }) {
    const { onChange } = this.props;
    onChange && onChange(params);
  }

  render() {
    const { selectPropsBefore, selectPropsAfter, showSelectBefore, showSelectAfter } = this.props;
    const { selectValueBefore, selectValueAfter } = this.state;

    const _showSelectBefore = showSelectBefore === undefined || showSelectBefore;
    const _showSelectAfter = showSelectAfter === undefined || showSelectAfter;

    return (
      <InputGroup compact>
        {
          _showSelectBefore ? (
            <SelectExt<SelectValueBeforeType>
              style={{ width: _showSelectAfter ? '50%' : '100%' }}
              optionAll={false}
              value={selectValueBefore}
              {...selectPropsBefore}
              onChange={this.onSelectBeforeChange}
            />
          ) : null
        }
        {
          _showSelectAfter ? (
            <SelectExt<SelectValueAfterType>
              style={{ width: _showSelectBefore ? '50%' : '100%' }}
              optionAll={false}
              value={selectValueAfter}
              {...selectPropsAfter}
              onChange={this.onSelectAfterChange}
            />
          ) : null
        }
      </InputGroup>
    )
  }
}
