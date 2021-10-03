<template>
  <div id="main">
    <ul class="ul-li" v-if="!noMsg && show">
      <li v-for="(follow, i) in follow" :key="i">
        <div class="ul-li-div">
          <div class="user-pic" @click="toPersonalPage(follow.json_hz.userId)">
            <el-avatar style="margin:5px;" :size="50" :src="userList[i].head_hz"></el-avatar>
            <el-avatar v-if="!userList[i]" style="margin:5px;" :size="50">user</el-avatar>
          </div>
          <div class="li-right">
            <span class="line-txt"> {{ follow.json_hz.subject }}</span>
            <span class="line-time">
              {{ handleDate(follow.create_time_hz) }}
              <span class="del" @click="deleteMsg(follow.id)">
                <i class="iconfont ">&#xe648;</i>
                删除
              </span>
            </span>
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
      follow: this.$store.state.notification.followList,
      noMsg: false,
      show: false,
      userList: [],
      x: ''
    }
  },
  mounted() {
    console.log('creatttttttttttted' + this.followList.length)

    showLoading('.loading')
    if (this.followList.length < 1) {
      this.noMsg = true
      endLoading()
    } else {
      let list = []
      list = this.followList.map(val => {
        if (val.status_hz == 0) {
          val.status_hz = 1
          console.log(val)
        }
        return val
      })
      this.followList = list
      this.$store.dispatch('notification/update', { list: list, name: '关注' })

      this.getALlList()
      this.noMsg = false
    }
  },
  computed: {
    followList: {
      get() {
        return this.follow
      },
      set(v) {
        this.follow = v
      }
    }
  },
  methods: {
    handleDate(str) {
      return handleDate(str)
    },
    getALlList() {
      this.userList = []
      console.log(this.followList.length)
      for (let index = 0; index < this.followList.length; index++) {
        const item = this.followList[index]
        console.log(this.userList.length)
        if (item.level_hz) {
          this.$store.dispatch('notification/getUserInfo', item.json_hz.userId).then(
            res => {
              this.userList[index] = res
              this.x = index
            },
            err => {
              console.log(err)
            }
          )
        }
      }
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
        this.followList.splice(this.followList.length - 1, 1)
        let list = []
        console.log(this.followList)
        this.followList.forEach(val => {
          console.log(val)
          if (val.id !== msgId) {
            list.push(val)
          }
        })
        this.followList = list
        this.$store.dispatch('notification/update', { list: list, name: '关注', msgId: msgId })
      })
    }
  },
  watch: {
    followList(list) {
      console.log('followList变化了-------------' + list.length)
      this.followList = list
      this.follow = list
      if (list.length > 0) {
        this.getALlList()
        this.noMsg = false
      }
    },
    x(val) {
      console.log(val)
      if (val + 1 === this.followList.length) {
        this.show = true
        endLoading()
        this.x = 0
      }
    }
  }
}
</script>

<style scoped></style>
