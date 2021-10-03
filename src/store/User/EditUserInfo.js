import {
  modify,
  authentication,
  volunteer
} from '@/request/api'
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    patchUserInfo({
      commit
    }, info) {
      try {
        const data = {
          nickname_hz: info.nickname,
          sex_hz: info.sex,
          area_hz: info.area,
          introduction_hz: info.introduction
        }

        console.log(data)
        return new Promise((resolve, reject) => {
          modify(data).then(
            res => {
              console.log(res)
              // commit('changeEditUserInfoStatus', res.status)
              resolve(res.status)
            },
            error => {
              // commit('changeEditUserInfoStatus', error.response.status)
              reject(error.status)
            }
          )
        })
      } catch (error) {}
    },
    postAuthentication({
      commit
    }, info) {
      const data = {
        real_name_hz: info.realName,
        id_card_hz: info.idCardCode,
        code: info.code
      }

      return new Promise((resolve, reject) => {
        authentication(data).then(
          res => {
            resolve(res.data)
          },
          error => {
            reject(error)
          }
        )
      })
    },
    applyForVolunteer({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        volunteer().then(res => {
          resolve(res.data.code)
          //  state.changeApplyVolunteerCode = res.data.code
        })
      })
    }
  },
  modules: {}
}