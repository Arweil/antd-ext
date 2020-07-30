import './style';
import _ from 'lodash';
import { FormComponentProps } from 'antd/lib/form';
import FormExt, { FormScope } from './FormExt';

// 表单验证
export async function checkForm<
  T extends { [key: string]: any },
  FormInstance extends React.Component<FormComponentProps>
>(formInstanceList: FormInstance[]): Promise<{
  success: true;
  values: T;
} | {
  success: false;
  msg: string;
  error?: Error;
}> {
  if (Object.prototype.toString.call(formInstanceList) !== '[object Array]') {
    return {
      success: false,
      msg: '参数不是数组',
    };
  }

  const promiseNeedCheckedList: Promise<T>[] = formInstanceList.map((formInstance) => {
    return new Promise((resolve, reject) => {
      formInstance.props.form.validateFields((errors, values) => {
        // 如果没有错误
        if (!errors) {
          resolve(values);
        } else {
          reject(errors);
        }
      });
    });
  });

  try {
    const result = await Promise.all(promiseNeedCheckedList);
    const values = result.reduce((accumulator, currentValue) => {
      return _.merge(accumulator, currentValue);
    });
    return {
      success: true,
      values,
    };
  } catch (error) {
    return {
      error,
      success: false,
      msg: '校验失败',
    };
  }
}

// 获取表单数据，不验证
export function getFormValue(formInstanceList: FormScope[]): {
  [field: string]: any;
} {
  if (Object.prototype.toString.call(formInstanceList) !== '[object Array]') {
    return {
      success: false,
      msg: '参数不是数组',
    };
  }

  const result = formInstanceList.map(item => item.props.form.getFieldsValue());

  const values = result.reduce((accumulator, currentValue) => {
    return _.merge(accumulator, currentValue);
  });

  return values;
}

// 还原表单至 initialValue
export async function resetForm(formInstanceList: FormScope[]): Promise<{
  success: boolean;
  msg: string;
} | {
  success: boolean;
  msg?: undefined;
}> {
  if (Object.prototype.toString.call(formInstanceList) !== '[object Array]') {
    return {
      success: false,
      msg: '参数不是数组',
    };
  }

  formInstanceList.forEach((formInstance) => {
    formInstance.props.form.resetFields();
  });

  return {
    success: true,
  };
}

export function filterNullInFormList(formInstanceList: (FormScope | null)[]): FormScope[] {
  function isFormScope(params: FormScope | null): params is FormScope {
    return params !== null;
  }

  // 过滤空的Form对象
  const finForm = formInstanceList.filter<FormScope>(isFormScope);

  return finForm;
}

export default FormExt;
export * from './format';
