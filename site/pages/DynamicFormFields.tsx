import React, { PureComponent } from 'react';
import _ from 'lodash';
import DynamicFormFields, { getFilterFormValues, setFormItemValue, formkeys } from '@/DynamicFormFields';
import { FieldConf, AddedField, DynamicFormScope } from '@/DynamicFormFields/DynamicFormFields';
import { AllFItemCompsType } from '@/FormExt/FormItem';
import { Cascader, Button } from 'antd';
import { SelectSelect, SelectInput } from '@/BaseComponentExt';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default class PageDynamicFormFields extends PureComponent<{}, {
  fieldList: FieldConf[],
}> {
  private formInstance: DynamicFormScope | null;

  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {
      fieldList: [],
    }

    this.formInstance = null;

    this.onAddField = this.onAddField.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSave = this.onSave.bind(this);
    this.mapComponent = this.mapComponent.bind(this);
  }

  componentDidMount() {
    this.queryConf();
  }

  async queryConf() {
    const res: { field: string; fieldName: string; }[] = await Promise.resolve([
      {
        field: 'Select',
        fieldName: 'Select',
      }, {
        field: 'SelectSearch',
        fieldName: 'SelectSearch',
      }, {
        field: 'SelectMultiple',
        fieldName: 'SelectMultiple',
      }, {
        field: 'Cascader',
        fieldName: 'Cascader',
      }, {
        field: 'Input',
        fieldName: 'Input',
      }, {
        field: 'DatePicker',
        fieldName: 'DatePicker',
      }, {
        field: 'SelectSearchSelect',
        fieldName: 'SelectSearchSelect',
      }, {
        field: 'SelectSearchInput',
        fieldName: 'SelectSearchInput',
      }
    ]);

    this.setState({
      fieldList: res,
    })
  }

  mapComponent(params: { field: string; fieldName: string; }) {
    if (params.field === 'Select') {
      const compProps: AllFItemCompsType = {
        formItem: {
          label: params.field,
        },
        component: {
          key: params.field,
          type: 'select',
          dropdownMatchSelectWidth: false,
        }
      };

      return compProps;
    }

    if (params.field === 'SelectSearch') {
      const compProps: AllFItemCompsType = {
        formItem: {
          label: params.field,
        },
        component: {
          key: params.field,
          type: 'select',
          showSearch: true,
          dropdownMatchSelectWidth: false,
          filterOption: false,
          onSearch: (value: string) => { this.onSearch(value, params.field) },
        }
      };

      return compProps;
    }

    if (params.field === 'SelectMultiple') {
      const compProps: AllFItemCompsType = {
        formItem: {
          label: params.field,
        },
        component: {
          key: params.field,
          type: 'select',
          showSearch: true,
          mode: 'multiple',
          dropdownMatchSelectWidth: false,
        }
      };

      return compProps;
    }

    if (params.field === 'DatePicker') {
      const compProps: AllFItemCompsType = {
        formItem: {
          label: params.field,
        },
        component: {
          key: params.field,
          type: 'datePicker',
        }
      };

      return compProps;
    }

    if (params.field === 'Cascader') {
      const compProps: AllFItemCompsType = {
        formItem: {
          label: params.field,
        },
        component: {
          key: params.field,
          type: 'extra',
          render: ({ form, key, formClassName }) => {
            return form.getFieldDecorator(key, {})(
              <Cascader />
            );
          },
        }
      };

      return compProps;
    }

    if (params.field === 'SelectSearchSelect') {
      const compProps: AllFItemCompsType = {
        formItem: {
          label: params.field,
        },
        component: {
          key: params.field,
          type: 'extra',
          render: ({ form, key, formClassName }) => {
            return form.getFieldDecorator(key, {})(
              <SelectSelect />
            );
          },
        }
      };

      return compProps;
    }

    if (params.field === 'SelectSearchInput') {
      const compProps: AllFItemCompsType = {
        formItem: {
          label: params.field,
        },
        component: {
          key: params.field,
          type: 'extra',
          render: ({ form, key, formClassName }) => {
            return form.getFieldDecorator(key, {})(
              <SelectInput />
            );
          },
        }
      };

      return compProps;
    }

    const compProps: AllFItemCompsType = {
      formItem: {
        label: params.field,
      },
      component: {
        key: params.field,
        type: 'input',
      }
    };

    return compProps;
  }

  async onAddField(addField: AddedField, addedFields: AddedField[]) {
    await sleep(500);

    const { fieldList } = this.state;
    const element = fieldList.find((item) => {
      return item.field === addField.field;
    });

    if (!element) {
      const result: AllFItemCompsType = {
        formItem: {
          label: addField.field,
        },
        component: {
          key: addField.field,
          type: 'input',
        }
      };
      return result;
    }

    const compProps = this.mapComponent(element);

    if (compProps.component.type === 'select' && addField.field === 'Select') {
      compProps.component.dataMap = {
        A: 'item A',
        B: 'item B',
      }
    } else if (compProps.component.type === 'extra' && addField.field === 'Cascader') {
      compProps.component.render = ({ form, key }) => {
        return form.getFieldDecorator(key, {})(
          <Cascader options={[
            {
              value: 'zhejiang',
              label: 'Zhejiang',
              children: [
                {
                  value: 'hangzhou',
                  label: 'Hangzhou',
                  children: [
                    {
                      value: 'xihu',
                      label: 'West Lake',
                    },
                  ],
                },
              ],
            },
            {
              value: 'jiangsu',
              label: 'Jiangsu',
              children: [
                {
                  value: 'nanjing',
                  label: 'Nanjing',
                  children: [
                    {
                      value: 'zhonghuamen',
                      label: 'Zhong Hua Men',
                    },
                  ],
                },
              ],
            },
          ]} />
        );
      };
    }

    return compProps;
  }

  onSearch(value: string, field: string) {
    if (!this.formInstance) {
      return;
    }

    const fieldList: AddedField[] = this.formInstance.props.form.getFieldValue(formkeys);

    const element = fieldList.find((item) => {
      return item.field === field;
    });

    const newElement = _.cloneDeep(element);

    if (!newElement) {
      return;
    }

    if (newElement.field === 'SelectSearch' && newElement.compProps && newElement.compProps.component.type === 'select') {
      newElement.compProps.component.dataMap = {
        C: 'item C',
        D: 'item D',
      }
    }

    setFormItemValue(this.formInstance, newElement);
  }

  async onSave() {
    if (!this.formInstance) {
      return;
    }

    const res = await getFilterFormValues([this.formInstance]);

    console.log(res);
  }

  render() {
    const { fieldList } = this.state;
    return (
      <div>
        <DynamicFormFields
          wrappedComponentRef={(form: DynamicFormScope) => this.formInstance = form}
          fieldConfList={fieldList}
          onAddField={this.onAddField}
        />
        <Button onClick={this.onSave}>Save</Button>
      </div>
    )
  }
}
