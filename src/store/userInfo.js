// import baseRequest from '@/request/baseRequest'
import {
  adminLoginRequest,
  autoLoginRequest,
  loginRequest,
  adminAutoLogin,
  hospitalAutoLogin,
  hospitalLoginRequest
} from '@/request/api'
import { message } from '@/plugins/element'

export default {
  namespaced: true,
  state: {
    adminInfo: JSON.parse(localStorage.getItem('adminInfo')) || {},
    hospitalInfo: JSON.parse(localStorage.getItem('hospitalInfo')) || {},
    userState: localStorage.getItem('userState'),
    userInformation: JSON.parse(localStorage.getItem('userInformation')),
    userToken: '' || localStorage.getItem('userToken'),
    role: localStorage.getItem('role'),
    roles: null
  },
  mutations: {
    adminInfo(state, info) {
      state.adminInfo = info.data
      localStorage.setItem('adminInfo', JSON.stringify(info.data))
      localStorage.setItem('role', info.role)
      state.roles = [info.role]
      state.role = info.role
    },
    hospitalInfo(state, info) {
      state.hospitalInfo = info.data
      localStorage.setItem('hospitalInfo', JSON.stringify(info.data))
      localStorage.setItem('role', info.role)
      state.roles = [info.role]
      state.role = info.role
    },
    autoLoginSuccess(state, info) {
      state.userState = true
      localStorage.setItem('userToken', info.token)
      state.userToken = info.token
      console.log(state.userToken)
      localStorage.setItem('userState', true)
      // permission.dispatch('GenerateRoutes', state.role)
    },

    autoLoginLose(state, info) {
      state.userState = false
      localStorage.setItem('userState', false)
      state.role = ''
      localStorage.setItem('role', '')
      this.userToken = ''
      localStorage.setItem('userToken', '')

      if (!info) {
        message({
          message: '当前未登录',
          type: 'info'
        })
      }
    },
    AutoGetUserInfoSuccess(state, info) {
      var user = info.user.data
      // 获取用户信息成功，同步到localStorage

      if (info.role[0] === 'hospital') {
        state.hospitalInfo = user
        localStorage.setItem('hospitalInfo', JSON.stringify(user))
      } else {
        state.userInformation = user
        localStorage.setItem('userInformation', JSON.stringify(user))
      }

      localStorage.setItem('role', info.role)

      state.roles = [info.role]
      state.role = info.role

      console.log(state.role)
      console.log(state.roles)
    },
    getUserInfoSuccess(state, info) {
      let user = info.user.data
      // 获取用户信息成功，同步到localStorage
      console.log(user)

      localStorage.setItem('userInformation', JSON.stringify(user))
      let _role = ''
      if (user.identity_hz === 2) {
        _role = 'volunteer'
      } else {
        _role = 'user'
      }
      state.role = _role
      state.roles = [_role]
      console.log(state.role)
      localStorage.setItem('role', _role)

      console.log(state.userInformation)
    }
  },
  actions: {
    getUserInfo({ commit }, info) {
      const data = {
        phone_hz: info.name,
        password_hz: info.psd
      }

      return new Promise((resolve, reject) => {
        loginRequest(data)
          .then(res => {
            console.log(res)
            commit('getUserInfoSuccess', {
              user: res
            })
            commit('autoLoginSuccess', {
              token: res.data.token
            })

            resolve(res.status)
          })
          .catch(err => {
            console.log(err)
            console.log(err.status)
            commit('autoLoginLose', {
              status: err.status
            })
            reject(err.status)
          })
      })
    },
    autoLogin({ commit, state }) {
      const resSuccess = info => {
        const { res, role } = info
        console.log(res)
        commit('AutoGetUserInfoSuccess', {
          user: res,
          role
        })
        commit('autoLoginSuccess', {
          token: res.data.token
        })
      }

      autoLoginRequest().then(
        res => {
          console.log(res)
          console.log('-----------------')
          // 如果请求成功则状态为真
          if (res.data.identity_hz === '志愿者') {
            resSuccess({ res, role: ['volunteer'] })
          } else {
            resSuccess({ res, role: ['user'] })
          }
        },
        err => {
          console.log(err.status + '用户自动登陆失败，尝试管理员。。。')
          if (err.status === 401) {
            /**如果用户token错误则测试管理员token接口 */
            adminAutoLogin().then(
              res => {
                resSuccess({ res, role: ['admin'] })
                console.log('管理员登录成功')
                message({
                  message: '医院登录成功',
                  type: 'success'
                })
              },
              err => {
                console.log(err.status + '管理员自动登陆失败，尝试医院。。。')
                /**如果用户token错误则测试管理员token接口 */
                if (err.status === 401) {
                  hospitalAutoLogin().then(
                    res => {
                      message({
                        message: '医院登录成功',
                        type: 'success'
                      })
                      resSuccess({ res, role: ['hospital'] })
                    },
                    err => {
                      console.log(err.status + '医院自动登陆失败，登录已过期')
                      commit('autoLoginLose')
                    }
                  )
                }
              }
            )
          }
        }
      )
    },
    loginAdmin({ commit }, info) {
      return new Promise((resolve, reject) => {
        adminLoginRequest(info).then(
          res => {
            resolve(res)
            commit('adminInfo', { data: res.data, role: ['admin'] })
            commit('autoLoginSuccess', {
              token: res.data.token
            })
          },
          err => {
            reject(err)
          }
        )
      })
    },
    loginHospital({ commit }, info) {
      return new Promise((resolve, reject) => {
        hospitalLoginRequest(info).then(
          res => {
            resolve(res)
            commit('hospitalInfo', { data: res.data, role: ['hospital'] })
            commit('autoLoginSuccess', {
              token: res.data.token
            })
          },
          err => {
            reject(err)
          }
        )
      })
    }
  },
  modules: {}
}
