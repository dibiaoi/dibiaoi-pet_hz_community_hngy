// import axios from 'axios'
import { focusUserList, focusUser, fanUserList } from '@/request/api'
export default {
  namespaced: true,
  state: {
    focusUserList: [],
    focusTotalCount: 0,
    fansUserList: [],
    fansTotalCount: 0,
    userFocus: ''
  },
  mutations: {
    changeFocus(state, str) {
      state.userFocus = str
    },
    getFocusListSuccess(state, data) {
      console.log(data)
      state.focusTotalCount = data.count
      state.focusUserList = data.results
      console.log(state.focusUserList)
    },
    getFansListSuccess(state, data) {
      state.fansTotalCount = data.count
      state.fansUserList = data.results
    }
  },
  actions: {
    getFocusUserList({ commit }, info) {
      focusUserList({
        params: {
          limit: info.limit,
          offset: info.offset
        }
      }).then(
        res => {
          commit('getFocusListSuccess', res.data)
        }
        // err => {}
      )
    },
    userFocusMethod({ commit }, info) {
      const data = {
        cancel: info.isCancel
      }

      focusUser({ id: info.id }, data).then(res => {
        info.isCancel === true ? commit('changeFocus', '未关注') : commit('changeFocus', '已关注')
      })
    },
    getFanUserList({ commit }, info) {
      fanUserList({
        params: {
          limit: info.limit,
          offset: info.offset
        }
      }).then(
        res => {
          commit('getFansListSuccess', res.data)
        }
        // err => {}
      )
    }
  }
}
