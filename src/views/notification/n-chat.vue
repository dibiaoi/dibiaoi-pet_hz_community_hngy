<template>
  <div class="chat-im">
    <div class="left">
      <div class="head">
        <span>近期消息</span>
      </div>
      <div class="list-ul ps">
        <div
          class="li-item"
          v-for="user in userChatList"
          :key="user.chatId"
          @click="chatTo(user.chatId, user.chatUser, user.chatUserName)"
        >
          <el-avatar :size="40" style="margin-right:8px;" :src="avatar(user.chatUser)"
            >user</el-avatar
          >
          <div class="name-box">
            <span class="nickname">{{ user.chatUserName }}</span>
          </div>
          <div class="notify notify-number" style="display:none;">1</div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="chat-dialog">
        <div class="chat-head">
          <span>{{ currentName }}</span>
        </div>
        <div class="message-list">
          <div class="message-list-content">
            <div
              class="msg-item not-me"
              v-for="(chat, i) in currentChatList"
              :class="{ 'is-me': chat.from === userInformation.id }"
              :key="i"
            >
              <div class="msg-time" v-if="chat.showTime > 6">
                <span class="time">{{ handleDate(chat.time, i) }}</span>
              </div>
              <el-avatar class="chat-avatar" :size="30" :src="avatar(chat.from)">user1</el-avatar>
              <div class="message">
                <div class="message-content" :class="{ 'is-me': chat.from === userInformation.id }">
                  <span>{{ chat.content }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="send-box">
          <div class="input-box">
            <textarea
              v-model="replyContent"
              placeholder="回复一下吧~"
              maxlength="500"
              class="textarea"
              style="height: 60px;"
            ></textarea>
            <div class="indicator" style="bottom: -30px; right: 100px;">
              <span class="">0</span>/<span>500</span>
            </div>
          </div>
          <div class="row right">
            <button
              @click="sendMsg()"
              class="btn-box send-btn"
              title="enter 发送 shift + enter 换行"
            >
              发送
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    allChatList() {
      return this.$store.state.chatCenter.allChatList
    },
    userChatList() {
      return this.$store.state.chatCenter.userChatList
    },
    userInformation() {
      return this.$store.state.userInfo.userInformation
    }
  },
  data() {
    return {
      replyContent: '',
      avatarList: [],
      currentChatList: [],
      currentChatUser: '',
      currentName: ''
    }
  },
  mounted() {
    setTimeout(() => {
      this.chatTo(this.userChatList[0].chatId, this.userChatList[0].chatUser)
    }, 200)
  },
  methods: {
    sendMsg() {
      if (this.replyContent) {
        this.$webSocketSendChat(
          JSON.stringify({
            type: 'chat',
            to: this.currentChatUser,
            content: this.replyContent
          })
        )

        this.replyContent = ''
      }
    },
    handleDate(str) {
      const year = str.slice(0, 4)
      const month = str.slice(5, 7)
      const day = str.slice(8, 10)
      const time = str.slice(11, 19)
      const allTime = year + '-' + month + '-' + day + ' ' + time
      // year + '年' + month + '月' + day + '日  ' + time
      return allTime
    },
    avatar(id) {
      return this.$URL + '/v1/user/avatar/' + id
    },
    chatTo(id, chatUser, name) {
      this.currentName = name
      this.replyContent = ''
      this.currentChatUser = chatUser
      this.currentChatList = []
      for (const msg of this.allChatList) {
        if (msg.to + msg.from === id) {
          this.currentChatList.push({
            content: msg.content,
            from: msg.from,
            fromName: msg.fromName,
            id: msg.id,
            time: msg.time,
            to: msg.to,
            toName: msg.toName,
            showTime: Math.floor(Math.random() * 10)
          })
        }
      }
      this.currentChatList.sort((a, b) => {
        return a.id - b.id
      })
    },
    putAvatar(id) {
      return this.getChatUserAvatar(id)
    }
  },
  watch: {
    allChatList(list) {
      console.log('--------------------有新消息了')
      const last = list.slice(-1)
      console.log(last)
      this.currentChatList.push(last[0])
    },
    userChatList(list) {
      console.log(list)
    }
  }
}
</script>

