import { patchHospitalInfo } from '@/request/api.js'
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    patchHospitalInfo({ commit }, info) {
      return new Promise((resolve, reject) => {
        patchHospitalInfo(info).then(
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
