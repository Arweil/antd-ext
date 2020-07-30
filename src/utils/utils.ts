import moment, { Moment, isMoment } from 'moment';

export const regMobilePhone = /^[1][3-9]\d{9}$/;
export const notNegativeNumber = /^\d+(\.{0,1}\d+){0,1}$/; // 非负数
export const regPositiveInteger = /^[1-9]\d*$/; // 正整数

export const makeList2Obj = (list: any[], key = 'code', value = 'name') => {
  const result: { [key: string]: string } = {};
  list.forEach((item) => {
    result[item[key]] = item[value];
  });
  return result;
};

export const makeObj2List = (obj: { [key: string]: any }, keyName = 'code', valueName = 'value') => {
  return Object.keys(obj).map((key) => {
    return {
      [keyName]: key,
      [valueName]: obj[key],
    }
  });
}

// 获取一个随机id
export const getRandomId = () => {
  return `${new Date().getTime()}${Math.random().toString().slice(-6)}`;
};

// 获取相差的天数
export const getDiffDates = (date1?: Moment, date2?: Moment) => {
  if (isMoment(date1) && isMoment(date2)) {
    return moment(date1.format('YYYY-MM-DD')).diff(moment(date2.format('YYYY-MM-DD')), 'd');
  } else {
    return 0;
  }
}

// 格式化银行账号，4位分割
// XXXXXXXXXX => XXXX XXXX XX
export const formatBankNum = (val: string) => {
  return val.replace(/\s/g, '').replace(/[0-9]{4}/g, '$& ').trimRight();
}

/**
 * 输入转为数字与.(只能包含一个.)的正数
 * 入参 -0.123  return 0.123
 * 入参 0.123.123  return 0.123123
 * 入参 011  return 11
 */
export function inputNumber(args: string, fixedNumber?: number) {
  if (Object.prototype.toString.call(args) !== '[object String]') {
    return '';
  }
  let result = args;
  // 先把非数字的都替换掉，除了数字和.
  result = result.replace(/[^\d\.]/g, '');
  // 必须保证第一个为数字而不是.
  result = result.replace(/^\./g, '');
  // 保证只有出现一个.而没有多个.
  result = result.replace(/\.{2,}/g, '.');
  // 保证.只出现一次，而不能出现两次以上
  result = result
    .replace('.', '$#$')
    .replace(/\./g, '')
    .replace('$#$', '.');
  // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
  if (result.indexOf('.') < 0 && result != '') {
    result = parseFloat(result) + '';
  }

  if (fixedNumber !== undefined
    && result.indexOf('.') > -1
    && (result.length - result.indexOf('.') - 1 > fixedNumber)) {
    result = Number(result).toFixed(fixedNumber);
  }

  return result;
}


/**
 * 格式化为 X天X时X分
 * @param ms 毫秒
 */
export function formatTime(ms?: number) {
  const _ms = ms || 0;
  const time = moment.duration(Math.abs(_ms), 'ms');
  // 天
  const d = Math.floor(time.asDays());
  // 时
  const h = time.hours();
  // 分
  const m = time.minutes();
  return `${_ms < 0 ? '-' : ''}${d}天${h}小时${m}分`;
}

/**
 * 格式化为 X时X分
 * @param ms 毫秒
 */
export function formatTimeHours(ms?: number) {
  const _ms = ms || 0;
  const time = moment.duration(Math.abs(_ms), 'ms');
  // 时
  const h = Math.floor(time.asHours());
  // 分
  const m = time.minutes();
  return `${_ms < 0 ? '-' : ''}${h}小时${m}分`;
}

// 从身份证号获取生日和性别
export function getBirthdayAndSexFromIDCard(card: string) {
  let num = card.toUpperCase();
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
  if (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num)) {
    return {};
  }
  // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
  // 下面分别分析出生日期和校验位
  let len, re;
  let birthday, sex;
  len = num.length;
  if (len === 15) {
    // 获取出生日期
    birthday = `19${card.substring(6, 8)}-${card.substring(8, 10)}-${card.substring(10, 12)}`;
    // 获取性别
    sex = parseInt(card.substr(14, 1)) % 2 === 1 ? 'M' : 'F';

    re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
    const arrSplit = num.match(re);

    if (!arrSplit) {
      return {};
    }

    // 检查生日日期是否正确
    const dtmBirth = new Date(`19${arrSplit[2]}/${arrSplit[3]}/${arrSplit[4]}`);
    
    const bGoodDay =
      dtmBirth.getFullYear() === (Number(arrSplit[2]) + 1900) &&
      dtmBirth.getMonth() + 1 === Number(arrSplit[3]) &&
      dtmBirth.getDate() === Number(arrSplit[4]);
    if (!bGoodDay) {
      console.warn('身份证号码出生日期不正确');
      return {};
    }
  } else if (len === 18) {
    // 获取出生日期
    birthday = `${card.substring(6, 10)}-${card.substring(10, 12)}-${card.substring(12, 14)}`;
    // 获取性别
    sex = parseInt(card.substr(16, 1)) % 2 === 1 ? 'M' : 'F';

    re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
    const arrSplit = num.match(re);

    if (!arrSplit) {
      return {};
    }

    // 检查生日日期是否正确
    const dtmBirth = new Date(`${arrSplit[2]}/${arrSplit[3]}/${arrSplit[4]}`);
    const bGoodDay =
      dtmBirth.getFullYear() === Number(arrSplit[2]) &&
      dtmBirth.getMonth() + 1 === Number(arrSplit[3]) &&
      dtmBirth.getDate() === Number(arrSplit[4]);
    if (!bGoodDay) {
      console.warn('身份证号码出生日期不正确');
      return {};
    }
  }
  return {
    birthday,
    sex,
  };
}

export function CommentCodeInHtml(selectors: string) {
  const element = document.querySelector(selectors);

  if (element) {
    element.innerHTML = `<!--${element.innerHTML}-->`;
  }
}

export function UnCommentCodeInHtml(selectors: string) {
  const element = document.querySelector(selectors);

  if (element) {
    let copyTxt = element.innerHTML;
    if (copyTxt.startsWith('<!--')) {
      copyTxt = copyTxt.slice(4);
    }

    if (copyTxt.endsWith('-->')) {
      copyTxt = copyTxt.substring(0, copyTxt.length - 4);
    }

    element.innerHTML = copyTxt;
  }
}
