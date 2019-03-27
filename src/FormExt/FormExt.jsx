import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, Button } from 'antd';

import FSearch from './FSearch.jsx';
import FSelect from './FSelect.jsx';
import FInput from './FInput.jsx';
import FTextArea from './FTextArea.jsx';
import FDataPicker from './FDatePicker.jsx';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

function formItemSwitch(args) {
  const mapComponent = {
    search: FSearch,
    select: FSelect,
    input: FInput,
    textarea: FTextArea,
    datePicker: FDataPicker,
    rangePicker: FDataPicker,
  };

  const finFormItem = mapComponent[args.type];

  if (!finFormItem) {
    return null;
  }

  return finFormItem({ ...args });
}

class FormScope extends Component {
  constructor(props) {
    super(props);

    this.state = {
      btnSearchLoading: false,
      btnResetLoading: false,
    };

    this.onSearch = this.onSearch.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  onReset() {
    this.setState(
      {
        btnResetLoading: true,
      },
      async () => {
        const { form, onReset = () => { } } = this.props;
        form.resetFields();
        await onReset();
        this.setState({ btnResetLoading: false });
      }
    );
  }

  onSearch(e) {
    e.preventDefault();
    this.setState(
      {
        btnSearchLoading: true,
      },
      async () => {
        const { form, onSearch = () => { } } = this.props;
        const values = form.getFieldsValue();
        await onSearch(values);
        this.setState({ btnSearchLoading: false });
      }
    );
  }

  render() {
    const {
      gutter,
      formItemList,
      formClassName,
      needBtnGroup,
      btnSpan,
      form,
    } = this.props;

    const { btnSearchLoading, btnResetLoading } = this.state;

    return (
      <Form className={formClassName} onSubmit={this.onSearch}>
        <Row gutter={gutter}>
          {formItemList.map((formItem) => {
            const { label, span = 8, noFormItemLayout, formItemKey, ...restProps } = formItem;

            // 如果没有placeholder 那么直接使用label
            restProps.placeholder = restProps.disabled ? '' : (restProps.placeholder || label);
            // 初始化表单项规则
            restProps.decoratorOpt = restProps.decoratorOpt || {};

            // FormItem 属性
            const args = {
              label,
            };
            if (!noFormItemLayout) {
              Object.assign(args, formItemLayout);
            } else {
              Object.assign(args, {
                className: 'antd-ext-form-item-flex',
              });
            }

            return (
              <Col key={formItemKey} span={span}>
                <FormItem {...args}>
                  {
                    formItemSwitch({
                      formItemKey,
                      formClassName,
                      form,
                      ...restProps,
                    })
                  }
                </FormItem>
              </Col>
            );
          })}
          {
            needBtnGroup ? (
              <Col span={btnSpan} className="antd-ext-form-btn-group-right antd-ext-form-flex-cnt-right">
                <Button loading={btnResetLoading} onClick={this.onReset}>
                  重置
                </Button>
                <Button type="primary" loading={btnSearchLoading} htmlType="submit">
                  查询
                </Button>
              </Col>
            ) : null
          }
        </Row>
      </Form>
    );
  }
}

const FormScopeWrapper = Form.create()(FormScope);

FormScopeWrapper.propTypes = {
  formClassName: PropTypes.string,
  gutter: PropTypes.number,
  btnSpan: PropTypes.number,
  needBtnGroup: PropTypes.bool,
  formItemList: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(['search', 'select', 'input', 'textarea', 'datePicker', 'rangePicker']),
    label: PropTypes.string,
    span: PropTypes.number,
    noFormItemLayout: PropTypes.bool,
    formItemKey: PropTypes.string.isRequired,
    decoratorOpt: PropTypes.object,
  })),
  onSearch: PropTypes.func,
  onReset: PropTypes.func,
};

FormScopeWrapper.defaultProps = {
  formClassName: 'antd-ext-form',
  gutter: 10,
  btnSpan: 8,
  needBtnGroup: true,
  formItemList: [],
  onSearch: () => { },
  onReset: () => { },
};

export default FormScopeWrapper;
