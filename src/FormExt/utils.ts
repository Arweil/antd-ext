export function getLayoutElement(formClassName: string): HTMLElement {
  formClassName = formClassName.replace(/(^\s*)|(\s*$)/g, '');
  const arrformQueryClass = formClassName.split(' ').map((item) => {
    return `.${item}`;
  });

  // 如果只有默认的className那么默认返回
  if (arrformQueryClass.length === 1 && arrformQueryClass.includes('antd-ext-form')) {
    return document.body;
  } else {
    return document.querySelector(arrformQueryClass.join('')) || document.body;
  }
}

// 检查组件类型为类型 <T>
export function checkCompType<T>(params: any, type: string): params is T {
  return params.formItemType === type;
}
