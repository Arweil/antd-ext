export function getLayoutElement(formId?: string): HTMLElement {
  if (formId) {
    formId = formId.replace(/(^\s*)|(\s*$)/g, '');

    return document.querySelector(`#${formId}`) || document.body;
  } else {
    return document.body;
  }
}

// 检查组件类型为类型 <T>
export function checkCompType<T>(params: any, type: string): params is T {
  return params.formItemType === type;
}
