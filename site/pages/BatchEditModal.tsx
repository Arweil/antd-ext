import React, { PureComponent } from 'react';
import { Button } from 'antd';
import BatchEditModalComp, { FieldConf as FieldConfRequired, dicFieldType} from '@/BatchEditModal';
import ModalExt from '@/BaseComponentExt/ModalExt';

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
      case dicFieldType.Select:
      case dicFieldType.SelectMultiple:
        return Promise.resolve({
          itemA: 'Item A',
          itemB: 'Item B',
          itemC: 'Item C',
        });
      case dicFieldType.SelectSearch:
        return Promise.resolve({});
      case dicFieldType.Cascader:
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
        compType: 'Select', field: 'Select', fieldName: 'Select', enumName: 'A'
      }, {
        compType: 'SelectSearch', field: 'SelectSearch', fieldName: 'SelectSearch', enumName: ''
      }, {
        compType: 'SelectMultiple', field: 'SelectMultiple', fieldName: 'SelectMultiple', enumName: ''
      }, {
        compType: 'Cascader', field: 'Cascader', fieldName: 'Cascader', enumName: ''
      }, {
        compType: 'Input', field: 'Input', fieldName: 'Input', enumName: ''
      }, {
        compType: 'DatePicker', field: 'DatePicker', fieldName: 'DatePicker', enumName: ''
      }, {
        compType: 'SelectSearchSelect', field: 'SelectSearchSelect', fieldName: 'SelectSearchSelect', enumName: ''
      }, {
        compType: 'SelectSearchInput', field: 'SelectSearchInput', fieldName: 'SelectSearchInput', enumName: ''
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
          compProps={{
            // SelectSearchInput: {
            //   showInput: false,
            // },
            // SelectSearchSelect: {
            //   showSelectAfter: false,
            // }
          }}
          onSave={this.onSave}
          onClose={this.onClose}
          onAddField={this.onAddField}
          onSearch={this.onSearch}
          // onValidate={this.onValidate}
        />

        <ModalExt
          title="ModalExt"
          visible={true}
          onOk={async () => {
            await sleep(2000);
          }}
        >
          111
        </ModalExt>
      </div>
    )
  }
}
