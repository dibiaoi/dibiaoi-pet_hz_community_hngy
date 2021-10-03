import { postComment, deleteComment } from '@/request/api.js'
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    postComment({ commit }, info) {
      const {
        commentId, model, content_hz, by_comment_hz
      } = info
      let data = {}
      if (by_comment_hz) {
        data = {
          content_hz,
          by_comment_hz
        }
      } else {
        data = {
          content_hz
        }
      }
      return new Promise((resolve, reject) => {
        postComment(commentId, model, data).then(res => {
          resolve(res.data);
        }, err => {
          reject(err);
        })
      })
    },
    delComment({ commit }, info) {
      const {
        id, model
      } = info
      return new Promise((resolve, reject) => {
        deleteComment(id, model).then(res => { resolve(res) }, err => { reject(err) })
      })
    }
  }
}