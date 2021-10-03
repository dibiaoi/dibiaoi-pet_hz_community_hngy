import { sendVerification, registerUser } from '@/request/api'
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    sendVerification({ commit }, info) {
      try {
        const data = {
          phone_hz: info.phone
        }
        return new Promise((resolve, reject) => {
          sendVerification(data).then(
            res => {
              resolve(res.status)
            },
            err => {
              reject(err.status)
            }
          )
        })
      } catch (error) {}
    },
    registerUser({ commit }, info) {
      try {
        const data = {
          phone_hz: info.phone,
          nickname_hz: info.nickname,
          password_hz: info.psd,
          code: info.code
        }
        return new Promise((resolve, reject) => {
          registerUser(data).then(
            res => {
              resolve(res.data)
            },
            err => {
              reject(err)
            }
          )
        })
      } catch (error) {}
    }
  },
  modules: {}
}
