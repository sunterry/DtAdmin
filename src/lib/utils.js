import storage from 'best-storage';


/**
 * @description 回调函数的执行次数
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 * @author Duantong
 */
export const doCustomTimes = (times, callback) => {
  let i = -1;
  /* eslint-disable-next-line */
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

/**
 * @description 本地存储和获取标签导航列表
 * @author Duantong
 */
export const setTagNavListInLocalstorage = (list) => {
  console.log(list);
  storage.set('tagNavList', JSON.stringify(list));
};

/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 * @author Duantong
 */
export const getTagNavListFromLocalstorage = () => {
  const list = storage.get('tagNavList');
  return list ? JSON.parse(list) : [];
};

/**
 * @description 判断现有的tag中的路由列表是否已经存在，如果该newRoute已经存在则不再添加
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @return [newList]
 * @author Duantong
 */
export const getNewTagList = (list, newRoute) => {
  const { name, path, meta } = newRoute;
  const newList = [...list];
  if (newList.findIndex(item => item.name === name) >= 0) return newList;
  newList.push({ name, path, meta });
  return newList;
};
