import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import $ from 'jquery'
import {
  baseURL,
  URL,
  wsURL
} from '@/request/baseRequest'

// markdown
import mavonEditor from 'mavon-editor'
import showdown from 'showdown'
import 'mavon-editor/dist/css/index.css'

import {
  webSocketSend,
  initWebSocket
} from '@/request/webSocket.js'
import {
  webSocketSendChat,
  initWebSocketChat
} from '@/request/webSocketChat.js'

import './permission'

import './plugins/element.js'
import animated from 'animate.css'

Vue.use(animated)

Vue.use(mavonEditor)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$webSocketSend = webSocketSend
Vue.prototype.$initWebSocket = initWebSocket
Vue.prototype.$webSocketSendChat = webSocketSendChat
Vue.prototype.$initWebSocketChat = initWebSocketChat
Vue.prototype.$baseURL = baseURL
Vue.prototype.$URL = URL
Vue.prototype.$wsURL = wsURL

window.$ = $
// 配置showdown
Vue.prototype.converter = new showdown.Converter()

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')