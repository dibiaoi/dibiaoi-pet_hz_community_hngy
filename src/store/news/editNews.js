import { getNewsList, getNewsById, deleteNews } from '@/request/api.js'
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getNewsById({ commit }, id) {
      return new Promise((resolve, reject) => {
        getNewsById(id).then(
          res => {
            resolve(res.data)
          },
          err => {
            reject(err)
          }
        )
      })
    },
    getNewsList({ commit }, info) {
      return new Promise((resolve, reject) => {
        getNewsList({ params: info }).then(
          res => {
            resolve(res.data)
          },
          err => {
            reject(err)
          }
        )
      })
    },
    delNews({ commit }, id) {
      return new Promise((resolve, reject) => {
        deleteNews(id).then(
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
