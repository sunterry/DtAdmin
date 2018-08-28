import axios from 'axios'

export const _axios = axios.create({
  baseURL: '/admin',
  responseType: 'json',
  headers: {'X-Requested-With': 'XMLHttpRequest'}
})

_axios.interceptors.request.use(config => {
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})
/**
 * 正常情况下， 服务器返回调用接口处理后只拿到处理后的数据
 * 如果发生错误，那么只返回 code 和 message
 */
_axios.interceptors.response.use(res => {
  const {data, status} = res
  if (status && status === 200) {
    const {code} = data
    if (code && code === 1000) {
      return data.data
    } else {
      const {code, msg} = data
      return {code, msg}
    }
  } else {
    return {
      status,
      message: '服务器未知错误'
    }
  }
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

export default _axios
