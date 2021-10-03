import { getAdoptPostsList, getAdoptById } from '@/request/api'
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    getMyAdoptPosts({ commit }, data) {
      const {
        adopt_user_hz,
        user_hz,
        page,
        size,
        ordering,
        sex_hz,
        race_hz,
        search,
        city,
        area,
        state_hz
      } = data
      return new Promise((resolve, reject) => {
        getAdoptPostsList({
          params: {
            adopt_user_hz,
            user_hz,
            page,
            size,
            ordering,
            sex_hz,
            race_hz,
            search,
            city,
            area,
            state_hz
          }
        }).then(
          res => {
            resolve(res.data)
          },
          err => {
            reject(err)
          }
        )
      })
    },

    getAdoptById({ commit }, id) {
      return new Promise((resolve, reject) => {
        getAdoptById(id).then(
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
