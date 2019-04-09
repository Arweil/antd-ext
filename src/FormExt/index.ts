import './style';
import FormExt from './FormExt';

// 表单验证
// export async function checkForm(formRefList) {
//   if (Object.prototype.toString.call(formRefList) !== '[object Array]') {
//     return {
//       success: false,
//       msg: '参数不是数组',
//     };
//   }

//   const promiseNeedCheckedList = formRefList.map((formRef) => {
//     return new Promise((resolve, reject) => {
//       formRef.props.form.validateFields((errors, values) => {
//         // 如果没有错误
//         if (!errors) {
//           resolve(values);
//         } else {
//           reject(errors);
//         }
//       });
//     });
//   });

//   try {
//     const result = await Promise.all(promiseNeedCheckedList);
//     const values = result.reduce((accumulator, currentValue) => {
//       return {
//         ...accumulator,
//         ...currentValue,
//       };
//     });
//     return {
//       success: true,
//       values,
//     };
//   } catch (error) {
//     return {
//       success: false,
//       msg: '校验失败',
//     };
//   }
// }

// // 还原表单至 initialValue
// export async function resetForm(formRefList) {
//   if (Object.prototype.toString.call(formRefList) !== '[object Array]') {
//     return {
//       success: false,
//       msg: '参数不是数组',
//     };
//   }

//   formRefList.forEach((formRef) => {
//     formRef.props.form.resetFields();
//   });
// }

export default FormExt;
