import { acquireAllPetHelp, getPetHelpInfo } from '@/request/api'
export default {
  namespaced: true,
  state: {
    helpList: [],
    helpInfo: ''
  },
  mutations: {},
  actions: {
    acquireAllPetHelp({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        acquireAllPetHelp({ params: data }).then(
          res => {
            state.helpList = res.data.results
            resolve(res.data)
          },
          err => {
            reject(err)
          }
        )
      })
    },
    getPetHelpInfo({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        getPetHelpInfo(id).then(
          res => {
            resolve(res.data)
            state.helpInfo = res.data
          },
          err => {
            reject(err)
          }
        )
      })
    }
  }
}
