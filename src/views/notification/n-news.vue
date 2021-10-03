<template>
  <div id="main">
    <ul v-if="!noMsg">
      <li class="ul-li" v-for="(news, i) in newsList" :key="i">
        <!-- {{ news }} -->
        <div class="ul-li-div">
          <div class="user-pic">
            <el-avatar style="margin:5px;" :size="50">管理员</el-avatar>
          </div>
          <div class="li-right">
            <span class="line-txt"> {{ news.json_hz.subject }}</span>
            <span class="line-time">
              {{ handleDate(news.create_time_hz) }}
              <span class="del" @click="deleteMsg(news.id)">
                <i class="iconfont ">&#xe648;</i>
                删除
              </span>
            </span>
          </div>
          <div class="pet-pic" @click="toNewsPage(news.json_hz.petInformation)">
            <span class="adopt-title">{{ spliceStr(news.json_hz.content) }}.. </span>
          </div>
        </div>
      </li>
    </ul>

    <div class="loading" v-if="!show"></div>
    <div v-show="noMsg">
      <h3 class="title" style="color:#999;">暂时还没有消息哦✧*｡٩(^㉨^*)و✧*｡</h3>
    </div>
  </div>
</template>

<script>
import { showLoading, endLoading } from '@/plugins/Loading.js'
import { handleDate } from './n-adopt'
export default {
  data() {
    return {
      noMsg: false,
      show: false,
      userList: [],
      news: this.$store.state.notification.newsList,
      x: ''
    }
  },
  mounted() {
    console.log('creatttttttttttted' + this.newsList.length)

    showLoading('.loading')
    if (this.newsList.length < 1) {
      this.noMsg = true
      endLoading()
    } else {
      let list = []
      list = this.newsList.map(val => {
        if (val.status_hz == 0) {
          val.status_hz = 1
          console.log(val)
        }
        return val
      })
      this.newsList = list
      this.$store.dispatch('notification/update', { list: list, name: '资讯' })

      this.noMsg = false
      this.show = true
      endLoading()
    }
  },
  computed: {
    newsList: {
      get() {
        return this.news
      },
      set(v) {
        this.news = v
      }
    }
  },
  methods: {
    handleDate(str) {
      return handleDate(str)
    },
    spliceStr(str) {
      const regex = /\((.+?)\)/g
      const strr = str
        .match(regex)[0]
        .split('(')[1]
        .slice(0, 8)
      return strr
    },
    toNewsPage(newsId) {
      this.$router.push('/news-information/news-info/' + newsId)
    },
    deleteMsg(msgId) {
      this.$confirm('确定删除此消息吗?' + msgId, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$webSocketSend(JSON.stringify({ type: 'delete', id: msgId }))
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })

      let list = []
      console.log(this.newsList)
      this.newsList.forEach(val => {
        console.log(val)
        if (val.id !== msgId) {
          list.push(val)
        }
      })
      this.newsList = list
      this.$store.dispatch('notification/update', { list: list, name: '资讯', msgId: msgId })
    }
  },
  watch: {
    newsList(list) {
      console.log('newsList变化了-------------' + list.length)
      if (list.length > 0) {
        this.noMsg = false
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
