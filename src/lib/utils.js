/**
 * @description 回调函数的执行次数
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 * @author Duantong
 */
export const doCustomTimes = (times, callback) => {
  let i = -1;
  while (++i < times) {
    callback(i);
  }
};

/**
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @author Duantong
 */
export const objEqual = (obj1, obj2) => {
  const keysArr1 = Object.keys(obj1);
  const keysArr2 = Object.keys(obj2);
  if (keysArr1.length !== keysArr2.length) return false;
  else if (keysArr1.length === 0 && keysArr2.length === 0) return true;
  /* eslint-disable-next-line */
  else return !keysArr1.some(key => obj1[key] !== obj2[key]);
};
