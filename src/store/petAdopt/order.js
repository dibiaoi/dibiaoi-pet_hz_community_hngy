import { getOrderList, getOrderInfo } from '@/request/api'
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getMyOrderList({ commit }, data) {
      return new Promise((resolve, reject) => {
        getOrderList({ params: data }).then(
          res => {
            resolve(res.data)
          },
          err => {
            reject(err)
          }
        )
      })
    },
    getOrder({ commit }, id) {
      return new Promise((resolve, reject) => {
        getOrderInfo(id).then(
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
