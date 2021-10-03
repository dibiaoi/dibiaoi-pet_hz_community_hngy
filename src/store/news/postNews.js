import { getAllLabel, addTag, delTag, publishNews, editNews } from '@/request/api.js'
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    // tag和label一样
    getAllLabel({ commit }, info) {
      return new Promise((resolve, reject) => {
        getAllLabel().then(
          res => {
            resolve(res.data)
          },
          err => {
            reject(err)
          }
        )
      })
    },
    addTag({ commit }, info) {
      return new Promise((resolve, reject) => {
        addTag(info).then(
          res => {
            resolve(res)
          },
          err => {
            reject(err)
          }
        )
      })
      // addTag(info).then(res => { console.log(res); }, err => { console.log(err); })
    },
    delTag({ commit }, info) {
      const { id } = info
      return new Promise((resolve, reject) => {
        delTag(id).then(
          res => {
            resolve(res)
          },
          err => {
            reject(err)
          }
        )
      })
    },
    publishNew({ commit }, info) {
      console.log(info)
      const { title_hz, Introduction_hz, content_hz, label_hz } = info
      return new Promise((resolve, reject) => {
        publishNews({ title_hz, Introduction_hz, content_hz, label_hz }).then(
          res => {
            resolve(res)
          },
          err => {
            reject(err)
          }
        )
      })
    },
    editNews({ commit }, info) {
      console.log(info)
      const { newsId, data } = info
      return new Promise((resolve, reject) => {
        editNews(newsId, data).then(
          res => {
            resolve(res)
          },
          err => {
            reject(err)
          }
        )
      })
    }
  }
}
