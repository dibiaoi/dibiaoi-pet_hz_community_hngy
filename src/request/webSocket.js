import store from '@/store'
import {
  wsURL
} from '@/request/baseRequest'

let websock = null
const notificationList = [] //全部
const List = {
  collectList: [],
  likeList: [], //点赞
  remarkList: [], //留言
  adoptList: [],
  followList: [],
  fansList: [],
  petHelpList: [],
  newsList: []
}

function spliceArr() {
  List.followList = notificationList.filter(item => item.level_hz === 1)
  List.collectList = notificationList.filter(item => item.level_hz === 2)
  List.remarkList = notificationList.filter(item => item.level_hz === 3)
  List.likeList = notificationList.filter(item => item.level_hz === 4)
  List.adoptList = notificationList.filter(
    item => item.level_hz === 6 || (item.level_hz > 1300 && item.level_hz < 1310)
  )
  List.petHelpList = notificationList.filter(
    item => item.level_hz === 7 || (item.level_hz > 1600 && item.level_hz < 1620)
  )
  List.newsList = notificationList.filter(item => item.level_hz > 1700 && item.level_hz < 1720)
  store.dispatch('notification/spliceArr', {
    List: List,
    notificationList: notificationList
  })
  console.log(List)
}
export function initWebSocket() {
  console.log('初始化---------------')
  console.log(store.state.userInfo.userToken);
  const wsUri = 'ws://' + wsURL + '/ws/message/' + store.state.userInfo.userToken
  websock = new WebSocket(wsUri)
  websock.onmessage = function (e) {
    console.log('数据接收')
    const redata = JSON.parse(e.data)
    console.log(redata)

    notificationList.push(redata)
    spliceArr()
  }

  websock.onopen = function () {
    console.log('建立连接后')
    webSocketSend(JSON.stringify({
      type: 'message'
    }))
    webSocketSend(JSON.stringify({
      type: 'history'
    }))
  }
  websock.onerror = function () {
    //连接失败重新连接
    console.log('连接失败重新连接')
    this.initWebSocket()
  }
  websock.onclose = function (e) {
    console.log('断开连接', e)
  }
}

export function webSocketSend(data) {
  console.log('发送data')
  websock.send(data)
}