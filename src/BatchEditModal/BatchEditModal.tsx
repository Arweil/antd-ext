import React, { PureComponent } from 'react';
import { Modal, Button, Form, Row, Col, Input, Icon, Dropdown, Menu } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import _ from 'lodash';
import mapComponent from './MapComponent';
import { getLastPromise } from './promiseExt';
import { BatchEditModalProps, BatchEditModalState, FieldConf } from './types';

const FormItem = Form.Item;
const formkeys = 'fieldList';

const _getLastPromise = getLastPromise();

class BatchEditModal extends PureComponent<BatchEditModalProps, BatchEditModalState> {
  constructor(props: Readonly<BatchEditModalProps>) {
    super(props);

    this.state = {
      saving: false,
      addingField: false,
      searching: false,
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
        const fieldList = form.getFieldValue(formkeys);
        fieldList.push(element);

        const { enumItems } = this.state;
        const newEnumItems = _.cloneDeep(enumItems);
        newEnumItems[key] = await onAddField(element);

        await this.setStateAsync({ enumItems: newEnumItems });

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
  onValidate(element: FieldConf, value: any, callback: any) {
    const { onValidate } = this.props;
    if (onValidate) {
      onValidate(element, value, callback);
    } else {
      callback();
    }
  }

  // 删除字段
  onDelete(id: string) {
    const { form } = this.props;
    const addedFieldList: FieldConf[] = form.getFieldValue(formkeys);

    form.setFieldsValue({
      [formkeys]: addedFieldList.filter(element => element.field !== id),
    });
  }

  // 搜索
  onSearch = _.debounce(async ({ field, value }: { field: string; value: string }) => {
    try {
      await this.setStateAsync({ searching: true });
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
    } finally {
      await this.setStateAsync({ searching: false });
    }
  }, 500);

  // 保存字段
  onSave() {
    const { form, onSave } = this.props;
    form.validateFieldsAndScroll(async (errors, values) => {
      if (errors) {
        return false;
      }

      const { newVal } = values;

      await onSave(newVal);
      await form.resetFields();

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
    const { form, visible, fieldConfList, modalProps } = this.props;
    const { saving, searching, addingField, enumItems } = this.state;

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
      visible,
      maskClosable: false,
      style: {
        top: 20,
      },
      bodyStyle: {
        overflowY: 'scroll',
        maxHeight: window.innerHeight - 20,
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
          <Form style={{ marginTop: 10 }}>
            {
              addedFieldList.map((element) => {
                const { field: key, fieldName, required } = element;
                return (
                  <Row key={key} gutter={20}>
                    <Col span={11}>
                      <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 17 }} label="修改字段">
                        {getFieldDecorator(`oldFiled[${key}]`, {
                          initialValue: fieldName,
                        })(
                          <Input placeholder="修改字段" disabled />
                        )}
                      </FormItem>
                    </Col>
                    <Col span={11}>
                      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} hasFeedback label="修改为">
                        {getFieldDecorator(`newVal[${key}]`, {
                          rules: [{
                            required,
                            message: '必填',
                          }, {
                            validator: async (rule, value, callback) => {
                              this.onValidate(element, value, callback);
                            }
                          }],
                        })(mapComponent({
                          key,
                          searching,
                          fieldConfList: addedFieldList,
                          enumItems,
                          onSearch: this.onSearch,
                        }))}
                      </FormItem>
                    </Col>
                    <Col span={2}>
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
                                  return <Menu.Item key={item.field}>{item.fieldName}</Menu.Item>;
                                })
                              }
                            </Menu>
                          )
                        }
                      >
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
