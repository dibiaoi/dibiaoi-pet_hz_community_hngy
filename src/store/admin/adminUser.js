import { getAllUserList, examine } from '@/request/api'
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getAllUser({ commit }, data) {
      return new Promise((resolve, reject) => {
        getAllUserList({ params: data }).then(
          res => {
            resolve(res.data)
          },
          err => {
            reject(err)
          }
        )
      })
    },
    examine({ commit }, info) {
      const { id, model } = info
      const { pass } = info
      examine(id, model, { pass }).then(
        res => {
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )
    }
  }
}
