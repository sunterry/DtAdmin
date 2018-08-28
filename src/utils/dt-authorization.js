import _axios from '@/http/dt-axios'

const setAuthorizationToken = (token) => {
  if (token) {
    _axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete _axios.defaults.headers.common['Authorization']
  }
}

export default setAuthorizationToken
