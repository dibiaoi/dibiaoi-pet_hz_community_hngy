import {
  getUserPage
} from '@/request/api.js'

export default {
  namespaced: true,
  state: {
    notificationList: [],
    systemList: [],
    followList: [],
    collectList: [],
    remarkList: [],
    likeList: [],
    adoptList: [],
    petHelpList: [],
    newsList: []
  },
  mutations: {},
  getters: {
    notificationList(state) {
      return state.notificationList
    },
    followList(state) {
       return state.followList
    }
  },
  actions: {
    spliceArr({
      commit,
      state
    }, res) {
      const {
        notificationList,
        List
      } = res
      state.systemList = List.systemList
      state.followList = List.followList
      state.collectList = List.collectList
      state.remarkList = List.remarkList
      state.likeList = List.likeList
      state.adoptList = List.adoptList
      state.petHelpList = List.petHelpList
      state.notificationList = notificationList
      state.newsList = List.newsList
    },
    update({
      commit,
      state
    }, res) {
      console.log(res);
      let totalList = state.notificationList.map(val => {
        if (val.status_hz == 0) {
          val.status_hz = 1
        }
        if (val.id !== res.msgId) {
          return {
            val
          }
        }
      });
      state.notificationList = totalList
      if (res.name) {
        switch (res.name) {
          case '收藏':
            state.collectList = res.list
            break;
          case '关注':
            state.followList = res.list
            break;
          case '点赞':
            state.likeList = res.list
            break;
          case '留言':
            state.remarkList = res.list
            break;
          case '领养':
            state.adoptList = res.list
            break;
          case '众筹':
            state.petHelpList = res.list
            break;
          case '资讯':
            state.newsList = res.list
            break;

          default:
            break;
        }
      }
    },
    getUserInfo({
      commit
    }, userId) {
      return new Promise((resolve, reject) => {
        getUserPage(userId).then(
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