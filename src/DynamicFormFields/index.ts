import { checkForm } from '../FormExt';
import DynamicFormFields, { DynamicFormScope, formkeys, FieldConf } from './DynamicFormFields';

export default DynamicFormFields;

// 过滤字段，返回表单值
export async function getFilterFormValues(formInstanceList: DynamicFormScope[]): Promise<{
  success: false;
  msg: string;
  error?: Error;
} | {
  success: true;
  values: {
    [key: string]: any;
  };
}> {
  const res = await checkForm(formInstanceList);
  if (res.success) {
    const result: { [key: string]: any } = {};
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
export function setFormItemValue(formInstance: DynamicFormScope, newField: FieldConf): void {
  const { form } = formInstance.props;
  const fieldList: FieldConf[] = form.getFieldValue(formkeys);

  const index = fieldList.findIndex((field) => {
    return field.field === newField.field;
  });

  fieldList.splice(index, 1, newField);

  form.setFieldsValue({
    [formkeys]: fieldList,
  });
}
