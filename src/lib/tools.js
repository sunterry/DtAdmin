/**
 * @description 判断参数是否为目标数组之一
 * @param value
 * @param validList
 * @returns {boolean}
 */
export function oneOf(value, validList) {
  /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true;
    }
  }
  return false;
}

export const c = 10;
console.log(c);
