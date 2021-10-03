import { createPetAdopt, adoptDefine } from '@/request/api'
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    createPetAdopt({ commit }, data) {
      console.log(data)
      return new Promise((resolve, reject) => {
        createPetAdopt(data).then(
          res => {
            resolve(res)
          },
          err => {
            reject(err)
          }
        )
      })
    },
    adoptDefine({ commit }, info) {
      const { state, id } = info
      const data = {
        is_pass: state
      }
      return new Promise((resolve, reject) => {
        adoptDefine(id, data).then(
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
