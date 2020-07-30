// 供外部使用的表单数据格式化

import moment from 'moment';

// 检查组件类型为类型 <T>
function checkRangeDateType<T>(params: any): params is T {
  return params && params.length === 2;
}

/**
 * 格式化表单中的RangeDate，往往服务端需要的是两个字段，返回一个新的对象
 * @param searchResult Form表单内容
 * @param map 格式化结构
 */
export const formatSearchDate = <T extends { [key: string]: any }>(
  searchResult: T,
  map: { [P in keyof T]: [string, string] },
  formatStr: [string, string] = ['YYYY-MM-DD', 'YYYY-MM-DD'],
): { [key: string]: any } => {
  let result: { [key: string]: any } = {};

  // 为result先创建日期的格式化数据
  Object.keys(map).forEach((mapKey) => {
    const [fieldStart, fieldEnd] = map[mapKey];

    if (checkRangeDateType<[moment.Moment, moment.Moment]>(searchResult[mapKey])) {
      const [startDate, endDate] = searchResult[mapKey];

      result[fieldStart] = moment.isMoment(startDate) ? startDate.format(formatStr[0]) : undefined;
      result[fieldEnd] = moment.isMoment(endDate) ? endDate.format(formatStr[1]) : undefined;
    } else {
      result[fieldStart] = undefined;
      result[fieldEnd] = undefined;
    }
  });

  // 合并搜索内容
  result = {
    ...searchResult,
    ...result,
  };

  // 移除格式化前的字段
  Object.keys(map).forEach((mapKey) => {
    delete result[mapKey];
  });

  return result;
};

/**
 * 格式化表单中的Select，把 '全部' 选项的 key 格式化为 undefined，因为不传字段往往默认为全部，返回一个新的对象
 * @param searchResult Form表单内容
 * @param list 格式化结构
 */
export const formatSearchSelect = <T extends { [key: string]: any }>(
  searchResult: T,
  list: Array<keyof T>,
): { [key: string]: any } => {
  let result: any = {};
  list.forEach((item) => {
    result[item] = searchResult[item] === 'all' ? undefined : searchResult[item];
  });

  // 合并搜索内容
  result = {
    ...searchResult,
    ...result,
  };

  return result;
};
