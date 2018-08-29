import {serverLogin} from '@/http'
import {setStorage, getStorage, removeStorage} from '@/utils/dt-storage'
import deCodeToken from '@/utils/dt-resolution-token'
import {SET_TOKEN, SET_USER_INFO, GET_USER_ERR, SET_USER_AHTH} from './../types'

export default {
  state: {
    token: getStorage('token'),
    userinfo: {},
    isAuth: false,
    err: {},
    access: ''
  },
  actions: {
    handleLogin ({commit}, {username, password}) {
      username = username.trim()
      return new Promise((resolve, reject) => {
        serverLogin({user_name: username, password}).then(res => {
          commit(SET_TOKEN, res.token)
          resolve(res.token)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getUserInfo ({commit, state}) {
      return new Promise((resolve, reject) => {
        if (state.token) {
          const userinfo = deCodeToken(state.token)
          commit(SET_USER_INFO, Object.assign({}, userinfo))
          commit(SET_USER_AHTH, ['admin', 'super_admin'])
          const user = {
            userinfo,
            access: ['admin', 'super_admin']
          }
          resolve(user)
        } else {
          const ERR = {code: 401, msg: '登录失败'}
          commit(GET_USER_ERR, ERR)
          commit(SET_TOKEN, '')
          reject(ERR)
        }
      })
    },
    handleLogOut ({commit}) {
      return new Promise((resolve, reject) => {
        commit(SET_TOKEN, '')
        commit(SET_USER_INFO, {})
        commit(SET_USER_AHTH, [])
        removeStorage('token')
        resolve()
      })
    }
  },
  mutations: {
    [SET_TOKEN] (state, token) {
      state.token = token
      setStorage('token', token)
    },
    [SET_USER_INFO] (state, userinfo) {
      state.isAuth = true
      state.userinfo = userinfo
      state.err = null
    },
    [SET_USER_AHTH] (state, access) {
      state.access = [...access]
    },
    [GET_USER_ERR] (state, err) {
      state.isAuth = false
      state.userinfo = null
      state.err = err
    }
  },
  getters: {
    userinfo (state) {
      return state.userinfo
    },
    access (state) {
      return state.access
    }
  }
}
