// import axios from 'axios'
import { findBackPsdRequest, changePayPassword } from '@/request/api'
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    postNewPsd({ commit }, info) {
      const data = {
        phone_hz: info.phone,
        code: info.code,
        old_password_hz: info.oldPsd,
        new_password_hz: info.newPsd
      }
      return new Promise((resolve, reject) => {
        findBackPsdRequest(data).then(
          res => {
            resolve(res.data)
          },
          err => {
            reject(err)
          }
        )
      })
    },
    changePayPassword({ commit }, data) {
      return new Promise((resolve, reject) => {
        changePayPassword(data).then(
          res => {
            resolve(res.data)
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
