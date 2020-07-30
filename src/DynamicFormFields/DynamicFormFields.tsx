import React, { PureComponent } from 'react';
import { Form, Row, Col, Dropdown, Icon, Menu } from 'antd';
import _ from 'lodash';
import { WrappedFormUtils, FormComponentProps } from 'antd/lib/form/Form';
import { setStateAsync } from '@/utils/reactExt';
import { AllFItemCompsType, createFormItem } from '../FormExt/FormItem';
import ButtonExt from '../BaseComponentExt/ButtonExt';

const FormItem = Form.Item;
export const formkeys = 'fieldList';

export interface FieldConf {
  field: string;
  fieldName: string;
  disabled?: boolean;
}

export interface AddedField extends FieldConf {
  compConf: AllFItemCompsType;
}

export interface DynamicFormFieldsProps extends FormComponentProps {
  form: WrappedFormUtils;
  fieldConfList: FieldConf[];
  onAddField?: (addField: FieldConf, addedFields: AddedField[]) => Promise<AllFItemCompsType>;
  onDelete?: (deleField: AddedField, unDeleFields: AddedField[]) => void | Promise<void>;
}

export interface DynamicFormFieldsState {
  addingField: boolean;
}

class DynamicFormFields extends PureComponent<DynamicFormFieldsProps, DynamicFormFieldsState> {
  constructor(props: Readonly<DynamicFormFieldsProps>) {
    super(props);

    this.state = {
      addingField: false,
    };

    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  // 添加字段
  async onAdd({ key }: { key: string }): Promise<void> {
    try {
      await setStateAsync(this, { addingField: true });

      const { fieldConfList, form, onAddField } = this.props;

      const element = fieldConfList.find((item) => {
        return item.field === key;
      });

      if (element) {
        const fieldList: AddedField[] = form.getFieldValue(formkeys);

        const compConf = onAddField && await onAddField(element, fieldList);

        compConf && fieldList.push({
          ...element,
          compConf,
        });
        form.setFieldsValue({
          [formkeys]: fieldList,
        });
      }
    } catch (ex) {
      console.warn(ex);
    } finally {
      await setStateAsync(this, { addingField: false });
    }
  }

  // 删除字段
  async onDelete(id: string): Promise<void> {
    const { form, onDelete } = this.props;
    const addedFieldList: AddedField[] = form.getFieldValue(formkeys);

    // 删除的元素
    const deleField = addedFieldList.find(element => element.field === id);
    // 剩余的元素
    const unDeleFields = addedFieldList.filter(element => element.field !== id);

    deleField && onDelete && await onDelete(deleField, unDeleFields);

    form.setFieldsValue({
      [formkeys]: unDeleFields,
    });
  }

  render(): JSX.Element {
    const { form, fieldConfList } = this.props;
    const { addingField } = this.state;

    const { getFieldDecorator, getFieldValue } = form;

    getFieldDecorator(formkeys, { initialValue: [] });
    const addedFieldList: AddedField[] = getFieldValue(formkeys);

    const fieldList: string[] = addedFieldList.map((item) => {
      return item.field;
    });

    // 对用户选择的项进行过滤
    const filteredFieldConfList = fieldConfList.filter((item) => {
      return !fieldList.includes(item.field);
    });

    return (
      <Form style={{ marginTop: 10 }} className="antd-ext-modal-batch-edit">
        <Row gutter={20}>
          {
            addedFieldList.map((element) => {
              const { field, compConf } = element;

              if (!compConf) {
                return null;
              }

              const { formItem, component } = compConf;
              const { offset, span = 24 } = formItem;
              const { key } = component;

              return (
                <Col key={key} span={span} offset={offset}>
                  <Col span={22}>
                    {createFormItem(compConf, form, 'antd-ext-modal-batch-edit')}
                  </Col>
                  <Col span={2}>
                    {/*
                      // @ts-ignore */}
                    <ButtonExt
                      type="danger"
                      icon="delete"
                      style={{ marginTop: 3 }}
                      onClick={(): void => {
                        this.onDelete(field);
                      }}
                    />
                  </Col>
                </Col>
              );
            })
          }
        </Row>
        {
          filteredFieldConfList && filteredFieldConfList.length > 0 ? (
            <Row>
              <Col>
                <FormItem>
                  <Dropdown
                    trigger={['click']}
                    overlay={
                      (
                        <Menu onClick={this.onAdd}>
                          {
                            filteredFieldConfList.map((item) => {
                              return <Menu.Item key={item.field} disabled={!!item.disabled}>{item.fieldName}</Menu.Item>;
                            })
                          }
                        </Menu>
                      )
                    }
                  >
                    <ButtonExt isAsyncClick loading={addingField}>
                      添加字段
                      <Icon type="down" />
                    </ButtonExt>
                  </Dropdown>
                </FormItem>
              </Col>
            </Row>
          ) : null
        }
      </Form>
    );
  }
}

export default Form.create<DynamicFormFieldsProps>()(DynamicFormFields);

export { DynamicFormFields as DynamicFormScope };
