import { delAdopt, editAdopt, userAdopt } from '@/request/api'
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    deleteAdopt({ commit }, id) {
      return new Promise((resolve, reject) => {
        delAdopt(id).then(
          res => {
            resolve(res)
          },
          err => {
            reject(err)
          }
        )
      })
    },
    editAdopt({ commit }, data) {
      const { title_hz, description_hz, requirements_hz, id } = data
      return new Promise((resolve, reject) => {
        editAdopt(id, { title_hz, description_hz, requirements_hz }).then(
          res => {
            resolve(res)
          },
          err => {
            reject(err)
          }
        )
      })
    },
    userAdopt({ commit }, data) {
      const { id, is_pass } = data
      return new Promise((resolve, reject) => {
        userAdopt(id, { is_pass }).then(
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
