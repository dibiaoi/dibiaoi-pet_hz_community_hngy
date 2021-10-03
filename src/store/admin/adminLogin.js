import { getUserInfoAdmin, findAdminPsdBack } from '@/request/api'
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getUserInfoAdmin({ commit }, id) {
      return new Promise((resolve, reject) => {
        getUserInfoAdmin(id).then(
          res => {
            resolve(res.data)
          },
          err => {
            reject(err)
          }
        )
      })
    },
    findAdminPsdBack({ commit }, info) {
      return new Promise((resolve, reject) => {
        findAdminPsdBack(info).then(
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
