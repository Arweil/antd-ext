import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { InputProps } from 'antd/lib/input';
import { Icon } from 'antd';
import InputExt from './InputExt';

const DynamicInputItem = styled.div`
  margin-top: 4px;
  margin-bottom: 6px;
  line-height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:last-child {
    margin-bottom: 4px;
  }

  > .anticon {
    margin-left: 10px;
    font-size: 18px;
  }
`;

export interface DynamicInputListProps {
  inputProps?: InputProps;
  value?: string[];
  onChange?: (values: string[]) => void;
  disabled?: boolean;
}

interface DynamicInputListState {
  valueList: string[];
}

export default class DynamicInputList extends PureComponent<DynamicInputListProps, DynamicInputListState> {
  constructor(props: Readonly<DynamicInputListProps>) {
    super(props);

    this.state = {
      valueList: [''],
    };

    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  static getDerivedStateFromProps(nextProps: Readonly<DynamicInputListProps>): DynamicInputListState | null {
    if ('value' in nextProps) {
      return {
        valueList: (nextProps.value && nextProps.value.length) ? nextProps.value : [''],
      };
    }
    return null;
  }

  onAdd(): void {
    const { valueList } = this.state;
    const finVals = [...valueList, ''];
    this.setState({
      valueList: finVals,
    }, () => {
      const { onChange } = this.props;
      onChange && onChange(finVals);
    });
  }

  onDelete(index: number): void {
    const { valueList } = this.state;
    const finVals = valueList.filter((item, _index) => {
      return index !== _index;
    });

    this.setState({
      valueList: finVals,
    }, () => {
      const { onChange } = this.props;
      onChange && onChange(finVals);
    });
  }

  onChange(e: React.ChangeEvent<HTMLInputElement>, index: number): void {
    const { valueList } = this.state;
    const finValueList = [...valueList];
    finValueList[index] = e.target.value;

    this.setState({
      valueList: finValueList,
    }, () => {
      const { onChange } = this.props;
      onChange && onChange(finValueList);
    });
  }

  render(): JSX.Element {
    const { inputProps, disabled } = this.props;
    const { valueList } = this.state;

    return (
      <div>
        {
          valueList.map((value, index) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <DynamicInputItem key={index}>
                <InputExt
                  {...inputProps}
                  disabled={disabled}
                  value={value}
                  onChange={(event): void => this.onChange(event, index)}
                />
                {
                  disabled ? null : <Icon type="plus-circle" onClick={this.onAdd} />
                }
                {
                  (valueList.length > 1 && !disabled) ? (
                    <Icon type="minus-circle" onClick={(): void => this.onDelete(index)} />
                  ) : null
                }
              </DynamicInputItem>
            );
          })
        }
      </div>
    );
  }
}
