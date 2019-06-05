import { checkForm } from '../FormExt';
import DynamicFormFields, { formkeys, DynamicFormScope, FieldConf, AddedField } from './DynamicFormFields';

export default DynamicFormFields;

export { formkeys, AddedField, FieldConf, DynamicFormScope };

// 过滤字段，返回表单值
export async function getFilterFormValues(formInstanceList: DynamicFormScope[]) {
  const res = await checkForm(formInstanceList);
  if (res.success) {
    const result: { [key: string]: number | string | undefined } = {};
    Object.keys(res.values).forEach((key) => {
      if (key !== formkeys) {
        result[key] = res.values[key];
      }
    });
    return {
      success: res.success,
      values: result,
    };
  }

  return res;
}

// 设置表单项的值
export function setFormItemValue(formInstance: DynamicFormScope, newField: FieldConf) {
  const form = formInstance.props.form;
  let fieldList: FieldConf[] = form.getFieldValue(formkeys);

  const index = fieldList.findIndex((field) => {
    return field.field === newField.field;
  });

  fieldList.splice(index, 1, newField);

  form.setFieldsValue({
    [formkeys]: fieldList,
  });
}