<style scoped>
.chat-im {
  font-size: 12px;
  color: #666;
  background-color: #fff;
  -webkit-box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
  box-shadow: 0 2px 4px 0 rgba(121, 146, 185, 0.54);
  border-radius: 4px;
  height: 500px;
  /* height: 100%; */
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  position: relative;
}
.left {
  width: 240px;
  border-right: 1px solid #e9eaec;
}
.right {
  flex: 1;
}
.chat-im .head {
  text-align: left;
  padding-left: 24px;
  line-height: 35px;
  height: 36px;
  border-bottom: 1px solid #e9eaec;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  overflow: hidden;
}
.chat-head {
  height: 36px;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-bottom: 1px solid #e9eaec;
  position: relative;
  text-align: center;
  color: #333;
}
.list-ul {
  position: relative;
}
.list-ul {
  height: calc(100% - 36px);
  position: relative;
  overflow: hidden;
}
.ps {
  overflow: hidden !important;
  overflow-anchor: none;
  -ms-overflow-style: none;
  touch-action: auto;
  -ms-touch-action: auto;
}
.li-item {
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  padding: 19px 24px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}
.name-box {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.nickname {
  color: #333;
  font-size: 14px;
  min-height: 16px;
  line-height: 1;
  white-space: nowrap;
}
.active,
.li-item:hover {
  background-color: #e4e5e6;
}
.chat-dialog {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  height: 100%;
}
.message-list {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  position: relative;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: #f4f5f7;
}
.message-list-content {
  overflow: auto;
  padding-top: 15px;
}
.send-box {
  height: 162px;
  border-top: 1px solid #d8d8d8;
  border-bottom-right-radius: 4px;
  background-color: #f4f5f7;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  padding: 10px 16px;
  position: relative;
  z-index: 2;
}
.msg-time {
  padding: 16px 0 16px;
  text-align: center;
}
.msg-time .time {
  color: #999;
  font-size: 12px;
  line-height: 22px;
  margin: 0 10px;
}
.msg-item {
  min-height: 48px;
  padding: 0 16px 16px;
  overflow: hidden;
  position: relative;
}
.msg-item > .chat-avatar,
.msg-item .message {
  float: left;
}
.message {
  float: left;
  max-width: 480px;
  margin: 0 10px;
  position: relative;
  overflow: hidden;
  color: #333;
}
.message-content {
  line-height: 1.5;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 0 16px 16px 16px;
  overflow: hidden;
  background: #fff;
}
.is-me .chat-avatar {
  float: right;
}
.is-me .message {
  position: relative;
  float: right;
  color: #fff;
}
.message .message-content.is-me {
  background: #80b9f2;
  border-radius: 16px 0 16px 16px;
}
.input-box {
  position: relative;
}
.textarea {
  resize: none;
  overflow-x: hidden;
  overflow-y: auto;
  height: 160px;
  width: 100%;
  border-radius: 4px;
  padding: 0 0 14px;
  -webkit-transition: 200ms;
  transition: 200ms;
  font-size: 12px;
  color: #333;
  font-size: 14px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
  outline: 0;
  padding: 0;
  margin: 0;
  border: 0;
  background-color: transparent;
}
.indicator {
  color: #c0c0c0;
  position: absolute;
  right: 5px;
  bottom: 0;
  padding: 1px;
  font-size: 12px;
}
.row.right {
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  height: 46px;
}

.row {
  height: 48px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.send-btn {
  background-color: #fff;
  border-radius: 4px;
}

.btn-box {
  cursor: pointer;
  margin: 0;
  position: relative;
  width: 88px;
  height: 30px;
  text-align: center;
  border: 1px solid #e7e7e7;
}
.bili-im button {
  outline: none;
}
.notify-number {
  color: #fff;
  line-height: 16px;
  font-size: 12px;
  border-radius: 8px;
  height: 16px;
  min-width: 16px;
  top: 22px;
  right: 8px;
  padding: 0 4px;
}

.notify {
  text-align: center;
  position: absolute;
  background-color: #fb7299;
}
</style>
