import store from '@/store'
import {
  wsURL
} from '@/request/baseRequest'

let websock = null

function spliceArr(redata) {
  store.dispatch('chatCenter/addToList', redata)
}
export function initWebSocketChat() {
  console.log('初始化')
  const wsUri = 'ws://' + wsURL + '/ws/chat/' + store.state.userInfo.userToken
  websock = new WebSocket(wsUri)
  websock.onmessage = function (e) {
    console.log('数据接收')
    const redata = JSON.parse(e.data)
    console.log(redata)
    spliceArr(redata)
  }

  websock.onopen = function () {
    console.log('建立连接后')
    webSocketSendChat(JSON.stringify({
      type: 'history',
      size: 20,
      page: 1
    }))
  }
  websock.onerror = function () {
    //连接失败重新连接
    console.log('连接失败重新连接')
    this.initWebSocketChat()
  }
  websock.onclose = function (e) {
    console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
  }
}

export function webSocketSendChat(data) {
  console.log('发送data')
  websock.send(data)
}