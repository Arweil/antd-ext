import './style';
import FormExt, { FormScope } from './FormExt';

// 表单验证
export async function checkForm(formInstanceList: FormScope[]) {
  if (Object.prototype.toString.call(formInstanceList) !== '[object Array]') {
    return {
      success: false,
      msg: '参数不是数组',
    };
  }

  const promiseNeedCheckedList = formInstanceList.map((formInstance) => {
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
      return {
        ...accumulator,
        ...currentValue,
      };
    });
    return {
      success: true,
      values,
    };
  } catch (error) {
    return {
      success: false,
      msg: '校验失败',
    };
  }
}

// 还原表单至 initialValue
export async function resetForm(formInstanceList: FormScope[]) {
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
  }
}

export default FormExt;

export { FormScope };
