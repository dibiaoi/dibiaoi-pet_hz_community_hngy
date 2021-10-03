import {
  getServiceList,
  editHospitalService,
  createService,
  getServiceInfo,
  delHospitalService
} from '@/request/api.js'
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getServiceList({ commit }, info) {
      return new Promise((resolve, reject) => {
        getServiceList({ params: info }).then(
          res => {
            resolve(res.data)
          },
          err => {
            reject(err)
          }
        )
      })
    },
    editHospitalService({ commit }, info) {
      const { id, data } = info
      editHospitalService(id, data).then(
        res => {
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )
    },
    createService({ commit }, data) {
      createService(data).then(
        res => {
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )
    },
    serviceInfo({ commit }, id) {
      return new Promise((resolve, reject) => {
        getServiceInfo(id).then(
          res => {
            resolve(res.data)
          },
          err => {
            reject(err)
          }
        )
      })
    },
    deleteService({ commit }, id) {
      return new Promise((resolve, reject) => {
        delHospitalService(id).then(
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
