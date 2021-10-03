import { createPetHelp, deletePetHelp, getPetHelp, editPetHelp } from '@/request/api'
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    createPetHelp({ commit }, data) {
      return new Promise((resolve, reject) => {
        createPetHelp(data).then(
          res => {
            resolve(res)
          },
          err => {
            reject(err)
          }
        )
      })
    },
    deletePetHelp({ commit }, id) {
      return new Promise((resolve, reject) => {
        deletePetHelp(id).then(
          res => {
            console.log(res.data)
            resolve(res.data)
          },
          err => {
            console.log(err)
            reject(err)
          }
        )
      })
    },
    getPetHelp({ commit }, id) {
      return new Promise((resolve, reject) => {
        getPetHelp(id).then(
          res => {
            resolve(res.data)
          },
          err => {
            reject(err)
          }
        )
      })
    },
    editPetHelp({ commit }, id, data) {
      return new Promise((resolve, reject) => {
        editPetHelp(id, data).then(
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
