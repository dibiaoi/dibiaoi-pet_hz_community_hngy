// import { userAvatar } from '@/request/api.js'

export default {
  namespaced: true,
  state: {
    allChatList: [],
    userChatList: []
  },
  mutations: {},
  actions: {
    addToList({ commit, state }, msg) {
      state.allChatList.push(msg)

      const val = state.userChatList.find(item => {
        return item.chatId === msg.from + msg.to
      })

      const userInfo = JSON.parse(localStorage.getItem('userInformation'))
      if (!val && userInfo.id === msg.to) {
        state.userChatList.push({
          chatId: msg.from + msg.to,
          me: msg.to,
          meName: msg.toName,
          chatUser: msg.from,
          chatUserName: msg.fromName
        })
      } else if (!val && userInfo.id !== msg.from) {
        state.userChatList.push({
          chatId: msg.from + msg.to,
          me: msg.to,
          meName: msg.toName,
          chatUser: msg.from,
          chatUserName: msg.fromName
        })
      }
      console.log(state.userChatList)
      console.log(state.allChatList)
    }
  }
}
