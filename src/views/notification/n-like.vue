<template>
  <div id="main">
    <ul v-if="!noMsg && show">
      <li class="ul-li" v-for="(like, i) in likeList" :key="i">
        <div class="ul-li-div">
          <div class="user-pic" @click="toPersonalPage(like.json_hz.userId)">
            <el-avatar
              v-if="userList[i]"
              style="margin:5px;"
              :size="50"
              :src="userList[i].head_hz"
            ></el-avatar>

            <el-avatar v-if="!userList[i]" style="margin:5px;" :size="50">user</el-avatar>
          </div>
          <div class="li-right">
            <span class="line-txt"> {{ like.json_hz.subject }}</span>
            <span class="line-time">
              {{ handleDate(like.create_time_hz) }}
              <span class="del" @click="deleteMsg(like.id)">
                <i class="iconfont ">&#xe648;</i>
                删除
              </span>
            </span>
          </div>
          <div class="pet-pic">
            <span class="adopt-title">{{ like.json_hz.content.slice(0, 10) }}.. </span>
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
      like: this.$store.state.notification.likeList,
      x: ''
    }
  },
  mounted() {
    console.log('creatttttttttttted' + this.likeList.length)

    showLoading('.loading')
    if (this.likeList.length < 1) {
      this.noMsg = true
      endLoading()
    } else {
      let list = []
      list = this.likeList.map(val => {
        if (val.status_hz == 0) {
          val.status_hz = 1
          console.log(val)
        }
        return val
      })
      this.likeList = list
      this.$store.dispatch('notification/update', { list: list, name: '点赞' })

      this.getALlList()
      this.noMsg = false
    }
  },
  computed: {
    likeList: {
      get() {
        return this.like
      },
      set(v) {
        this.like = v
      }
    }
  },
  methods: {
    handleDate(str) {
      return handleDate(str)
    },
    getALlList() {
      this.userList = []
      for (let index = 0; index < this.likeList.length; index++) {
        const item = this.likeList[index]
        console.log(this.likeList.length)
        if (item.level_hz) {
          this.$store.dispatch('notification/getUserInfo', item.json_hz.userId).then(
            res => {
              console.log(res)
              this.userList[index] = res
              this.x = index
              console.log(this.x)
            },
            err => {
              console.log(err)
            }
          )
        }
      }
    },
    toPersonalPage(id) {
      this.$router.push('/user/personal-page/' + id)
    },
    deleteMsg(msgId) {
      this.$confirm('确定删除此消息吗?' + msgId, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$webSocketSend(JSON.stringify({ type: 'delete', id: msgId, msgId: msgId }))
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })

      let list = []
      this.likeList.forEach(val => {
        console.log(val)
        if (val.id !== msgId) {
          list.push(val)
        }
      })
      this.likeList = list
      this.$store.dispatch('notification/update', { list: list, name: '点赞' })
    }
  },
  watch: {
    likeList(list) {
      console.log('likeList变化了-------------' + list.length)
      if (list.length > 0) {
        this.getALlList()
        this.noMsg = false
      }
    },
    x(val) {
      console.log(val)
      if (val + 1 === this.likeList.length) {
        this.show = true
        endLoading()
        this.x = 0
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
