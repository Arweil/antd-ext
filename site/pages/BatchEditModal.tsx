import React, { PureComponent } from 'react';
import { Button } from 'antd';
import BatchEditModalComp, { FieldConf as FieldConfRequired, dicFieldType} from '@/BatchEditModal';

interface FieldConf {
  field: string;
  compType: string;
  enumName: string;
  fieldName: string;
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default class BatchEditModal extends PureComponent<{}, {
  visible: boolean;
  fieldList: FieldConfRequired[];
}> {
  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {
      visible: false,
      fieldList: [],
    }

    this.onSave = this.onSave.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onValidate = this.onValidate.bind(this);
  }

  componentDidMount() {
    this.queryConf();
  }

  async onSave(params: {
    [key: string]: string | undefined;
  }) {
  }

  async onClose() {
    this.setState({
      visible: false,
    })
  }

  async onAddField(element: FieldConfRequired) {
    await sleep(500);

    switch (element.compType) {
      case dicFieldType.dropDownList:
      case dicFieldType.dropDownListMultiple:
        return Promise.resolve({
          itemA: 'Item A',
          itemB: 'Item B',
          itemC: 'Item C',
        });
      case dicFieldType.dropDownListSearch:
        return Promise.resolve({});
      case dicFieldType.cascader:
        return Promise.resolve([
          {
            label: 'Item A Item A Item A Item A',
            value: 'ItemA',
            children: [{
              label: 'Item A.1 Item A.1 Item A.1 Item A.1',
              value: 'ItemA1',
            }, {
              label: 'Item A.2',
              value: 'ItemA2',
            }]
          },
          {
            label: 'Item B',
            value: 'ItemB',
            children: [{
              label: 'Item B.1',
              value: 'ItemB1',
            }, {
              label: 'Item B.2',
              value: 'ItemB2',
            }]
          }
        ]);
      default:
        return {};
    }
  }

  onValidate(element: FieldConfRequired, value: any, callback: any) {
    callback();
  }

  async onSearch({ field, value }: { field: string; value: string }) {
    await sleep(2000);

    return Promise.resolve({
      A: `${field}-${value}`,
    })
  }

  async queryConf() {
    const res: FieldConf[] = await Promise.resolve([
      {
        compType: 'dropDownList', field: 'dropDownList', fieldName: 'dropDownList', enumName: 'A'
      }, {
        compType: 'dropDownListSearch', field: 'dropDownListSearch', fieldName: 'dropDownListSearch', enumName: ''
      }, {
        compType: 'dropDownListMultiple', field: 'dropDownListMultiple', fieldName: 'dropDownListMultiple', enumName: ''
      }, {
        compType: 'cascader', field: 'cascader', fieldName: 'cascader', enumName: ''
      }, {
        compType: 'entryField', field: 'entryField', fieldName: 'entryField', enumName: ''
      }, {
        compType: 'datePicker', field: 'datePicker', fieldName: 'datePicker', enumName: ''
      }
    ]);

    this.setState({
      fieldList: res.map((item) => {
        return {
          required: true,
          ...item,
        }
      })
    })
  }

  render() {
    const { visible, fieldList } = this.state;
    return (
      <div>
        <Button onClick={() => { this.setState({ visible: true }) }}>批量修改字段</Button>
        <BatchEditModalComp
          fieldConfList={fieldList}
          modalProps={{
            visible,
            title: 'Batch Edit',
          }}
          onSave={this.onSave}
          onClose={this.onClose}
          onAddField={this.onAddField}
          onSearch={this.onSearch}
          onValidate={this.onValidate}
        />
      </div>
    )
  }
}
