import React, { PureComponent } from 'react';
import InputExt from './InputExt';
import { InputProps } from 'antd/lib/input';
import { Icon } from 'antd';
import { DynamicInputItem } from './style';

export interface DynamicInputListProps {
  inputProps?: InputProps;
  value?: string[];
  onChange?: (values: string[]) => void;
}

export default class DynamicInputList extends PureComponent<DynamicInputListProps, {
  valueList: string[];
}> {
  constructor(props: Readonly<DynamicInputListProps>) {
    super(props);

    this.state = {
      valueList: ['']
    }

    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  static getDerivedStateFromProps(nextProps: DynamicInputListProps) {
    if ('value' in nextProps) {
      return {
        valueList: nextProps.value || [''],
      };
    }
    return null;
  }

  onAdd(index: number) {
    const { valueList } = this.state;
    const finVals = [...valueList, ''];
    this.setState({
      valueList: finVals,
    }, () => {
      this.props.onChange && this.props.onChange(finVals);
    });
  }

  onDelete(index: number) {
    const { valueList } = this.state;
    const finVals = valueList.filter((item, _index) => {
      return index !== _index;
    });
    
    this.setState({
      valueList: finVals,
    }, () => {
      this.props.onChange && this.props.onChange(finVals);
    });
  }

  onChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const { valueList } = this.state;
    const finValueList = [...valueList];
    finValueList[index] = e.target.value; 

    this.setState({
      valueList: finValueList,
    }, () => {
      this.props.onChange && this.props.onChange(finValueList);
    });
  }

  render() {
    const { inputProps } = this.props;
    const { valueList } = this.state;
    return (
      <div>
        {
          valueList.map((value, index) => {
            return (
              <DynamicInputItem>
                <InputExt {...inputProps} value={value} onChange={(event) => this.onChange(event, index)} />
                <Icon type="plus-circle" onClick={() => this.onAdd(index)} />
                {
                  valueList.length > 1 ? (
                    <Icon type="minus-circle" onClick={() => this.onDelete(index)} />
                  ) : null
                }
              </DynamicInputItem>
            )
          })
        }
      </div>
    )
  }
}
