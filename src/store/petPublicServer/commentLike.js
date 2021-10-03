import { postCommentLike } from '@/request/api.js'
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    commentLike({ commit }, info) {
      const { commentId, model, cancel } = info
      return new Promise((resolve, reject) => {
        postCommentLike(commentId, model, { cancel }).then(
          res => {
            resolve(res.data);
          }, err => {
            reject(err);
          }
        )
      })
    }
  }
}
