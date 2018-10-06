/**
 * @description 判断参数是否为目标数组之一
 * @param value 目标数据
 * @param validList 要查找的数组
 * @returns {boolean}
 * @author Duantong
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

/**
 * @description 设置页面标题
 * @param title 网页title
 * @return undefined
 * @author Duantong
 */
export const setTitle = (title) => {
  document.title = title || 'DtAdmin后台管理系统';
};

/**
 * @description 判断要查询的数组是否至少有一个包含在目标数组中
 * @param target 目标数组
 * @param arr 需要查询的数组
 * @returns {boolean}
 * @author Duantong
 */
export const hasOneOf = (target, arr) => target.some(item => arr.indexOf(item) > -1);

/**
 * @description 数组去重
 * @param arr1
 * @param arr2
 * @returns {...*[]}
 * @author Duantong
 */
export const getUnion = (arr1, arr2) => Array.from(new Set([...arr1, ...arr2]));
