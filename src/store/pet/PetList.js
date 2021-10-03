import { petList } from '@/request/api'
export default {
  namespaced: true,
  state: {
    petList: [],
    petCount: 0
  },
  mutations: {
    getPetListSuccess(state, data) {
      const { results, petCount } = data
      state.petList = results
      state.petCount = petCount
    }
  },
  actions: {
    getPetList({ commit }, data) {
      const { sex_hz, race_hz, search, ordering, page, size } = data
      petList({
        params: { page, size, sex_hz, race_hz, search, ordering }
      }).then(res => {
        console.log(res)
        commit('getPetListSuccess', {
          results: res.data.results,
          petCount: res.data.count
        })
      })
    },
    getPetAll({ commit }) {
      return new Promise((resolve, reject) => {
        petList().then(
          res => {
            resolve(res.data.results)
          },
          err => {
            reject(err)
          }
        )
      })
    }
  }
}
