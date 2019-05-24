import React, { PureComponent } from 'react';
import { Modal, Button, Form, Row, Col, Input, Icon, Dropdown, Menu, Select } from 'antd';
import { BatchEditModalProps, BatchEditModalState, EnumType } from './types';
import { OptionProps } from 'antd/lib/select';

const FormItem = Form.Item;
const SelectOption = Select.Option;
const formkeys = 'fieldList';

function getOptions(enumOption: EnumType) {
  return Object.keys(enumOption).map((item) => {
    return <SelectOption key={item}>{enumOption[item]}</SelectOption>;
  });
}

const onFilterOption = (input: string, option: React.ReactElement<OptionProps>) => {
  if (typeof option.props.children === 'string') {
    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  }
  return option;
};

// 字段类型
const dicFieldType = Object.seal({
  dropDownList: 'dropDownList', // 下拉列表
  dropDownListSearch: 'dropDownListSearch', // 下拉异步搜索框
  dropDownListMultiple: 'dropDownListMultiple', // 下拉多选
  cascader: 'cascader', // 级联选择
  entryField: 'entryField', // 输入框
  readOnlyEmpty: 'readOnlyEmpty', // 只读为空
  datePicker: 'datePicker', // 日期选择
});

class BatchEditModal extends PureComponent<BatchEditModalProps, BatchEditModalState> {
  private curEnum: { [key: string]: EnumType }
  constructor(props: Readonly<BatchEditModalProps>) {
    super(props);

    this.state = {
      fetching: false,
    };

    this.curEnum = {};

    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onClose = this.onClose.bind(this);
    this.getFieldConfValue = this.getFieldConfValue.bind(this);
  }

  // 添加字段
  async onAdd({ key }: { key: string }) {
    const { fieldConfList, form } = this.props;
    const fieldList = form.getFieldValue(formkeys);
    fieldList.push(key);

    const element = fieldConfList.find((item) => {
      return item.field === key;
    });

    if (element) {
      const { field, enumName } = element;

      this.curEnum[key] = await this.mapOptions({ field, enumName });

      form.setFieldsValue({
        [formkeys]: fieldList,
      });
    }
  }

  // 删除字段
  onDelete(id: string) {
    const { form } = this.props;
    const fieldList: string[] = form.getFieldValue(formkeys);
    form.setFieldsValue({
      [formkeys]: fieldList.filter(key => key !== id),
    });
  }

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

  // 获取组件
  getInput(key: string) {
    const { fieldConfList } = this.props;
    const element = fieldConfList.find((item) => {
      return item.field === key;
    });

    if (!element) {
      return null;
    }

    const { compType } = element;

    switch (compType) {
      case dicFieldType.dropDownList:
        return (
          <Select>
            {getOptions(this.curEnum[key])}
          </Select>
        );
      case dicFieldType.dropDownListMultiple:
        return (
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={onFilterOption}
            mode="multiple"
          >
            {getOptions(this.curEnum[key])}
          </Select>
        );
      default:
        return null;
    }
  }

  // 获取字段名
  getFieldConfValue(key: string) {
    const { fieldConfList } = this.props;
    const element = fieldConfList.find((item) => {
      return item.field === key;
    });
    if (element) {
      return element.fieldName;
    }
    return undefined;
  }

  // 获取枚举值
  async mapOptions({ field, enumName }: { field: string; enumName: string; }) {
    // const { enumBusSign, enumWorkGroup, getEnum } = this.props;

    // if (enumName) {
    //   const res = await getEnum(enumName);
    //   return res;
    // } else if (field === 'busSign') {
    //   return enumBusSign;
    // } else if (field === 'teamWork') {
    //   return enumWorkGroup;
    // } else {
    //   return {};
    // }

    return {};
  }

  render() {
    const { form, visible, fieldConfList } = this.props;
    const { fetching } = this.state;

    const { getFieldDecorator, getFieldValue } = form;

    getFieldDecorator(formkeys, { initialValue: [] });
    const fieldList: string[] = getFieldValue(formkeys);

    // 对用户选择的项进行过滤
    const filteredFieldConfList = fieldConfList.filter((item) => {
      return !fieldList.includes(item.field);
    });

    return (
      <Modal
        title="业务模式批量修改"
        closable={false}
        width={700}
        visible={visible}
        maskClosable={false}
        style={{
          top: 20,
        }}
        bodyStyle={{
          overflowY: 'scroll',
          maxHeight: 600,
        }}
        onOk={this.onSave}
        onCancel={this.onClose}
        okButtonProps={{
          loading: fetching,
        }}
        cancelButtonProps={{
          disabled: fetching,
        }}
      >
        <div>
          <Form style={{ marginTop: 10 }}>
            {
              fieldList.map((key) => {
                return (
                  <Row key={key} gutter={20}>
                    <Col span={11}>
                      <FormItem labelCol={{ span: 7 }} wrapperCol={{ span: 17 }} label="修改字段">
                        {getFieldDecorator(`oldFiled[${key}]`, {
                          initialValue: this.getFieldConfValue(key),
                          rules: [{
                            required: true,
                            message: '必填',
                          }],
                        })(
                          <Input placeholder="修改字段" disabled />
                        )}
                      </FormItem>
                    </Col>
                    <Col span={11}>
                      <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="修改为">
                        {getFieldDecorator(`newVal[${key}]`, {
                          rules: [{
                            required: !['busSign'].includes(key),
                            message: '必填',
                          }],
                        })(this.getInput(key))}
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
                        <Button>
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
