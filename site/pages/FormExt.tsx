import React, { PureComponent } from 'react';
import FormExt, { FormScope } from '@/FormExt';
import { Card, Button, Breadcrumb } from 'antd';

const dataMap = {
  itemA: 'item A',
  itemB: 'item B',
  itemC: 'item C',
  itemD: 'item D',
  itemE: 'item E',
  itemF: 'item F',
  itemG: 'item G',
  itemH: 'item H',
  itemI: 'item I',
};

export default class PageFormExt extends PureComponent<{}, {}> {
  formB: FormScope | null;

  constructor(props: Readonly<{}>) {
    super(props);
    this.formB = null;
  }

  render() {
    return (
      <div>
        <Card style={{ marginBottom: 20 }}>
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>FormExt</Breadcrumb.Item>
          </Breadcrumb>
        </Card>

        <Card
          title="Form Ext A"
          style={{ marginBottom: 20 }}
        >
          <FormExt
            btnSpan={24}
            formItemList={[
              {
                label: 'Label 1',
                formItemType: 'input',
                noFormItemLayout: true,
                formItemKey: 'keyA',
              },
              {
                label: 'Label 2',
                formItemType: 'select',
                dataMap: {
                  itemA: 'item A',
                  itemB: 'item B',
                },
                formItemKey: 'keyB',
              },
              {
                label: 'Label 3',
                formItemType: 'datePicker',
                formItemKey: 'keyC',
                format: 'YYYY-MM-DD HH:mm',
                showTime: {
                  format: 'HH:mm',
                },
              },
              {
                label: 'Label 4',
                formItemType: 'rangePicker',
                noFormItemLayout: true,
                formItemKey: 'keyD',
              },
              {
                span: 24,
                label: 'Label 5',
                formItemType: 'textarea',
                noFormItemLayout: true,
                formItemKey: 'keyE',
                autosize: {
                  minRows: 3,
                  maxRows: 4,
                },
              },
            ]}
            onSearch={(val) => {
              console.log(val);
            }}
            onReset={() => {
              console.log('data cleard');
            }}
          />
        </Card>
        <Card
          title="Form Ext B"
          style={{ marginBottom: 20 }}
          extra={
            <div>
              <Button
                style={{ marginRight: 16 }}
                type="primary"
                onClick={
                  () => {
                    const vals = this.formB && this.formB.props.form.getFieldsValue();
                    console.log(vals);
                  }
                }
              >
                Save
              </Button>
              <Button
                onClick={
                  () => {
                    this.formB && this.formB.props.form.resetFields();
                    console.log('data cleard');
                  }
                }
              >
                Reset
              </Button>
            </div>
          }
        >
          <FormExt
            wrappedComponentRef={(form: any) => this.formB = form}
            needBtnGroup={false}
            formItemList={[
              {
                label: 'Label 1',
                formItemType: 'input',
                noFormItemLayout: true,
                formItemKey: 'keyA',
                decoratorOpt: {
                  rules: [{
                    required: true,
                  }],
                },
              },
              {
                label: 'Label 2',
                formItemType: 'select',
                dataMap: {
                  itemA: 'item A',
                  itemB: 'item B',
                },
                formItemKey: 'keyB',
                decoratorOpt: {
                  rules: [{
                    required: true,
                  }],
                },
              },
              {
                label: 'Label 3',
                formItemType: 'datePicker',
                formItemKey: 'keyC',
                format: 'YYYY-MM-DD HH:mm',
                showTime: {
                  format: 'HH:mm',
                },
                decoratorOpt: {
                  rules: [{
                    required: true,
                  }],
                },
              },
              {
                label: 'Label 4',
                formItemType: 'rangePicker',
                noFormItemLayout: true,
                formItemKey: 'keyD',
                decoratorOpt: {
                  rules: [{
                    required: true,
                  }],
                },
              },
              {
                label: 'Label 5',
                formItemType: 'select',
                formItemKey: 'keyE',
                decoratorOpt: {
                  rules: [{
                    required: true,
                  }],
                },
                mode: 'multiple',
                optionAll: false,
                dataMap,
                maxTagCount: 3,
              },
              {
                span: 24,
                label: 'Label 6',
                formItemType: 'textarea',
                noFormItemLayout: true,
                formItemKey: 'keyF',
                autosize: {
                  minRows: 3,
                  maxRows: 4,
                },
                decoratorOpt: {
                  rules: [{
                    required: true,
                  }],
                },
              },
            ]}
          />
        </Card>

        <Card title="Form Ext C">
          111
        </Card>
      </div>
    );
  }
}
