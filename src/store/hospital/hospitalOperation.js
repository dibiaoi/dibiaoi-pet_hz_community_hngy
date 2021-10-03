import { registerHospital, getAllHospital, hospitalAuth, findHospitalPsdBack } from '@/request/api'
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    registerHospital({ commit }, data) {
      return new Promise((resolve, reject) => {
        registerHospital(data).then(
          res => {
            resolve(res.data)
          },
          err => {
            reject(err)
          }
        )
      })
    },
    getAllHospital({ commit }, data) {
      return new Promise((resolve, reject) => {
        getAllHospital({ params: data }).then(
          res => {
            resolve(res.data)
          },
          err => {
            reject(err)
          }
        )
      })
    },
    hospitalAuth({ commit }, data) {
      return new Promise((resolve, reject) => {
        hospitalAuth(data).then(
          res => {
            resolve(res.data)
          },
          err => {
            reject(err)
          }
        )
      })
    },
    changHospitalPsd({ commit }, data) {
      return new Promise((resolve, reject) => {
        findHospitalPsdBack(data).then(
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
