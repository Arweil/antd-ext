import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import FormExt from '@/FormExt';
import { Card, Button } from 'antd';

class Root extends Component {
  constructor(props) {
    super(props);
    this.formB = React.createRef();
  }

  render() {
    return (
      <div style={{ padding: 20 }}>
        <Card
          title="Form Ext A"
          style={{ marginBottom: 20 }}
        >
          <FormExt
            btnSpan={24}
            formItemList={[
              {
                label: 'Label 1',
                type: 'input',
                noFormItemLayout: true,
                formItemKey: 'keyA',
              },
              {
                label: 'Label 2',
                type: 'select',
                dataMap: {
                  itemA: 'item A',
                  itemB: 'item B',
                },
                formItemKey: 'keyB',
              },
              {
                label: 'Label 3',
                type: 'datePicker',
                formItemKey: 'keyC',
                format: 'YYYY-MM-DD HH:mm',
                showTime: {
                  format: 'HH:mm',
                },
              },
              {
                label: 'Label 4',
                type: 'rangePicker',
                noFormItemLayout: true,
                formItemKey: 'keyD',
              },
              {
                span: 24,
                label: 'Label 5',
                type: 'textarea',
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
          extra={
            <div>
              <Button
                style={{ marginRight: 16 }}
                type="primary"
                onClick={
                  () => {
                    const vals = this.formB.props.form.getFieldsValue();
                    console.log(vals);
                  }
                }
              >
                Save
              </Button>
              <Button
                onClick={
                  () => {
                    this.formB.props.form.resetFields();
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
            wrappedComponentRef={(form) => this.formB = form}
            needBtnGroup={false}
            formItemList={[
              {
                label: 'Label 1',
                type: 'input',
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
                type: 'select',
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
                type: 'datePicker',
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
                type: 'rangePicker',
                noFormItemLayout: true,
                formItemKey: 'keyD',
                decoratorOpt: {
                  rules: [{
                    required: true,
                  }],
                },
              },
              {
                span: 24,
                label: 'Label 5',
                type: 'textarea',
                noFormItemLayout: true,
                formItemKey: 'keyE',
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
      </div>
    );
  }
}

export default hot(module)(Root);
