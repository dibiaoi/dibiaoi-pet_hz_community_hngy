import { checkIsCollect, getCollectList, postCollect } from '@/request/api.js'
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    checkIsCollect({ commit }, data) {
      const { model, id } = data
      return new Promise((resolve, reject) => {
        checkIsCollect(id, model).then(
          res => {
            resolve(res)
          },
          err => {
            reject(err)
          }
        )
      })
    },
    getCollectList({ commit }, data) {
      const { model, page, size } = data
      return new Promise((resolve, reject) => {
        getCollectList(model, { params: { page, size } }).then(
          res => {
            resolve(res)
          },
          err => {
            reject(err)
          }
        )
      })
    },
    postCollect({ commit }, data) {
      const { cancel, model, id } = data
      return new Promise((resolve, reject) => {
        postCollect(id, model, { cancel }).then(
          res => {
            resolve(res)
          },
          err => {
            reject(err)
            console.log(err)
          }
        )
      })
    }
  }
}
