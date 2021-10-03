import { userDonatePetHelp, supportUserList } from '@/request/api'
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    userDonatePetHelp({ commit }, data) {
      return new Promise((resolve, reject) => {
        userDonatePetHelp(data).then(
          res => {
            resolve(res)
          },
          err => {
            reject(err)
          }
        )
      })
    },
    supportUserList({ commit }, query) {
      return new Promise((resolve, reject) => {
        supportUserList({ params: query }).then(
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
