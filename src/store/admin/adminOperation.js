import { examine, rejectIdentity, adoptDetermine, petHelpSendMoney } from '@/request/api'
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    examine({ commit }, info) {
      const { id, model } = info
      const { pass, publish_time_hz } = info
      return new Promise((resolve, reject) => {
        examine(id, model, { pass, publish_time_hz }).then(
          res => {
            resolve(res.data)
          },
          err => {
            reject(err)
          }
        )
      })
    },
    rejectIdentity({ commit }, info) {
      const { id, model } = info
      const { content } = info
      return new Promise((resolve, reject) => {
        rejectIdentity(id, model, { content }).then(
          res => {
            resolve(res.data)
          },
          err => {
            reject(err)
          }
        )
      })
    },
    petAdoptDetermine({ commit }, info) {
      const { id, is_pass } = info
      return new Promise((resolve, reject) => {
        adoptDetermine(id, { is_pass }).then(
          res => {
            resolve(res.data)
          },
          err => {
            reject(err)
          }
        )
      })
    },
    petHelpSendMoney({ commit }, info) {
      const { id, is_pass, content, time_hz } = info
      let data = ''
      if (is_pass === true) {
        data = { is_pass, time_hz }
      } else {
        data = { is_pass, content }
      }
      return new Promise((resolve, reject) => {
        petHelpSendMoney(id, data).then(
          res => {
            resolve(res.data)
          },
          err => {
            reject(err)
          }
        )
      })
    }
  }
}
