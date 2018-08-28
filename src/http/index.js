import _axios from './dt-axios.js'

export const serverLogin = (params) => {
  return _axios.post('/admin/login', params)
}
