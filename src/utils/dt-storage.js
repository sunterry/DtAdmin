import storage from 'best-storage'

export const setStorage = (key, token) => {
  return storage.set(key, token)
}
export const getStorage = (token) => {
  return storage.get(token) ? storage.get(token) : ''
}
export const removeStorage = (token) => {
  return storage.remove(token)
}
