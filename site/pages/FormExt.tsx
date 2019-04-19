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

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
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
                formItem: {
                  label: 'Label 1',
                  noFormItemLayout: true,
                },
                component: {
                  formItemType: 'input',
                  formItemKey: 'keyA',
                }
              },
              {
                formItem: {
                  label: 'Label 2',
                },
                component: {
                  formItemType: 'select',
                  dataMap: {
                    itemA: 'item A',
                    itemB: 'item B',
                  },
                  formItemKey: 'keyB',
                }
              },
              {
                formItem: {
                  label: 'Label 3',
                },
                component: {
                  formItemType: 'datePicker',
                  formItemKey: 'keyC',
                  format: 'YYYY-MM-DD HH:mm',
                  showTime: {
                    format: 'HH:mm',
                  },
                }
              },
              {
                formItem: {
                  label: 'Label 4',
                  noFormItemLayout: true,
                },
                component: {
                  formItemType: 'rangePicker',
                  formItemKey: 'keyD',
                }
              },
              {
                formItem: {
                  span: 24,
                  label: 'Label 5',
                  noFormItemLayout: true,
                },
                component: {
                  formItemType: 'textarea',
                  formItemKey: 'keyE',
                  autosize: {
                    minRows: 3,
                    maxRows: 4,
                  },
                }
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
                formItem: {
                  label: 'Label 1',
                  noFormItemLayout: true,
                  ...formItemLayout,
                },
                component: {
                  formItemType: 'input',
                  formItemKey: 'keyA',
                  decoratorOpt: {
                    rules: [{
                      required: true,
                    }],
                  },
                }
              },
              {
                formItem: {
                  label: 'Label 2',
                  ...formItemLayout,
                },
                component: {
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
                }
              },
              {
                formItem: {
                  label: 'Label 3',
                  ...formItemLayout,
                },
                component: {
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
                }
              },
              {
                formItem: {
                  label: 'Label 4',
                  noFormItemLayout: true,
                  ...formItemLayout,
                },
                component: {
                  formItemType: 'rangePicker',
                  formItemKey: 'keyD',
                  decoratorOpt: {
                    rules: [{
                      required: true,
                    }],
                  },
                }
              },
              {
                formItem: {
                  label: 'Label 5',
                  ...formItemLayout,
                },
                component: {
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
                }
              },
              {
                formItem: {
                  label: 'Label 6',
                  ...formItemLayout,
                },
                component: {
                  formItemType: 'select',
                  dataList: [
                    {
                      code: 'itemA',
                      name: 'Item A',
                    },
                    {
                      code: 'itemB',
                      name: 'Item B',
                      disabled: true,
                    },
                  ],
                  showSearch: true,
                  formItemKey: 'keyF',
                  decoratorOpt: {
                    rules: [{
                      required: true,
                    }],
                  },
                }
              },
              {
                formItem: {
                  span: 24,
                  label: 'Label 7',
                  noFormItemLayout: true,
                  ...formItemLayout,
                },
                component: {
                  formItemType: 'textarea',
                  formItemKey: 'keyG',
                  autosize: {
                    minRows: 3,
                    maxRows: 4,
                  },
                  decoratorOpt: {
                    rules: [{
                      required: true,
                    }],
                  },
                }
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
