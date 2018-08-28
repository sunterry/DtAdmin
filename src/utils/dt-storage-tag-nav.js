import storage from 'best-storage'

/**
 * @description 本地获取tag缓存的标签
 * @returns {Array}
 */
export const getTagNavListFromLocalStorage = () => {
  const arr = storage.get('tagNavList')
  return arr ? JSON.parse(arr) : []
}
/**
 * @description 设置tag标签到本地
 * @param arr
 */
export const setTagNavListFromLocalStorage = arr => storage.set('tagNavList', JSON.stringify(arr))
