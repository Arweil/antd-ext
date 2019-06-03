import React, { PureComponent } from 'react';
import { Modal, Button, Form, Row, Col, Icon, Dropdown, Menu } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import _ from 'lodash';
import { getLastPromise } from '@/utils/promiseExt';
import { BatchEditModalProps, BatchEditModalState, FieldConf } from './types';
import { createFormItem } from '../FormExt/FormItem';

const FormItem = Form.Item;
const formkeys = 'fieldList';

const _getLastPromise = getLastPromise();

class BatchEditModal extends PureComponent<BatchEditModalProps, BatchEditModalState> {
  constructor(props: Readonly<BatchEditModalProps>) {
    super(props);

    this.state = {
      saving: false,
      addingField: false,
      enumItems: {},
    };

    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onValidate = this.onValidate.bind(this);
  }

  // 添加字段
  async onAdd({ key }: { key: string }) {
    try {
      await this.setStateAsync({ addingField: true });

      const { fieldConfList, form, onAddField } = this.props;

      const element = fieldConfList.find((item) => {
        return item.field === key;
      });

      if (element) {
        const { enumItems } = this.state;
        const fieldList: FieldConf[] = form.getFieldValue(formkeys);

        const newEnumItems = _.cloneDeep(enumItems);
        newEnumItems[key] = (onAddField && await onAddField(element, fieldList)) || undefined;

        await this.setStateAsync({ enumItems: newEnumItems });
        
        fieldList.push(element);
        form.setFieldsValue({
          [formkeys]: fieldList,
        });
      }
    } catch (ex) {
      console.warn(ex);
    } finally {
      await this.setStateAsync({ addingField: false });
    }
  }

  // 验证触发
  async onValidate(element: FieldConf, value: any, callback: any) {
    const { onValidate } = this.props;
    if (onValidate) {
      await onValidate(element, value, callback);
    } else {
      callback();
    }
  }

  // 删除字段
  async onDelete(id: string) {
    const { form, onDelete } = this.props;
    const addedFieldList: FieldConf[] = form.getFieldValue(formkeys);

    // 删除的元素
    const deleField = addedFieldList.find(element => element.field === id);
    // 剩余的元素
    const unDeleFields = addedFieldList.filter(element => element.field !== id);

    deleField && onDelete && await onDelete(deleField, unDeleFields);

    form.setFieldsValue({
      [formkeys]: unDeleFields,
    });
  }

  // 搜索
  onSearch = _.debounce(async ({ field, value }: { field: string; value: string; }) => {
    try {
      const { onSearch } = this.props;
      const res = onSearch && _getLastPromise.run(async () => {
        return await onSearch({ field, value });
      });
      const result = await res;
      if (result && !result.cancel) {
        const { enumItems } = this.state;
        const newEnumItems = _.cloneDeep(enumItems);
        newEnumItems[field] = result.result
        await this.setStateAsync({ enumItems: newEnumItems });
      }
    } catch (ex) {
      console.warn(ex);
    }
  }, 500);

  // 保存字段
  async onSave() {
    const { form, onSave } = this.props;
    await this.setStateAsync({ saving: true });
    form.validateFieldsAndScroll(async (errors, values) => {
      if (errors) {
        await this.setStateAsync({ saving: false });
        return false;
      }

      try {
        const { newVal } = values;
        await onSave(newVal);
        await form.resetFields();
      } catch (ex) {
        console.warn(ex);
      } finally {
        await this.setStateAsync({ saving: false });
      }

      return;
    });
  }

  // 取消关闭
  onClose() {
    const { form } = this.props;
    const { onClose } = this.props;
    onClose();
    form.resetFields();
  }

  async setStateAsync<K extends keyof BatchEditModalState>(params: Pick<BatchEditModalState, K>) {
    return new Promise((resolve) => {
      this.setState(params, resolve);
    });
  }

  render() {
    const { form, fieldConfList, modalProps } = this.props;
    const { saving, addingField, enumItems } = this.state;

    const { getFieldDecorator, getFieldValue } = form;

    getFieldDecorator(formkeys, { initialValue: [] });
    const addedFieldList: FieldConf[] = getFieldValue(formkeys);

    const fieldList: string[] = addedFieldList.map((item) => {
      return item.field;
    });

    // 对用户选择的项进行过滤
    const filteredFieldConfList = fieldConfList.filter((item) => {
      return !fieldList.includes(item.field);
    });

    const finModalProps: ModalProps = {
      title: "批量修改",
      closable: false,
      width: 700,
      maskClosable: false,
      style: {
        top: 20,
      },
      bodyStyle: {
        overflowY: 'scroll',
        maxHeight: window.innerHeight - 150,
      },
      onOk: this.onSave,
      onCancel: this.onClose,
      okButtonProps: {
        loading: saving,
      },
      cancelButtonProps: {
        disabled: saving,
      },
      ...modalProps,
    };

    return (
      <Modal {...finModalProps}>
        <div>
          <Form style={{ marginTop: 10 }} className="antd-ext-modal-batch-edit">
            {
              addedFieldList.map((element) => {
                const { field: key, fieldName, compProps } = element;

                return (
                  <Row key={key} gutter={20}>
                    <Col span={22}>
                      {
                        createFormItem(
                          compProps,
                          form,
                          'antd-ext-modal-batch-edit'
                        )
                      }
                    </Col>
                    <Col span={2}>
                      {/* 
                      // @ts-ignore */}
                      <Button
                        type="danger"
                        icon="delete"
                        style={{ marginTop: 3 }}
                        onClick={() => {
                          this.onDelete(key);
                        }}
                      />
                    </Col>
                  </Row>
                );
              })
            }
            {
              filteredFieldConfList && filteredFieldConfList.length > 0 ? (
                <Row>
                  <Col>
                    <FormItem>
                      <Dropdown
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
                        {/* 
                        // @ts-ignore */}
                        <Button loading={addingField}>
                          添加字段
                          <Icon type="down" />
                        </Button>
                      </Dropdown>
                    </FormItem>
                  </Col>
                </Row>
              ) : null
            }
          </Form>
        </div>
      </Modal>
    );
  }
}

export default Form.create()(BatchEditModal);
