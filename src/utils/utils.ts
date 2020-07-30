// 获取一个随机id
export function getRandomId(): string {
  return `${new Date().getTime()}${Math.random().toString().slice(-6)}`;
}
