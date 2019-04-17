export function getLayoutElement(formClassName: string): HTMLElement {
  const arrformQueryClass = formClassName.split(' ').map((item) => {
    return `.${item}`;
  });

  console.log(arrformQueryClass, arrformQueryClass.length === 1 && arrformQueryClass.includes('antd-ext-form'));

  // 如果只有默认的className那么默认返回
  if (arrformQueryClass.length === 1 && arrformQueryClass.includes('.antd-ext-form')) {
    return document.body;
  } else {
    return document.querySelector(arrformQueryClass.join('')) || document.body;
  }
}